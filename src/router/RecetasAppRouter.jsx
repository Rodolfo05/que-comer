import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SeleccionIngredientes } from '../componentes/SeleccionIngredientes'
import { RecetasEncontradas } from '../componentes/RecetasEncontradas'

export const RecetasAppRouter = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<SeleccionIngredientes/>}/>
        <Route path='recetasEncontradas' element={<RecetasEncontradas/>}/>
        <Route path='/*' element={<Navigate to="/"/>}/>
    </Routes>
    </>
  )
}
