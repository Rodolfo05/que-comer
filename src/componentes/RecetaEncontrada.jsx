import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom/dist'


export const RecetaEncontrada = ({nombre, ingredientes, tiempoPrep}) => {

    const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);

    useEffect(() => {
      if(recetaSeleccionada !== null){
        navigate('/preparacion', {state: recetaSeleccionada});
      }
    }, [recetaSeleccionada])
    

    const navigate = useNavigate();

    const goToPreparacion = (nombreReceta) => {
        setRecetaSeleccionada(nombreReceta);
   
    }

    

    const retornaIngredientes = () => {

        let respuesta = "";

        for(let i = 0; i < ingredientes.length; i++){

            respuesta += ingredientes[i];

            if(i+1 !== ingredientes.length){
                respuesta += ", ";
            }
            
        }

        return respuesta;
    }

    return (
        <div className='recetaEncontrada-caja' onClick={() => goToPreparacion(nombre)}>
            <h4>{nombre}</h4>

            <label>Ingredientes: {retornaIngredientes()}</label>
            <p>Tiempo Preparación: {tiempoPrep} minutos.</p>
            <p>Te faltan estos ingredientes: ...</p>
            <h4>{recetaSeleccionada}</h4>
        </div>
    )
}
