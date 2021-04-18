import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Frase from "./Components/Frase";
import { useState, useEffect } from "react";
import Spinner from "./Components/Spinner";

function App() {

  const [personaje, setPersonaje] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(()=>{
    consultarAPI();
  }, []);

  const consultarAPI = async() =>{		 
    setCargando(true);
    const respuesta = await fetch("https://thesimpsonsquoteapi.glitch.me/quotes");
    const resultado = await respuesta.json();
    console.log(resultado);
    //GUARDAR LOS DATOS EN EL STATE
    setTimeout(()=>{
      setPersonaje(resultado[0]);
      setCargando(false);

    }, 3000);
  }

  const mostrarComponente = (cargando === true ) ? (<Spinner></Spinner>) : (<Frase personaje={personaje}></Frase>)

  return (
      <section className="container my-5 d-flex flex-column align-items-center">
        <img
          src={process.env.PUBLIC_URL + "logosimp.png"}
          alt="Logo Simpsons"
          className="w-75 my-4"
        />
        <Button variant="warning" onClick={()=>consultarAPI()} className="mb-3">Obtener Frase</Button>
        {mostrarComponente}
      </section>
  );
}

export default App;
