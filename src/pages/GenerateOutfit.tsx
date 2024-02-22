import React, { useState, useEffect } from 'react';
import { addDoc, getDocs, collection, doc, setDoc, where, query } from 'firebase/firestore';
import { db } from '../firebase';

import styled from "styled-components";
import { toast } from 'react-toastify';


const BgContainer = styled.div`
  background-image: url("src/assets/img/bg-createoutfit.jpg");
  background-size: cover;
  background-repeat: no-repeat;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Container = styled.div`
  width: 70%;
  margin: 40px auto;
  padding: 30px;
  padding-bottom: 60px;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  box-shadow: 0 2px 15px rgba(0,0,0,0.3);
  border-radius: 10px;

`;

const Title = styled.h1`
  font-size: 2.9rem;
  margin-bottom: 20px;
  text-align: center;
  padding: 15px;
`;

const SubTitle = styled.h2`
  font-size: 18px;
  margin-bottom: px;
  margin-top: 20px;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

{/*const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;*/}

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;


  &:hover {
    background-color: #0056b3;
  }
`;

const Hr = styled.hr`
  width: 70%;
  margin: 30px auto 40px auto;
  border: none;
  border-top: 3px solid #534d4d51;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const ResultsContainer = styled.div`
  margin-top: 20px;
`;


const ResultCard = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 20px;
`;

const PreviewParrafo = styled.p`
  display: flex;
  flex-direction: column;
`;


const GeneradorPrendas = () => {
  const [tipoEvento, setTipoEvento] = useState('');
  const [filtroTipoPrenda, setFiltroTipoPrenda] = useState('');
  const [filtroColor, setFiltroColor] = useState('');
  const [prendasSeleccionadas, setPrendasSeleccionadas] = useState([]);
  const [prendaAleatoria, setPrendaAleatoria] = useState(null);
  const [prendasVistaPrevia, setPrendasVistaPrevia] = useState([]);


  useEffect(() => {
    obtenerPrendas();
  }, [tipoEvento, filtroTipoPrenda, filtroColor]);

  const obtenerPrendas = async () => {
    try {
      let queryRef = collection(db, "Prendas");

      const condiciones = [];

      if (tipoEvento) {
        condiciones.push(where("tipoEvento", "==", tipoEvento));
      }

      if (filtroTipoPrenda) {
        condiciones.push(where("tipoPrenda", "==", filtroTipoPrenda));
      }

      if (filtroColor) {
        condiciones.push(where("color", "==", filtroColor));
      }

      if (condiciones.length > 0) {
        queryRef = query(queryRef, ...condiciones);
      }

      const querySnapshot = await getDocs(queryRef);
      const prendasArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPrendasSeleccionadas(prendasArray);
    } catch (error) {
      console.error("Error obteniendo prendas:", error);
    }
  };

  const agregarPrendaVistaPrevia = () => {
    const prendasFiltradas = prendasSeleccionadas.filter(prenda => {
      const cumpleTipoPrenda = filtroTipoPrenda ? prenda.tipoPrenda === filtroTipoPrenda : true;
      const cumpleColor = filtroColor ? prenda.color === filtroColor : true;
      return cumpleTipoPrenda && cumpleColor;
    });

    if (prendasFiltradas.length > 0) {
      let intentos = 1;
      let agregado = false;

      while (!agregado && intentos < prendasFiltradas.length) {
        const indiceAleatorio = Math.floor(Math.random() * prendasFiltradas.length);
        const prendaAleatoria = prendasFiltradas[indiceAleatorio];

        const yaEstaEnVistaPrevia = prendasVistaPrevia.some(prenda => prenda.id === prendaAleatoria.id);

        if (!yaEstaEnVistaPrevia) {
          setPrendasVistaPrevia(prevPrendas => [...prevPrendas, prendaAleatoria]);
          agregado = true;
          toast.success("Prenda Generada");
        } else {
          intentos++;
        }
      }

      if (!agregado) {
        toast.warning("Todas las prendas disponibles ya están en la vista previa o no cumplen con los filtros.");
      }
    } else {
      toast.error("No hay prendas que cumplan con los filtros seleccionados.");
    }
  };

  return (
    <BgContainer>
      <PageContainer>
        <Container>
          <Title>Generador de Prendas</Title>
          <Label>
            Tipo de Evento:
            <Select
              value={tipoEvento}
              onChange={(e) => setTipoEvento(e.target.value)}
            >
              <option value="" disabled selected>Selecciona el Evento</option>
              <option value="Casual">Casual</option>
              <option value="Arreglado">Arreglado</option>
              <option value="Urbano">Urbano</option>
              <option value="Elegante">Elegante</option>
            </Select>
          </Label>

          <Label>
            Filtrar por Tipo de Prenda:
            <Select
              value={filtroTipoPrenda}
              onChange={(e) => setFiltroTipoPrenda(e.target.value)}
            >
              <option value="">Todos</option>
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
              <option value="Bolso|Mochila">Bolso | Mochila</option>
              <option value="Accesorio">Accesorio</option>
            </Select>
          </Label>

          <Label>
            Filtrar por Color:
            <Select
              value={filtroColor}
              onChange={(e) => setFiltroColor(e.target.value)}
            >
              <option value="" selected>Cualquiera</option>
              <option value="Negro">Negro</option>
              <option value="Blanco">Blanco</option>
              <option value="Rojo">Rojo</option>
              <option value="Azul">Azul</option>
              <option value="Verde">Verde</option>
              <option value="Amarillo">Amarillo</option>
              <option value="Naranja">Naranja</option>
              <option value="Marrón">Marrón</option>
              <option value="Gris">Gris</option>
              <option value="Rosa">Rosa</option>
              <option value="Violeta">Violeta</option>
              <option value="Plata">Plata</option>
              <option value="Oro">Oro</option>
            </Select>
          </Label>

          <ButtonBox><Button onClick={agregarPrendaVistaPrevia}>Generar Prenda</Button></ButtonBox>
          <ResultsContainer>
            <Hr></Hr>
            <SubTitle>Las Prendas Elegidas Para Tú Outfit</SubTitle>
            {prendasVistaPrevia.map((prenda, index) => (
              <ResultCard key={index}>
                <PreviewImage src={prenda.imagenUrl} alt="Prenda" />
                <PreviewParrafo>
                  <h2>{prenda.nombre}</h2>
                  <p>{prenda.tipoPrenda}</p>
                  <p>{prenda.marca}</p>
                </PreviewParrafo>
              </ResultCard>
            ))}
          </ResultsContainer>
        </Container>
      </PageContainer>
    </BgContainer>
  );
};

export default GeneradorPrendas;