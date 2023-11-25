import React, { useEffect, useState } from 'react'
import { ingredientesBD } from '../data/ingredientes'
import { recetasBD } from '../data/recetas';
import { useNavigate } from 'react-router-dom';

export const SeleccionIngredientes = () => {

    const [textoBuscado, setTextoBuscado] = useState("Lec");
    const [resultadosEncontrados, setResultadosEncontrados] = useState(null);
    const [ingredientesSelected, setIngredientesSelected] = useState([]);

    const [recetasEncontradas, setRecetasEncontradas] = useState([]);

    const [lol, setLol] = useState({aaa: "123"});

    const handleChange = (e) => {
        document.getElementById("ulIngredientes").style.visibility = "visible";
        setTextoBuscado(e.target.value);
    }



    useEffect(() => {
        const resultados = ingredientesBD.filter(item => item.nombre.toLowerCase().includes(textoBuscado.toLowerCase()));

        setResultadosEncontrados(resultados);
    }, [textoBuscado])

    const {pathname} = location;

    useEffect(() => {
        if(recetasEncontradas.length > 0){
            navigate('/recetasEncontradas', {state: recetasEncontradas});
        }
    }, [recetasEncontradas])
    


    const onCheckIngrediente = (e) => {

        let ingredienteSeleccionado = e.target.value;

        if (e.target.checked) {

            setIngredientesSelected(ingredientesSelected => [...ingredientesSelected, ingredienteSeleccionado])
        } else {
            let ingredientesFiltrados = ingredientesSelected.filter(item => item.toLowerCase() !== ingredienteSeleccionado.toLowerCase())
            setIngredientesSelected(ingredientesFiltrados);
        }
    }

    const navigate = useNavigate();

    const redirigeARecetasEncontradas = () => {
        navigate('/recetasEncontradas', {state: recetasEncontradas});
    }

    const buscarRecetas = () => {

        setRecetasEncontradas([]);

        ingredientesSelected.map(ingrediente => {

            recetasBD.map(receta => {
                let tieneIngrediente = false;

                const result = receta.ingredientes.filter(item => item == ingrediente);

                if (result.length) {
                    tieneIngrediente = true;
                };

                if (tieneIngrediente) {
                    setRecetasEncontradas(recetasEncontradas => [...recetasEncontradas, receta]);
                }
            });

        })

        console.log(recetasEncontradas)

    //    redirigeARecetasEncontradas();

    }



    return (
        <>
        <div className='seleccionIngredientes'>
            
            <h3>Seleccione los ingredientes que tiene en casa:</h3>
            
            <input type='text' className='form-control' placeholder='Harina, Leche, Tomates, etc...' value={textoBuscado} onChange={handleChange} />

            <ul id='ulIngredientes' style={{visibility: 'hidden'}}>
                {resultadosEncontrados?.map(item => (

                    <div key={`div-${item.id}`} className="btn-group" role="group" aria-label="Basic checkbox toggle button group">

                        <input className='btn-check' id={`check-${item.id}`}autocomplete="off" key={`check-${item.id}`} onChange={onCheckIngrediente} type='checkbox' value={item.nombre} />
                        <label className='btn btn-outline-primary lblCheckIngrediente' for={`check-${item.id}`} key={`lbl-${item.id}`}>{item.nombre}</label>

                    </div>

                ))}
            </ul>

            <div>
                <h3>Tus ingredientes:</h3>
            <ul>
                {ingredientesSelected.map(ingrediente => {
                     return(
                        <li>{ingrediente}</li>
                        )
                })}
              </ul>
            </div>

            <button className='btn btn-primary' onClick={buscarRecetas}>Buscar Recetas</button>

            <div>
                <p>{JSON.stringify(recetasEncontradas)}</p>
            </div>

            
        </div>

 
        </>
       
    )
}
