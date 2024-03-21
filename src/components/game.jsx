import React, { useState, useEffect } from 'react';
import sendRequest from '../hooks/useHttp';
import { ArrowRightCircleIcon, FaceFrownIcon, FaceSmileIcon } from '@heroicons/react/24/solid'
export const QuestionForm = ({ preguntas , setPreguntas, pageActual, setPageActual, puntos, setPuntos }) => {
  const [preguntaIndex, setPreguntaIndex] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [respuestaIndex, setRespuestaIndex] = useState(0);
  const [statusRespuesta, setStatusRespuesta] = useState('sincontestar'); // sincontestar - error = correcta
  const preguntaActual = preguntas[preguntaIndex];

  useEffect(() => {
    console.log(preguntas);
  }, [preguntas]);

  const handleRespuestaSeleccionada = (respuestaId , e) => {
    const index = e.target.getAttribute("index");
    console.log(index);
    setRespuestaIndex(index);
    setRespuestaSeleccionada(respuestaId);
  };


  const mostrarRespuestaCorrecta = (isCorrecta) => {
      const label = document.getElementById(`label-${respuestaIndex}`);
      label.style.border = "5px solid #22c55e";
      label.style.color = " #22c55e";
      setStatusRespuesta("correcta");
  }

  const mostrarRespuestaIncorrecta = () => {
      const label = document.getElementById(`label-${respuestaIndex}`);
      label.style.border = "5px solid red";
      label.style.color = "red";
      setStatusRespuesta("error");
  }

  const siguientePregunta = async () => {

    if(statusRespuesta === "sincontestar"){
      // hacer lógica para mostrar la respuesta correcta
      const respuestaCorrecta = preguntaActual.respuestas.find(respuesta => respuesta.correcta);
      // verificar si la respuesta seleccionada es correcta
      const response = await sendRequest('/verificarRespuesta', 'POST', {
        "idPregunta": preguntaActual._id,
        "idRespuesta": respuestaIndex
      })

      console.log(response["correcta"]);
      if(response["correcta"]){
        console.log("Respuesta correcta");
        mostrarRespuestaCorrecta();
        setPuntos((puntosPrev) => puntosPrev + 10);
      }else{
        console.log("Respuesta incorrecta");
        mostrarRespuestaIncorrecta();
      }

    }else{
      if (preguntaIndex < preguntas.length - 1) {
        setPreguntaIndex(preguntaIndex + 1);
        setRespuestaSeleccionada(null); // Reiniciar la respuesta seleccionada para la nueva pregunta
      } else {
        console.log('¡Cuestionario completado!');
        setPageActual("finalizado");
        // Aquí podrías mostrar un mensaje de finalización o realizar alguna acción adicional
      }

      setStatusRespuesta("sincontestar");
    }
    

    

    return 0;

    
  };




  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">{preguntaActual.label}</h1>
        <ul className="grid w-full gap-6 md:grid-cols-1">
            {preguntaActual.respuestas.map((respuesta , index) => (
                <li key={respuesta._id}>
                    <input
                        type="radio"
                        id={`respuesta-${respuesta._id}`}
                        name="respuesta"
                        value={respuesta._id}
                        index={index}
                        className="hidden peer"
                        disabled={statusRespuesta !== 'sincontestar'}
                        checked={respuesta._id === respuestaSeleccionada}
                        onChange={(e) => handleRespuestaSeleccionada(respuesta._id, e)}
                    />
                    <label
                        id={`label-${index}`}
                        htmlFor={`respuesta-${respuesta._id}`}
                        className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                    <div className="block">
                        <div className="w-full text-lg font-semibold">{respuesta.texto}</div>
                    </div>
                    
                    {statusRespuesta === 'correcta' && respuesta._id === respuestaSeleccionada
                    ? 
                    <FaceSmileIcon className="h-6 w-6 text-green-500" /> 
                    : statusRespuesta === 'error' && respuesta._id === respuestaSeleccionada
                    ? 
                    <FaceFrownIcon className="h-6 w-6 text-red-500" /> 
                    : 
                    <ArrowRightCircleIcon className="h-6 w-6 text-grey-800" /> }
                </label>
                </li>
            ))}
            </ul>
            <button
                onClick={siguientePregunta}
                type="submit"
                className="mt-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             >
                {statusRespuesta === 'sincontestar' ? 'Responder' : 'Siguiente'}
                
             </button>
      </div>
    </div>
  );
};