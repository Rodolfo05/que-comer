import React from 'react'
import { useLocation } from 'react-router-dom'
import { RecetaEncontrada } from './RecetaEncontrada';

export const RecetasEncontradas = () => {

  const recetas = useLocation();


  return (
    <div>
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
