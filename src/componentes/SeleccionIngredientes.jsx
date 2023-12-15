import React, { useEffect, useState } from 'react'
import { ingredientesBD } from '../data/ingredientes'
import { recetasBD } from '../data/recetas';
import { useNavigate } from 'react-router-dom';
import { Modal } from './Modal';
import styled from 'styled-components';

export const SeleccionIngredientes = () => {

    const [estadoModal, setEstadoModal] = useState(false);

    ingredientesBD.sort(function (a, b) {
        var nombreA = a.nombre.toUpperCase(); // Ignorar mayúsculas y minúsculas
        var nombreB = b.nombre.toUpperCase(); // Ignorar mayúsculas y minúsculas
        if (nombreA < nombreB) {
            return -1;
        }
        if (nombreA > nombreB) {
            return 1;
        }
        // Los nombres son iguales
        return 0;
    });

    const [textoBuscado, setTextoBuscado] = useState("");
    const [resultadosEncontrados, setResultadosEncontrados] = useState(null);
    const [ingredientesSelected, setIngredientesSelected] = useState([]);

    const [recetasEncontradas, setRecetasEncontradas] = useState([]);

    const handleChange = (e) => {
        document.getElementById("div-ingredientes").style.visibility = "visible";
        setTextoBuscado(e.target.value);
    }

    useEffect(() => {
        const resultados = ingredientesBD.filter(item => item.nombre.toLowerCase().includes(textoBuscado.toLowerCase()));

        setResultadosEncontrados(resultados);
    }, [textoBuscado])


    useEffect(() => {
        if (recetasEncontradas.length > 0) {
            navigate('/recetasEncontradas', { state: recetasEncontradas, ingre: ingredientesSelected });
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

    const handleSubmit = (event) => {
        event.preventDefault();

        setEstadoModal(!estadoModal);

    }


    const buscarRecetas = () => {

        setRecetasEncontradas([]);

        ingredientesSelected.map(ingrediente => {

            recetasBD.map(receta => {
                let tieneReceta = false;

                const result = receta.ingredientes.filter(item => item == ingrediente);

                if (result.length) {
                    tieneReceta = true;
                };

                if (tieneReceta) {
                    setRecetasEncontradas(recetasEncontradas => [...recetasEncontradas, receta]);
                } else {
                    console.log("No se ha encontrado receta, tirar un modal");
                    setEstadoModal(true);
                }
            });

        })

        console.log(recetasEncontradas)

        //    redirigeARecetasEncontradas();

    }



    return (
        <div className='container pt-4'>

            <div className='seleccionIngredientes'>

                <h3>Seleccione los ingredientes que tiene en casa:</h3>
          
                <input type='text' className='form-control' placeholder='Harina, Leche, Tomates, etc...' value={textoBuscado} onChange={handleChange} />
             
                <div id='div-ingredientes' className='container' style={{ visibility: 'hidden' }}>
                    {resultadosEncontrados?.map(item => (

                        <div key={`div-${item.id}`} className="btn-group" role="group" aria-label="Basic checkbox toggle button group">

                            <input className='btn-check' id={`check-${item.id}`} autoComplete="off" key={`check-${item.id}`} onChange={onCheckIngrediente} type='checkbox' value={item.nombre} />
                            <label className='btn btn-outline-primary lblCheckIngrediente' htmlFor={`check-${item.id}`} key={`lbl-${item.id}`}>{item.nombre}</label>

                        </div>

                    ))}
                </div>
            </div>



            <div className='mis-ingredientes'>
                <h3>Tus ingredientes:</h3>
                <div className='container-mis-ingredientes'>
                    {ingredientesSelected.map((ingrediente, index) => {
                        return (
                            <div className='caja-mis-ingrediente'>
                                <label key={index}>{ingrediente}</label>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='container-btn'>
                <button className='btn btn-primary' onClick={buscarRecetas}>Buscar Recetas</button>
            </div>



            <Modal estado={estadoModal} cambiarEstado={setEstadoModal}>
                <Contenido>
                    <h3>No se han encontrado recetas. <i class="fa-regular fa-circle-check"></i></h3>
                    <p>Intente añadiendo mas ingredientes en la búsqueda.</p>
                    <Boton onClick={() => setEstadoModal(false)}>Aceptar</Boton>
                </Contenido>
            </Modal>


        </div>

    )
}


const Boton = styled.button`
	display: block;
	padding: 10px 30px;
	border-radius: 20px; 
  border: 0px;
	color: #fff;
	cursor: pointer;
	font-family: 'Roboto', sans-serif;
	font-weight: 500;
	transition: .3s ease all;
  box-shadow: 0px 0px 14px -7px #FF512F;
  background: #f09819;

	&:hover {
		background: #FF512F;
	}
`;

const Contenido = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;


	h1 {
		font-size: 42px;
		font-weight: 700;
		margin-bottom: 10px;
	}

	p {
		font-size: 18px;
		margin-bottom: 20px;
	}

	img {
		width: 100%;
		vertical-align: top;
		border-radius: 3px;
	}
`;
