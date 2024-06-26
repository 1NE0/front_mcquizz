
import { useState, useEffect } from 'react';
import React from 'react';
import Alien from '/assets/aliens.svg';
import AOS from 'aos';
import sendRequest from '../hooks/useHttp';
import { format } from 'date-fns';



const Finalizado = ({ preguntas , setPreguntas, pageActual, setPageActual, puntos, setPuntos }) => {
    
    const [puntosLocales, setPuntosLocales] = useState(puntos);
    useEffect(() => {
        AOS.init();

        const user = loadFromLocalStorage('user');
        

        realizarRegistro(user);
    }, []);

    // realizar el registro de la puntuación
    const realizarRegistro = async (user) => {
        // Obtener la fecha actual
        const today = new Date();

        const registro = await sendRequest('/ranking', 'POST', {
            idCategoria: preguntas[0].categoria,
            idUsuario: user._id,
            puntuacion: puntos,
            fecha: format(today, 'MM/dd/yyyy')
        });

        setPuntos(0);
        console.log(registro);
    }
    
    // Función para guardar datos en el local storage
      const saveToLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    // Función para cargar datos desde el local storage
    const loadFromLocalStorage = (key) => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex gap-10 flex-col justify-center items-center">
                <h1 data-aos="fade-in" className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                    ¡Cuestionario completado!
                </h1>
                <p data-aos="fade-left" className='dark:text-white'>Puntos {puntosLocales}</p>
                <img width="200px" src={Alien} alt="" />
                <div className='flex gap-4 w-full'>
                        <button
                            data-aos="zoom-in"
                            onClick={() => setPageActual("home")}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Ir al menú principal
                        </button>
                        <button
                            data-aos="zoom-in"
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