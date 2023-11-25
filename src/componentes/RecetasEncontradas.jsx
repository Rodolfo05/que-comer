import React from 'react'
import { useLocation } from 'react-router-dom'

export const RecetasEncontradas = () => {

  const loc = useLocation();

  return (
    <div>RecetasEncontradas
      <p>{JSON.stringify(loc.state)}</p>
    </div>
  )
}
