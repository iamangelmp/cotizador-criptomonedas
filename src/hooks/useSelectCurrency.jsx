import React, { useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  color: #fff;
  display: block;
  font-family: "Lato", sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin: 15px 0;
`;

const Select = styled.select`
  width: 100%;
  font-size: 18px;
  padding: 14px;
  border-radius: 10px;
`;

function useSelectCurrency(label, currencies) {
  const [state, setSate] = useState("");
  const selectCurrency = () => (
    <>
      <Label htmlFor="moneda">{label}</Label>
      <Select
        id="moneda"
        value={state}
        onChange={(e) => setSate(e.target.value)}
      >
        <option value="">Seleccione</option>
        {currencies.map((optionCurrent) => (
          <option key={optionCurrent.id} value={optionCurrent.id}>
            {optionCurrent.nombre}
          </option>
        ))}
      </Select>
    </>
  );

  return [state, selectCurrency];
}

export default useSelectCurrency;
