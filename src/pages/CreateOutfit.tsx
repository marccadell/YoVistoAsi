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
  padding: 40px 60px 150px 60px;
`;

const BgContainer = styled.div`
  background-image: url("src/assets/img/bg-createoutfit.jpg");
  background-size: cover;
  background-repeat: no-repeat;
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
  grid-template-columns: 1fr 2fr; 
  gap: 20px; 
  background-color: #f9f9f9; 
  width: 90%;
  padding: 50px 20px 50px 20px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.3);
  

  @media (max-width: 920px) {
    grid-template-columns: 1fr; 
  }
`;

const SelectorContainer = styled.div`
  margin: 10px;
  margin-top: 50px;
  overflow-y: auto; 
  max-height: 600px; 
  border-bottom: 1px solid grey;
  border-bottom-left-radius: 6px;
  grid-column: 1 / -1; 

  @media (max-width: 920px) {
    width: 100%; 
  }
`;

const PreviewContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column; 
  align-items: center;
  margin: 10px;
  height: auto; 
  border: 2px dashed #ccc;
  background-color: #ffffff;
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
  max-width: 400px; 
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

const StyledInputSelect = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const StyledInputPosition = styled.div`
  position: relative;
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
  padding: 10px; 
  margin: 10px 0; 
  width: calc(100% - 20px); 
  box-sizing: border-box; 
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
  width: 200px; 
  height: 300px; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden; 
  border: 1px solid #e1e1e1; 
  border-radius: 10px; 
  padding: 10px; 
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
  background-color: #f9f9f9; 
  margin: 10px; 
  box-sizing: border-box; 
  cursor: pointer; 
  
  &:hover {
    transform: translateY(-5px); 
  }

`;

const PreviewImage = styled.img`
  width: 100px; 
  height: 100px;
  object-fit: cover;
  border-radius: 5px; 
`;

const PrendaItem = styled.div`
  cursor: pointer;
  margin: 5px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #ffffff;
  &:hover {
    background-color: #64a6ec16;
    border-color: #89bcf390;
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
  max-width: 500px;
  width: 90%; 
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
    e.stopPropagation(); 
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
    <BgContainer>
      <PageContainer>
        <SectionTitle>Creador de Outfits</SectionTitle>
        <OutfitCreatorContainer>
          <CustomizationContainer>
            <h2 style={{ textAlign: 'center' }}>Introduce una Prenda</h2>
            <FormContainer onSubmit={handleSubmit}>
              <StyledInput
                type="text"
                value={outfitPreview.nombre}
                onChange={(e) => setOutfitPreview({ ...outfitPreview, nombre: e.target.value })}
                placeholder="Nombre"
                required
              />
              <StyledInputPosition>
                <StyledInputSelect
                  value={outfitPreview.tipoPrenda}
                  onChange={(e) => setOutfitPreview({ ...outfitPreview, tipoPrenda: e.target.value })}
                  required
                >
                  <option value="" disabled selected>Selecciona Tipo de Prenda</option>
                  <option value="Camisa">Camisa</option>
                  <option value="Polo">Polo</option>
                  <option value="Camiseta">Camiseta</option>
                  <option value="Sobrecamisa">Sobrecamisa</option>
                  <option value="Jersey">Jerséy</option>
                  <option value="Chaqueta">Chaqueta</option>
                  <option value="Sudadera">Sudadera</option>
                  <option value="Chandal">Chándal</option>
                  <option value="Pantalon">Pantalón</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Abrigo">Abrigo</option>
                  <option value="Traje">Traje</option>
                  <option value="Zapatos">Zapatos</option>
                  <option value="Bolso | Mochila">Bolso | Mochila</option>
                  <option value="Accesorio">Accesorio</option>
                </StyledInputSelect>
              </StyledInputPosition>
              <StyledInputPosition>
                <StyledInputSelect
                  value={outfitPreview.tipoEvento}
                  onChange={(e) => setOutfitPreview({ ...outfitPreview, tipoEvento: e.target.value })}
                  required
                >
                  <option value="" disabled selected>Selecciona Tipo de Evento</option>
                  <option value="Casual">Casual</option>
                  <option value="Arreglado">Arreglado</option>
                  <option value="Urbano">Urbano</option>
                  <option value="Gala">Elegante</option>
                </StyledInputSelect>
              </StyledInputPosition>
              <StyledInputPosition>
                <StyledInputSelect
                  value={outfitPreview.tamaño}
                  onChange={(e) => setOutfitPreview({ ...outfitPreview, tamaño: e.target.value })}
                  required
                >
                  <option value="" disabled selected>Selecciona Tipo de Talla</option>
                  <option value="Sin Talla">Sin Talla</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="2XL">2XL</option>
                </StyledInputSelect>
              </StyledInputPosition>
              <StyledInput
                type="text"
                value={outfitPreview.color}
                onChange={(e) => setOutfitPreview({ ...outfitPreview, color: e.target.value })}
                placeholder="Color"
                required
              />
              <StyledInput
                type="text"
                value={outfitPreview.marca}
                onChange={(e) => setOutfitPreview({ ...outfitPreview, marca: e.target.value })}
                placeholder="Marca"
                required
              />
              <StyledInputPosition>
                <StyledInputSelect
                  value={outfitPreview.genero}
                  onChange={(e) => setOutfitPreview({ ...outfitPreview, genero: e.target.value })}
                  required
                >
                  <option value="" disabled selected>Selecciona el Género</option>
                  <option value="Hombre">Hombre</option>
                  <option value="Mujer">Mujer</option>
                  <option value="Unisex">Unisex</option>
                </StyledInputSelect>
              </StyledInputPosition>
              <StyledInputPosition>
                <StyledInputSelect
                  value={outfitPreview.temporada}
                  onChange={(e) => setOutfitPreview({ ...outfitPreview, temporada: e.target.value })}
                  required
                >
                  <option value="" disabled selected>Selecciona Temporada</option>
                  <option value="Invierno">Invierno</option>
                  <option value="Primavera">Primavera</option>
                  <option value="Verano">Verano</option>
                  <option value="Otoño">Otoño</option>
                </StyledInputSelect>
              </StyledInputPosition>
              <StyledInput
                type="text"
                value={outfitPreview.imagenUrl}
                onChange={(e) => setOutfitPreview({ ...outfitPreview, imagenUrl: e.target.value })}
                placeholder="URL de la Imagen"
                required
              />
              <StyledButton type="submit" style={{ marginTop: '20px' }}>Agregar Prenda</StyledButton>
            </FormContainer>
          </CustomizationContainer>

          <PreviewContainer>
            <h3>Vista Previa del Outfit</h3>
            <PreviewGrid>
              {outfitPreviews.map((prenda, index) => (
                <PrendaPreviewItem key={index} onClick={() => abrirModal(prenda)}>
                  <PreviewImage src={prenda.imagenUrl} alt="Prenda" />
                  <div>
                    <p style={{ fontWeight: 'bold', fontSize: '13px' }}>{prenda.nombre}</p>
                    <p>{prenda.marca}</p>
                    <p>Tipo: {prenda.tipoPrenda}</p>
                    <p>Evento: {prenda.tipoEvento}</p>
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
            <h2>Selecciona tus Prendas Guardadas</h2>
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
    </BgContainer>

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


