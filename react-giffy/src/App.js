import React, {useState, useEffect} from 'react';
import './App.css';
import getGifs from './services/getGifs';
import Gif from './components/Gif';


function App() {
  const [gifs, setGifs] = useState([])

  // Se ejecuta cada vez que se renderiza el componente
  useEffect(function () {
    getGifs({ keyword: 'rick'}).then(gifs => setGifs(gifs))
  }, []) // Segundo parametro son las variables q si cambian tienen q ejecutar el efecto
  
   
  return (
    <div className="App">
      <section className="App-content">
        {
          gifs.map(singleGif => <Gif key={singleGif.id} title={singleGif.title} id={singleGif.id} url={singleGif.url}/>)
        }
        <button onClick={() => setGifs([])}>Cambiar gifs</button>
      </section>
    </div>
  );
}

export default App;
