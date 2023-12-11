import React from 'react'
import { useLocation } from 'react-router-dom'
import { RecetaEncontrada } from './RecetaEncontrada';

export const RecetasEncontradas = () => {

  const recetas = useLocation();
  console.log(recetas)

  return (
    <div className='container pt-4'>
      <h2>Recetas Encontradas</h2>

      {recetas.state.map(receta => {

        return(
          <RecetaEncontrada 
            key={receta.id} 
            id={receta.id} 
            nombre={receta.nombre} 
            ingredientes={receta.ingredientes}
            tiempoPrep={receta.tiempo_preparacion}  
          />
        )
      })}


    </div>
  )
}
