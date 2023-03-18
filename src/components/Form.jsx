import React, { useState } from "react";
import styled from "@emotion/styled";
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

function Form() {
  const [moneda, SelectCurrency] = useSelectCurrency(
    "Elige tu moneda",
    currencies
  );
  //   const [SelectCripto, setSelectCripto] = useSelectCurrency(
  //     "Elige tu criptomoneda"
  //   );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("enviando formulario");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <SelectCripto /> */}
        <SelectCurrency />
        {moneda}
        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
}

export default Form;
