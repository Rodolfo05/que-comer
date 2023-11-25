import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SeleccionIngredientes } from '../componentes/SeleccionIngredientes'
import { RecetasEncontradas } from '../componentes/RecetasEncontradas'
import { Preparacion } from '../componentes/Preparacion'

export const RecetasAppRouter = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<SeleccionIngredientes/>}/>
        <Route path='recetasEncontradas' element={<RecetasEncontradas/>}/>
        <Route path='preparacion' element={<Preparacion/>}/>
        <Route path='/*' element={<Navigate to="/"/>}/>
    </Routes>
    </>
  )
}
