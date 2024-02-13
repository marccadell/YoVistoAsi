import React, { useState, useEffect } from 'react';
import { addDoc, getDocs, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  margin-bottom: 100px;
`;

const SectionTitle = styled.h1`
    font-size: 3.6rem;
    font-weight: bold;
    padding: 20px;
    font-weight: 600;
    text-align: center;
`;


const OutfitCreatorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr; // Ajusta según tus necesidades, por ejemplo, selector y preview con proporciones específicas
  gap: 20px; // Espacio entre los elementos del grid
  width: 100%;
  margin: auto;
  background-color: #f9f9f9; // Fondo claro
  padding: 20px;

  @media (max-width: 920px) {
    grid-template-columns: 1fr; // Cambia a una sola columna en pantallas pequeñas
  }
`;

const SelectorContainer = styled.div`
  margin: 10px;
  margin-top: 50px;
  overflow-y: auto; 
  max-height: 600px; 
  border-bottom: 1px solid grey;
  border-bottom-left-radius: 6px;
  grid-column: 1 / -1; // Hace que ocupe toda la fila en resoluciones específicas

  @media (max-width: 920px) {
    width: 100%; // Ocupa todo el ancho en vistas más pequeñas
  }
`;

const PreviewContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column; // Cambiado para permitir la orientación de los elementos internos en columna
  align-items: center;
  margin: 10px;
  height: auto; // Ajustado para adaptarse al contenido
  border: 2px dashed #ccc;
`;

const CustomizationContainer = styled.div`
  flex: 1;
  margin: 10px;
`;

const ActionButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

// Estilo del contenedor del formulario
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 400px; // Ajusta este valor según tus necesidades
  margin: 0 auto;
`;

// Estilo de los inputs
const StyledInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

// Estilo del botón
const StyledButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  padding: 10px; // Asegúrate de que este padding sea suficiente
  margin: 10px 0; // Ajusta los márgenes según necesites
  width: calc(100% - 20px); // Ajusta el ancho considerando el padding
  box-sizing: border-box; // Asegura que el padding no afecte el ancho total
  overflow-y: auto; 
  min-height: 700px; 

  @media screen and (max-width: 10px) and (min-width: 1022px) {
    gap: 10px;
  }

  @media screen and (max-width: 784px) and (min-width: 589px) {
    gap: 30px;
  }

  @media screen and (max-width: 588px) and (min-width: 500px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

`;

const PrendaPreviewItem = styled.div`
  width: 200px; // Ancho fijo para el contenedor
  height: 300px; // Altura fija para el contenedor
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden; // Evita que el contenido sobresalga del contenedor
  border: 1px solid #e1e1e1; // Ejemplo de borde
  border-radius: 10px; // Bordes redondeados
  padding: 10px; // Padding interior
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); // Sombra suave
  background-color: #f9f9f9; // Fondo claro
  margin: 10px; // Margen para separar de otros elementos
  box-sizing: border-box; // Asegura que padding y border se incluyan en el cálculo del tamaño
  cursor: pointer; // Indica que el elemento es interactivo
  
  &:hover {
    transform: translateY(-5px); // Efecto de "levitación" al pasar el mouse
  }

`;

const PreviewImage = styled.img`
  width: 100px; // Tamaño XS
  height: 100px;
  object-fit: cover;
  border-radius: 5px; // Opcional, si deseas bordes redondeados
`;

const PrendaItem = styled.div`
  cursor: pointer;
  margin: 5px;
  padding: 10px;
  border: 1px solid #ccc;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  max-width: 500px; // Ajusta este valor según tus necesidades
  width: 90%; // Asegura que el modal sea responsive
`;

const Hr = styled.hr`
  width: 70%;
  margin: 30px auto 40px auto;
  border: none;
  border-top: 3px solid #534d4d51;
`;


const initialState = {
  nombre: '',
  color: '',
  genero: '',
  imagenUrl: '',
  marca: '',
  tamaño: '',
  temporada: '',
  tipoPrenda: '',
  tipoEvento: '',
};

const CreateOutfit = () => {
  const [prendas, setPrendas] = useState([]);
  const [outfitPreviews, setOutfitPreviews] = useState([]);
  const [outfitPreview, setOutfitPreview] = useState(initialState);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPrenda, setSelectedPrenda] = useState(null);

  useEffect(() => {
    const obtenerPrendas = async () => {
      const querySnapshot = await getDocs(collection(db, "Prendas"));
      const prendasArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPrendas(prendasArray);
    };

    obtenerPrendas();
  }, []);

  const agregarAPreview = (prenda) => {
    setOutfitPreviews([...outfitPreviews, prenda]);
  };

  const eliminarPrenda = (e, index) => {
    e.stopPropagation(); // Esto previene que el evento de clic se propague.
    setOutfitPreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
  };

  const abrirModal = (prenda) => {
    setSelectedPrenda(prenda);
    setModalIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Prendas"), outfitPreview);
      setOutfitPreviews([...outfitPreviews, outfitPreview]);
      setOutfitPreview(initialState); // Resetear el formulario
      alert("Prenda agregada con éxito");
    } catch (error) {
      console.error("Error agregando prenda: ", error);
      alert("Error agregando prenda: " + error.message);
    }
  };


  return (
    <PageContainer>
      <SectionTitle>Creador de Outfits</SectionTitle>
      <OutfitCreatorContainer>
      <CustomizationContainer>
          <h2 style={{ textAlign: 'center'}}>Introduce una Prenda</h2>
          <FormContainer onSubmit={handleSubmit}>
            <StyledInput
              type="text"
              value={outfitPreview.nombre}
              onChange={(e) => setOutfitPreview({ ...outfitPreview, nombre: e.target.value })}
              placeholder="Nombre"
            />
            <StyledInput
              type="text"
              value={outfitPreview.tipoPrenda}
              onChange={(e) => setOutfitPreview({ ...outfitPreview, tipoPrenda: e.target.value })}
              placeholder="Tipo de Prenda"
            />
            <StyledInput
              type="text"
              value={outfitPreview.color}
              onChange={(e) => setOutfitPreview({ ...outfitPreview, color: e.target.value })}
              placeholder="Color"
            />
            <StyledInput
              type="text"
              value={outfitPreview.genero}
              onChange={(e) => setOutfitPreview({ ...outfitPreview, genero: e.target.value })}
              placeholder="Género"
            />
            <StyledInput
              type="text"
              value={outfitPreview.imagenUrl}
              onChange={(e) => setOutfitPreview({ ...outfitPreview, imagenUrl: e.target.value })}
              placeholder="URL de la Imagen"
            />
            <StyledInput
              type="text"
              value={outfitPreview.marca}
              onChange={(e) => setOutfitPreview({ ...outfitPreview, marca: e.target.value })}
              placeholder="Marca"
            />
            <StyledInput
              type="text"
              value={outfitPreview.tamaño}
              onChange={(e) => setOutfitPreview({ ...outfitPreview, tamaño: e.target.value })}
              placeholder="Tamaño"
            />
            <StyledInput
              type="text"
              value={outfitPreview.temporada}
              onChange={(e) => setOutfitPreview({ ...outfitPreview, temporada: e.target.value })}
              placeholder="Temporada"
            />

            <StyledInput
              type="text"
              value={outfitPreview.tipoEvento}
              onChange={(e) => setOutfitPreview({ ...outfitPreview, tipoEvento: e.target.value })}
              placeholder="Tipo de Evento"
            />
            <StyledButton type="submit" style={{ marginTop: '20px' }}>Agregar Prenda</StyledButton>
          </FormContainer>
        </CustomizationContainer>
        
        <PreviewContainer>
          <h3>Vista Previa de las Prendas</h3>
          <PreviewGrid>
            {outfitPreviews.map((prenda, index) => (
              <PrendaPreviewItem key={index} onClick={() => abrirModal(prenda)}>
                <PreviewImage src={prenda.imagenUrl} alt="Prenda" />
                <div>
                  <p>{prenda.nombre}</p>
                  <p>Marca: {prenda.marca}</p>
                  <p>Tipo: {prenda.tipoPrenda}</p>
                </div>
                <button onClick={(e) => eliminarPrenda(e, index)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </PrendaPreviewItem>
            ))}
          </PreviewGrid>
        </PreviewContainer>

        
        <SelectorContainer>
        <Hr></Hr>
          <h2>Selecciona tus Prendas Guardadas para Visualizarlas</h2>
          {prendas.map(prenda => (
            <PrendaItem key={prenda.id} onClick={() => agregarAPreview(prenda)}>
              <img src={prenda.imagenUrl} alt="Prenda" style={{ width: '50px', height: 'auto' }} />
              <p>{prenda.nombre}</p>
              <p>{prenda.tipoEvento}</p>
            </PrendaItem>
          ))}
        </SelectorContainer>
        
      </OutfitCreatorContainer>
      {
        modalIsOpen && (
          <Overlay>
            <Modal>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                  <img src={selectedPrenda.imagenUrl} alt="Prenda" style={{ width: '100%', height: 'auto' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h2>{selectedPrenda.nombre}</h2>
                  <p>Tipo de Prenda: {selectedPrenda.tipoPrenda}</p>
                  <p>Marca: {selectedPrenda.marca}</p>
                  <p>Color: {selectedPrenda.color}</p>
                  <p>Género: {selectedPrenda.marca}</p>
                  {/* Más detalles de la prenda */}
                  <StyledButton onClick={() => setModalIsOpen(false)}>Cerrar</StyledButton>
                </div>
              </div>
            </Modal>
          </Overlay>
        )
      }
    </PageContainer>
  );
};

export default CreateOutfit;

{/*const CreateOutfit: React.FC = () => {
    
    // ES FUNCIONAL!!!!!
    const [color, setColor] = useState('');
    const [genero, setGenero] = useState('');
    const [imagenUrl, setImagenUrl] = useState('');
    const [marca, setMarca] = useState('');
    const [tamaño, setTamaño] = useState('');
    const [temporada, setTemporada] = useState('');
    const [tipo, setTipo] = useState('');
    const [tipoEvento, setTipoEvento] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        // ES FUNCIONAL!!!!!
        e.preventDefault();
        try {
            await addDoc(collection(db, "Prendas"), {
                color,
                genero,
                imagenUrl,
                marca,
                tamaño,
                temporada,
                tipo,
                tipoEvento
            });
            
            console.log("Prenda agregada con éxito");
        } catch (error) {
            console.error("Error agregando prenda: ", error);
        }
    };

    return (
        <PageContainer>
            <SectionTitle>Creador de Outfits</SectionTitle>
            <OutfitCreatorContainer>
                <SelectorContainer>
                    <h3>Selecciona tus Prendas</h3>
                </SelectorContainer>
                <PreviewContainer>
                    <h3>Vista Previa del Outfit</h3>
                </PreviewContainer>
                <CustomizationContainer>
                    <FormContainer onSubmit={handleSubmit}>
                        <StyledInput type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="Color" />
                        <StyledInput type="text" value={genero} onChange={(e) => setGenero(e.target.value)} placeholder="Género" />
                        <StyledInput type="text" value={imagenUrl} onChange={(e) => setImagenUrl(e.target.value)} placeholder="URL de la Imagen" />
                        <StyledInput type="text" value={marca} onChange={(e) => setMarca(e.target.value)} placeholder="Marca" />
                        <StyledInput type="text" value={tamaño} onChange={(e) => setTamaño(e.target.value)} placeholder="Tamaño" />
                        <StyledInput type="text" value={temporada} onChange={(e) => setTemporada(e.target.value)} placeholder="Temporada" />
                        <StyledInput type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} placeholder="Tipo" />
                        <StyledInput type="text" value={tipoEvento} onChange={(e) => setTipoEvento(e.target.value)} placeholder="Tipo de Evento" />
                        <StyledButton type="submit">Agregar Prenda</StyledButton>
                    </FormContainer>
                </CustomizationContainer>
            </OutfitCreatorContainer>
        </PageContainer>
    )
} */}


