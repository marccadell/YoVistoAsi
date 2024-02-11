import styled from "styled-components";
import React, { useState } from 'react';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const OutfitCreatorContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const SelectorContainer = styled.div`
  flex: 1;
  margin: 10px;
`;

const PreviewContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  height: 300px; // Ajusta según necesidad
  border: 2px dashed #ccc; // Estilo de "vista previa"
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
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
  width: 100%;
  height: 100%;
  padding: 10px;
  // Ajusta según necesites, por ejemplo, para diferentes tamaños de pantalla
`;

const PreviewImage = styled.img`
  width: 80px; // Tamaño XS
  height: auto;
  border-radius: 5px; // Opcional, si deseas bordes redondeados
`;


const CreateOutfit = () => {
    const [outfitPreviews, setOutfitPreviews] = useState([]);
    const [outfitPreview, setOutfitPreview] = useState({
      color: '',
      genero: '',
      imagenUrl: '',
      marca: '',
      tamaño: '',
      temporada: '',
      tipo: '',
      tipoEvento: '',
    });
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const newPrenda = { ...outfitPreview };
        await addDoc(collection(db, "Prendas"), newPrenda);
        setOutfitPreviews([...outfitPreviews, newPrenda]); // Añade la nueva prenda al arreglo
        console.log("Prenda agregada con éxito");
        // Opcional: Resetear el formulario aquí
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
            <PreviewGrid>
              {outfitPreviews.map((prenda, index) => (
                <div key={index}>
                  <PreviewImage src={prenda.imagenUrl} alt="Prenda" />
                  <p>Color: {prenda.color}</p>
                  <p>Marca: {prenda.marca}</p>
                  <p>Tipo: {prenda.tipo}</p>
                  {/* Agrega más detalles según sea necesario */}
                </div>
              ))}
            </PreviewGrid>
          </PreviewContainer>
          <CustomizationContainer>
          <FormContainer onSubmit={handleSubmit}>
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
                value={outfitPreview.tipo}
                onChange={(e) => setOutfitPreview({ ...outfitPreview, tipo: e.target.value })}
                placeholder="Tipo"
            />
            <StyledInput
                type="text"
                value={outfitPreview.tipoEvento}
                onChange={(e) => setOutfitPreview({ ...outfitPreview, tipoEvento: e.target.value })}
                placeholder="Tipo de Evento"
            />
            <StyledButton type="submit">Agregar Prenda</StyledButton>
        </FormContainer>
          </CustomizationContainer>
        </OutfitCreatorContainer>
      </PageContainer>
    );
  };

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


export default CreateOutfit;