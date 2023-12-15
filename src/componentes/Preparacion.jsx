import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom/dist'
import { preparaciones } from '../data/preparaciones';

export const Preparacion = () => {

  const idReceta = useLocation();

  const [preparacionEncontrada, setPreparacionEncontrada] = useState(null);

  useEffect(() => {
    const resultado = preparaciones.filter(prep => prep.id_receta === idReceta.state);

    setPreparacionEncontrada(resultado[0].pasos);
  }, [idReceta]);


  const buscaPreparacion = (idReceta) => {

  }

  return (
    <div className='container pt-4'>

      <h2>Preparacion:</h2>

      <div className='preparacion-caja'>

        {preparacionEncontrada ?
          (

            <ol type='1'>
              {
                preparacionEncontrada.map(pasos => {
                  return (
                    <li className='preparacion-pasos'>{pasos}</li>
                  )
                })
              }
            </ol>

          )
          :
          null}

      </div>


    </div>

  )
}
