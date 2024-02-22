import React, { useState, useEffect } from 'react';
import { addDoc, getDocs, collection, doc, setDoc, where, query } from 'firebase/firestore';
import { db } from '../firebase';

import styled from "styled-components";


const BgContainer = styled.div`
  background-image: url("src/assets/img/bg-createoutfit.jpg");
  background-size: cover;
  background-repeat: no-repeat;
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
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
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
`;

const GeneradorPrendas = () => {
  const [tipoEvento, setTipoEvento] = useState('');
  const [filtroTipoPrenda, setFiltroTipoPrenda] = useState('');
  const [filtroColor, setFiltroColor] = useState('');
  const [prendasSeleccionadas, setPrendasSeleccionadas] = useState([]);
  const [prendaAleatoria, setPrendaAleatoria] = useState(null);

  useEffect(() => {
    obtenerPrendas();
  }, [tipoEvento, filtroTipoPrenda, filtroColor]);

  const obtenerPrendas = async () => {
    if (tipoEvento) {
      try {
        let queryRef = collection(db, "Prendas");

        // Aplicar filtro por tipo de evento
        queryRef = query(queryRef, where("tipoEvento", "==", tipoEvento));

        // Aplicar filtro por tipo de prenda si está seleccionado
        if (filtroTipoPrenda) {
          queryRef = query(queryRef, where("tipoPrenda", "==", filtroTipoPrenda.toLowerCase()));
        }

        // Aplicar filtro por color si está seleccionado
        if (filtroColor) {
          queryRef = query(queryRef, where("color", "==", filtroColor.toLowerCase()));
        }

        const querySnapshot = await getDocs(queryRef);

        const prendasArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Prendas disponibles:", prendasArray);

        setPrendasSeleccionadas(prendasArray);
      } catch (error) {
        console.error("Error obteniendo prendas:", error);
      }
    }
  };

  const obtenerPrendaAleatoria = () => {
    if (prendasSeleccionadas.length > 0) {
      const indiceAleatorio = Math.floor(Math.random() * prendasSeleccionadas.length);
      setPrendaAleatoria(prendasSeleccionadas[indiceAleatorio]);
    }
  };

  return (
    <Container>
      <Title>Generador de Prendas</Title>

      <Label>
        Tipo de Evento:
        <Input
          type="text"
          value={tipoEvento}
          onChange={(e) => setTipoEvento(e.target.value)}
        />
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
          <option value="Bolso | Mochila">Bolso | Mochila</option>
          <option value="Accesorio">Accesorio</option>
          {/* Agrega más opciones según los tipos de prendas que tengas */}
        </Select>
      </Label>

      <Label>
        Filtrar por Color:
        <Input
          type="text"
          value={filtroColor}
          onChange={(e) => setFiltroColor(e.target.value)}
        />
      </Label>

      <Button onClick={obtenerPrendaAleatoria}>
        Obtener Prenda Aleatoria
      </Button>

      {prendaAleatoria && (
        <ResultsContainer>
          <ResultCard>
            <h2>{prendaAleatoria.nombre}</h2>
            <p>Tipo: {prendaAleatoria.tipoPrenda}</p>
            <p>Evento: {prendaAleatoria.tipoEvento}</p>
            <p>Color: {prendaAleatoria.color}</p>
          </ResultCard>
        </ResultsContainer>
      )}

      <ResultsContainer>
        <h2>Prendas Disponibles</h2>
        {prendasSeleccionadas.map((prenda) => (
          <ResultCard key={prenda.id}>
            <p>{prenda.nombre}</p>
            <p>Tipo: {prenda.tipoPrenda}</p>
            <p>Evento: {prenda.tipoEvento}</p>
            <p>Color: {prenda.color}</p>
          </ResultCard>
        ))}
      </ResultsContainer>
    </Container>
  );
};

export default GeneradorPrendas;