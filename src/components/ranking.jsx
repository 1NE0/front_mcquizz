import { useEffect, useState } from "react";
import AOS from 'aos';
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import sendRequest from "../hooks/useHttp";


const Ranking = ({preguntas, setPreguntas, pageActual, setPageActual, puntos, setPuntos}) => {

    const [categorias, setCategorias] = useState(null);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [rankinByCategory, setRankingByCategory] = useState([]);

    useEffect(() => {
        AOS.init();

        // obtener categorias
        const fetchData = async () => {
            const data = await sendRequest('/categorias', 'GET');
            //console.log("data" + data[0]["descripcion"]);
            setCategorias(data);
            setCategoriaSeleccionada(data[0]["_id"]);
        };

        fetchData();
    }, []);

    useEffect(() => {
        fetchRankings();
    }, [categoriaSeleccionada])

    const fetchRankings = async () => {
        if(categoriaSeleccionada != null){
            const data = await sendRequest(`/ranking/${categoriaSeleccionada}`, 'GET');
            console.log("informacion del ranking : " + data )
            setRankingByCategory(data);
        }
    };


    return (
            categorias == null ? 
            <div data-aos="fade-left" className="" style={{"width": "600px"}}>
                <div className="cursor-pointer container flex items-center mb-4 gap-4" onClick={() => setPageActual("home")}>
                    <div className="font-bold w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md dark:bg-gray-700">
                        <ArrowLeftIcon className="w-4 h-4 dark:text-white" />
                    </div>
                    <h1 className="dark:text-white">Regresar</h1>
                </div>
                <div className="md:flex">
                    <ul className=" flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                        <li className="border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 h-12 p-4">
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5 animate-pulse"></div>
                        </li>
                        <li className="border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 h-12 p-4">
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5 animate-pulse"></div>
                        </li>
                        <li className="border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 h-12 p-4">
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5 animate-pulse"></div>
                        </li>
                        <li className="border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 h-12 p-4">
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5 animate-pulse"></div>
                        </li>
                    </ul>
                    <div role="status" className=" w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <div className="flex items-center justify-between pt-4">
                            <div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <div className="flex items-center justify-between pt-4">
                            <div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <div className="flex items-center justify-between pt-4">
                            <div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <div className="flex items-center justify-between pt-4">
                            <div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
            :
            <div data-aos="fade-left" className="" style={{"width": "600px"}}>
                <div className="cursor-pointer container flex items-center mb-4 gap-4" onClick={() => setPageActual("home")}>
                    <div className="font-bold w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md dark:bg-gray-700">
                        <ArrowLeftIcon className="w-4 h-4 dark:text-white" />
                    </div>
                    <h1 className="dark:text-white">Regresar</h1>
                </div>
                <div className="md:flex">
                    <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                        {categorias.map((cat, index) => (
                            <li key={index}>
                                <a href="#" onClick={() => setCategoriaSeleccionada(cat["_id"])} className="inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600" aria-current="page">
                                    {cat["nombre"]}
                                </a>
                            </li>
                        ))}
                        
                    </ul>

                    <div className="p-6 bg-white text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-700 rounded-lg w-full">
                            
                        <div className="flex flex-col gap-2">
                            <div data-aos="fade-in" class="p-3 flex items-center justify-between w-full text-center rounded-lg dark:bg-gray-700 dark:border-gray-700">
                                <span>Posición</span>
                                <span className="">Nombre</span>
                                <span>Puntos</span>
                            </div>
                            
                            {rankinByCategory.map((info, index) => (
                                <>
                                    <div data-aos="fade-in" class="p-3 flex items-center justify-between w-full text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        <span>{index + 1}</span>
                                        <span class="dark:text-white">{info["nombre"]}</span>
                                        <span>{info["puntuacion"] == null ? 0 : info["puntuacion"]}</span>
                                    </div>
                                </>
                            ))}
                        </div>
                        
                    </div>
                </div>
            </div>
    );
}

export default Ranking;
