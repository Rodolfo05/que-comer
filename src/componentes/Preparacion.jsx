import React from 'react'
import { useLocation } from 'react-router-dom/dist'

export const Preparacion = () => {

const receta = useLocation();

  return (
    <div>
        <h2>Preparacion</h2>
           <p>{receta.state}</p>
    </div>
 
  )
}
