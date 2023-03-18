import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Result from "./components/Result";
import imagenCripto from "./img/imagen-criptos.png";
import Form from "./components/Form";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Picture = styled.img`
  max-width: 400px;
  margin: 100px auto 0 auto;
  width: 80%;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

function App() {
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {
        setCargando(true);
        setResultado({});

        const { moneda, cripto } = monedas;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        console.log(resultado);

        setResultado(resultado.DISPLAY[cripto][moneda]);

        setCargando(false);
      };

      cotizarCripto();
    }
  }, [monedas]);

  return (
    <Container className="App">
      <Picture src={imagenCripto} alt="cotizador criptomonedas" />
      <div>
        <Heading> Cotiza Criptomonedas al Instante</Heading>
        <Form setMonedas={setMonedas} />
        {Object.keys(resultado).length > 0 ? (
          <Result resultado={resultado} />
        ) : null}
      </div>
    </Container>
  );
}

export default App;
