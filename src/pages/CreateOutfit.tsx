import { useState, useEffect } from 'react';
import { addDoc, getDocs, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';


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
  border-radius: 10px;
  
  @media (max-width: 920px) {
    grid-template-columns: 1fr; 
  }
`;

const SelectorContainer = styled.div`
  margin: 10px;
  margin-top: 50px;
  overflow-y: auto; 
  max-height: 600px; 
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

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 400px; 
  margin: 0 auto;
`;

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

const StyledInputURL = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 95.5%;
`;

const StyledInputPosition = styled.div`
  position: relative;
`;

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

const StyledButtonSuccess = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #0ebd1c;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #2fdf3e;
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
  padding: 30px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalImage = styled.img`
  max-width: 80%; 
  max-height: 300px; 
  object-fit: cover; 
  border-radius: 5px; 
  margin-bottom: 20px; 
`;

const ModalImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 24px; 
  font-weight: bold;
  color: #333; 
  margin-bottom: 15px; 
`;

const ModalText = styled.p`
  font-size: 16px; 
  color: #555; 
  line-height: 1.5; 

  &:not(:last-child) {
    margin-bottom: 10px; 
  }
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
  numeroZapato: '',
  temporada: '',
  tipoPrenda: '',
  tipoEvento: '',
};

const CreateOutfit = () => {
  const [prendas, setPrendas] = useState([]);
  const [outfitPreviews, setOutfitPreviews] = useState([]);
  const [outfitPreview, setOutfitPreview] = useState(initialState);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPrenda, setSelectedPrenda] = useState(initialState);

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

  const actualizarPrenda = async () => {
    if (!selectedPrenda.id) return;

    try {
      await setDoc(doc(db, "Prendas", selectedPrenda.id), selectedPrenda);
      toast.success("Prenda actualizada con éxito");
      setModalIsOpen(false);

      const updatedPrendas = prendas.map(prenda => prenda.id === selectedPrenda.id ? selectedPrenda : prenda);
      setPrendas(updatedPrendas);
    } catch (error) {
      console.error("Error al actualizar prenda: ", error);
      toast.error("Error al actualizar prenda");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Prendas"), outfitPreview);
      setOutfitPreviews([...outfitPreviews, outfitPreview]);
      setOutfitPreview(initialState);
      toast.success("Prenda agregada con éxito");
    } catch (error) {
      console.error("Error agregando prenda: ", error);
      toast.error("Error agregando prenda: " + error.message);
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
                  <option value="Sombrero">Sombrero</option>
                  <option value="Bolso|Mochila">Bolso | Mochila</option>
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
              <StyledInputPosition>
                <StyledInputSelect
                  value={outfitPreview.color}
                  onChange={(e) => setOutfitPreview({ ...outfitPreview, color: e.target.value })}
                  required
                >
                  <option value="" disabled selected>Selecciona el Color</option>
                  <option value="Negro">Negro</option>
                  <option value="Blanco">Blanco</option>
                  <option value="Rojo">Rojo</option>
                  <option value="Azul">Azul</option>
                  <option value="Verde">Verde</option>
                  <option value="Amarillo">Amarillo</option>
                  <option value="Naranja">Naranja</option>
                  <option value="Marrón">Marrón</option>
                  <option value="Beige">Beige</option>
                  <option value="Gris">Gris</option>
                  <option value="Rosa">Rosa</option>
                  <option value="Violeta">Violeta</option>
                  <option value="Plata">Plata</option>
                  <option value="Oro">Oro</option>
                </StyledInputSelect>
              </StyledInputPosition>
              <StyledInputPosition>
                <StyledInputSelect
                  value={outfitPreview.numeroZapato}
                  onChange={(e) => setOutfitPreview({ ...outfitPreview, numeroZapato: e.target.value })}
                >
                  <option value="" disabled selected>Selecciona el Número de Calzado</option>
                  <option value="36">36</option>
                  <option value="37">37</option>
                  <option value="38">38</option>
                  <option value="39">39</option>
                  <option value="40">40</option>
                  <option value="41">41</option>
                  <option value="42">42</option>
                  <option value="43">43</option>
                  <option value="44">44</option>
                  <option value="45">45</option>
                  <option value="46">46</option>
                </StyledInputSelect>
              </StyledInputPosition>
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
                  <option value="CualquierEstación">Cualquier Estación</option>
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
                <p><b>{prenda.nombre}</b></p>
                <p>Tipo: {prenda.tipoPrenda}</p>
                <p>Marca: {prenda.marca}</p>
                <p>Género: {prenda.genero}</p>
              </PrendaItem>
            ))}
          </SelectorContainer>
        </OutfitCreatorContainer>
        {
          modalIsOpen && (
            <Overlay>
              <Modal>
                <ModalImageBox><ModalImage src={selectedPrenda.imagenUrl} alt="Prenda" /></ModalImageBox>
                <div>
                  <ModalTitle>{selectedPrenda.nombre}</ModalTitle>
                  <ModalText>Marca: {selectedPrenda.marca}</ModalText>
                  <ModalText>
                    Tipo de Prenda:
                    <StyledInputSelect
                      value={selectedPrenda.tipoPrenda || ''}
                      onChange={(e) => setSelectedPrenda({ ...selectedPrenda, tipoPrenda: e.target.value })}
                    >
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
                      <option value="Sombrero">Sombrero</option>
                      <option value="Bolso|Mochila">Bolso | Mochila</option>
                      <option value="Accesorio">Accesorio</option>
                    </StyledInputSelect>
                  </ModalText>
                  <ModalText>
                    Tipo de Evento:
                    <StyledInputSelect
                      value={selectedPrenda.tipoEvento || ''}
                      onChange={(e) => setSelectedPrenda({ ...selectedPrenda, tipoEvento: e.target.value })}
                      required
                    >
                      <option value="Casual">Casual</option>
                      <option value="Arreglado">Arreglado</option>
                      <option value="Urbano">Urbano</option>
                      <option value="Gala">Elegante</option>
                    </StyledInputSelect>
                  </ModalText>
                  <ModalText>
                    Color:
                    <StyledInputSelect
                      value={selectedPrenda.color || ''}
                      onChange={(e) => setSelectedPrenda({ ...selectedPrenda, color: e.target.value })}
                      required
                    >
                      <option value="Negro">Negro</option>
                      <option value="Blanco">Blanco</option>
                      <option value="Rojo">Rojo</option>
                      <option value="Azul">Azul</option>
                      <option value="Verde">Verde</option>
                      <option value="Amarillo">Amarillo</option>
                      <option value="Naranja">Naranja</option>
                      <option value="Marrón">Marrón</option>
                      <option value="Beige">Beige</option>
                      <option value="Gris">Gris</option>
                      <option value="Rosa">Rosa</option>
                      <option value="Violeta">Violeta</option>
                      <option value="Plata">Plata</option>
                      <option value="Oro">Oro</option>
                    </StyledInputSelect>
                  </ModalText>
                  <ModalText>
                    Género:
                    <StyledInputSelect
                      value={selectedPrenda.genero || ''}
                      onChange={(e) => setSelectedPrenda({ ...selectedPrenda, genero: e.target.value })}
                      required
                    >
                      <option value="Hombre">Hombre</option>
                      <option value="Mujer">Mujer</option>
                      <option value="Unisex">Unisex</option>
                    </StyledInputSelect>
                  </ModalText>
                  <ModalText>
                    Tamaño:
                    <StyledInputSelect
                      value={selectedPrenda.tamaño || ''}
                      onChange={(e) => setSelectedPrenda({ ...selectedPrenda, tamaño: e.target.value })}
                    >
                      <option value="Sin Talla">Sin Talla</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="2XL">2XL</option>
                    </StyledInputSelect>
                  </ModalText>
                  <ModalText>
                    Número de Calzado:
                    <StyledInputSelect
                      value={selectedPrenda.numeroZapato || ''}
                      onChange={(e) => setSelectedPrenda({ ...selectedPrenda, numeroZapato: e.target.value })}
                    >
                      <option value="Sin Talla">Sin Talla</option>
                      <option value="36">36</option>
                      <option value="37">37</option>
                      <option value="38">38</option>
                      <option value="39">39</option>
                      <option value="40">40</option>
                      <option value="41">41</option>
                      <option value="42">42</option>
                      <option value="43">43</option>
                      <option value="44">44</option>
                      <option value="45">45</option>
                      <option value="46">46</option>
                    </StyledInputSelect>
                  </ModalText>
                  <ModalText>
                    Temporada: {selectedPrenda.temporada}
                    <StyledInputSelect
                      value={selectedPrenda.temporada || ''}
                      onChange={(e) => setSelectedPrenda({ ...selectedPrenda, temporada: e.target.value })}
                      required
                    >
                      <option value="CualquierEstación">Cualquier Estación</option>
                      <option value="Invierno">Invierno</option>
                      <option value="Primavera">Primavera</option>
                      <option value="Verano">Verano</option>
                      <option value="Otoño">Otoño</option>
                    </StyledInputSelect>
                  </ModalText>
                  <ModalText>
                    URL Imágen:
                    <StyledInputURL
                      type="text"
                      value={selectedPrenda.imagenUrl || ''}
                      onChange={(e) => setSelectedPrenda({ ...selectedPrenda, imagenUrl: e.target.value })}
                      required
                    />
                  </ModalText>
                </div>
                <StyledButtonSuccess onClick={actualizarPrenda}>Guardar Cambios</StyledButtonSuccess>
                <StyledButton onClick={() => setModalIsOpen(false)}>Cerrar</StyledButton>
              </Modal>
            </Overlay>
          )
        }
      </PageContainer>
    </BgContainer>

  );
};

export default CreateOutfit;



