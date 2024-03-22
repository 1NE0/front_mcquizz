import React, { useEffect, useState } from 'react';
import useHttp from '../hooks/useHttp';
import sendRequest from '../hooks/useHttp';
import AOS from 'aos';

export const FirstView = ({ pageActual, setPageActual , setPreguntas, preguntas}) => {

    const [dataCategorias, setDataCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [categoriaNoSeleccionada , setErrorCategoriaNoSeleccionada] = useState(false)
    const [cargandoCategorias, setCargandoCategorias ] = useState(true);
    
    useEffect(() => {
        AOS.init();
        setCargandoCategorias(true);
        // Ejemplo de cómo utilizar el hook para realizar una solicitud al cargar el componente
        //console.log("Cargando categorias...");
        sendRequest("/categorias", "GET").then((data) => {
            //console.log(data);
            setDataCategorias(data);
            setCargandoCategorias(false);
        })
    }, []);


    const handleSubmit = async (event) => {
        setErrorCategoriaNoSeleccionada(false);
        event.preventDefault();
        const formData = new FormData(event.target);
        const nombre = formData.get('nombre');
        const email = formData.get('email');
        //console.log({ nombre, email, categoriaSeleccionada});

        try {
            
            const selectedCategory = document.querySelector('input[name="category"]:checked');
            if (!selectedCategory) {
                // No se ha seleccionado ninguna categoría, muestra el mensaje de error
                setErrorCategoriaNoSeleccionada(true);
                return 0;
            }
            //const user = await sendRequest("/crearUsuario", "POST", { nombre, email });

            // buscar preguntas con esta categoria
            const preguntas = await sendRequest("/preguntas/categorias/" + categoriaSeleccionada, "GET");

            setPreguntas(preguntas);
            setPageActual("preguntas");
        } catch (error) {
            // Manejar el error, si es necesario
            //console.error(error);
            // mostrar un error
        }
    };

    const handleChangeCategoria = (event) => {
        setCategoriaSeleccionada(event.target.value);
    };

    return (
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <img 
                        data-aos="fade-in"
                        className="mx-auto w-52"
                        src="/assets/logo.png"
                    /> */}
                    <h1 data-aos="fade-right" className="mb-10 text-6xl dark:text-white mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        McQuizz
                    </h1>
                </div>
                    
                
                
                
                
                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-5" action="#" method="POST" onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-4'>
                            <div className="">
                                <label data-aos="fade-left" htmlFor="email" className="dark:text-zinc-400 text-left block text-sm font-medium leading-6 text-gray-900">
                                    Ingresa tu nombre
                                </label>
                                <input data-aos="fade-right" type="name" name="nombre" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mi papá se llama Edgar" required />
                            </div>
                            <div>
                                <label data-aos="fade-left" htmlFor="email" className="dark:text-zinc-400 text-left block text-sm font-medium leading-6 text-gray-900">
                                    Selecciona una categoria de preguntas
                                </label>
                                <ul data-aos="fade-in" className="mt-2 grid w-full gap-3 md:grid-cols-3">
                                    {cargandoCategorias
                                        ? 
                                        [1,2,3].map((index) => {
                                            return (
                                                <li data-aos="fade-in" key={index} className='p-2 bg-white dark:bg-gray-700 rounded pb-4 pt-4'>
                                                    <div className="animate-pulse h-2.5 w-1/2 dark:bg-gray-600 rounded-full bg-gray-300 mb-2"></div>
                                                    <div className="animate-pulse h-2.5 w-full dark:bg-gray-600 rounded-full bg-gray-300"></div>
                                                </li>  
                                                )
                                            }) 
                                            : 
                                            dataCategorias.map((element, index) => (
                                                <li data-aos="fade-in" key={index}>
                                                    <input onChange={handleChangeCategoria} type="radio" id={`category-${index}`} name="category" value={element._id} className="hidden peer" />
                                                    <label htmlFor={`category-${index}`} className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                                        <p className="text-xs">{element.nombre}</p>
                                                        <svg className="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                                        </svg>
                                                    </label>
                                                </li>
                                            ))
                                        }
                                        
                                    </ul>
                                    {categoriaNoSeleccionada && <p className="text-red-500">Debes seleccionar una categoria</p>}
                                </div>
                            </div>
                            <div>
                                <button
                                    data-aos="zoom-out"
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Jugar
                                </button>
                                
                            </div>
                        </form>

                        <p className="mt-5 text-center text-sm text-gray-500">
                            Creado por Sebastian Ortiz - 2024
                        </p>
                    </div>
            </div>
    );
}
