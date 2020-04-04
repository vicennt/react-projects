import React from 'react';
import { ButtonBackHome } from '../components/ButtonBackHome'


export const NotFound = () => (
  <div>
    <h1 style={{color: '#000', fontSize: 30}}>404!</h1>
    <h2>No existe la página</h2>
    <ButtonBackHome to="/" className="button is-info is-rounded">Volver al buscador</ButtonBackHome>
  </div>
)