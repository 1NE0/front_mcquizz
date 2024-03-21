import React, { useEffect, useState } from 'react';
import './home.css';
import { FirstView } from '../../components/firstView';
import { QuestionForm } from '../../components/game';
import Finalizado from '../../components/finalizado';
import { Darkmode } from '../../components/darkmode';

const Home = () => { // Hook para alternar el modo de color

  const [pageActual, setPageActual] = useState("home"); // home - preguntas
  const [preguntas, setPreguntas] = useState([]);
  const [puntos, setPuntos] = useState(0);
  const [darkmode, setDarkmode] = useState(false);

  
  useEffect(() => {
    console.log(pageActual);
  }, [pageActual]);

  useEffect(() => {
    console.log(darkmode);
    document.body.classList.toggle('dark', darkmode);
  }, [darkmode]);

  return (
    <>
    <section className='h-screen bg-indigo-50 dark:bg-gray-800'>
      {pageActual === "home" && <FirstView 
        pageActual={pageActual}
        setPageActual={setPageActual} 
        setPreguntas={setPreguntas}
        preguntas={preguntas}
        puntos={puntos}
        setPuntos={setPuntos}
      />}
      {pageActual === "preguntas" && <QuestionForm 
        preguntas={preguntas}
        setPreguntas={setPreguntas}
        pageActual={pageActual} 
        setPageActual={setPageActual} 
        puntos={puntos}
        setPuntos={setPuntos}
      />}
      {pageActual === "finalizado" && <Finalizado 
        preguntas={preguntas}
        setPreguntas={setPreguntas}
        pageActual={pageActual} 
        setPageActual={setPageActual} 
        puntos={puntos}
        setPuntos={setPuntos}
      />}

      <Darkmode darkmode={darkmode} setDarkmode={setDarkmode}/>
    </section>
    </>
  );
}

export default Home;