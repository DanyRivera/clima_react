import React, { Fragment, useState, useEffect } from 'react';
import Clima from './components/Clima';
import Formulario from './components/Formulario';
import Header from './components/Header';
import Error from './components/Error';

function App() {

  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({})
  const [error, setError] = useState(false);

  const { ciudad, pais } = busqueda;

  useEffect(() => {

    const consultarApi = async () => {

      if (consultar) {

        try {
          ////Estructura API/////
          //api.openweathermap.org/data/2.5/weather?q={city name},{country}&appid={API key}

          const key = 'cd23b2590276c55c16170cc8c2563f77';
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${key}`;
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();

          setResultado(resultado)
          setConsultar(false);

          //Detecta si hay resultados en la búsqueda
          if (resultado.cod === "404") {
            setError(true);
          } else {
            setError(false);
          }


        } catch (error) {

          console.log(error)

        }

      }
    }

    consultarApi();

      // eslint-disable-next-line
  }, [consultar]);

  let compoenente;
  if (error) {
    compoenente = <Error mensaje="No hay resultados" />
  } else {
    compoenente = <Clima resultado={resultado} />
  }

  return (
    <Fragment>

      <Header
        titulo="Clima React App"
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">

            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
            </div>

            <div className="col m6 s12">
              {compoenente}
            </div>

          </div>
        </div>
      </div>

    </Fragment>
  );
}

export default App;
