import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Alert from "./Alert";
import useSelectCurrency from "../hooks/useSelectCurrency";
import { currencies } from "../data/currency";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

function Form({ setMonedas }) {
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);
  const [moneda, SelectCurrency] = useSelectCurrency(
    "Elige tu moneda",
    currencies
  );
  const [cripto, SelectCripto] = useSelectCurrency(
    "Elige tu Criptomoneda",
    criptos
  );

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      const arrayCriptos = resultado.Data.map((cripto) => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };
        return objeto;
      });

      setCriptos(arrayCriptos);
    };
    consultarAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([cripto, moneda].includes("")) {
      return setError(true);
    } else {
      setError(false);
      setMonedas({ cripto, moneda });
    }
  };

  return (
    <>
      {error ? <Alert msj={"Todos los campos son obligatorios"} /> : null}
      <form onSubmit={handleSubmit}>
        <SelectCurrency />
        <SelectCripto />

        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
}

export default Form;
