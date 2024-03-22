
import { useState, useEffect } from 'react';
import React from 'react';
import Alien from '/assets/aliens.svg';


const Finalizado = ({ preguntas , setPreguntas, pageActual, setPageActual, puntos, setPuntos }) => {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex gap-10 flex-col justify-center items-center">
                <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                    ¡Cuestionario completado!
                </h1>
                <p className='dark:text-white'>Puntos {puntos}</p>
                <img width="200px" src={Alien} alt="" />
                <div className='flex gap-4 w-full'>
                        <button
                            onClick={() => setPageActual("home")}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Ir al menú principal
                        </button>
                        <button
                            type="submit"
                            className="border-2 flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-grey-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Ver top 10
                        </button>
                </div>
            </div>
        </div>
    );
};

export default Finalizado;