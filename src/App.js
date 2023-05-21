import './App.css';
import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';
import './components.css';
import culiacan from './images/cul.svg'
import guasave from './images/gsv.svg'

import { Button } from 'react-bootstrap';

const socket = io('http://localhost:3000');

function App() {
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [nuevoMensaje2, setNuevoMensaje2] = useState('');
  const [score1, setScore1] = useState("0");
  const [score2, setScore2] = useState("0");

  useEffect(() => {
    socket.on('1', setScore1);
    socket.on('2', setScore2);

    return () => {
      socket.off('connect');
      socket.off('chat_message');
    }

  }, []);

  const visitaDecrement = () => {
    socket.emit('1', nuevoMensaje);
  }

  const localDecrement = () => {
    socket.emit('2', nuevoMensaje2);
  }
  return (
    <>

    <div className="container">
    <div className='visita'>

          <div className="App local-decrement">
          <div class="square">
            <img className="imglocal" src={culiacan} alt="visita"/>
          </div>
         
           
            <input
              type="number"size="2"
              onChange={ e => setNuevoMensaje(e.target.value)}
            />
            <button  className="btn" onClick={visitaDecrement}>visita</button>
            </div>       

          </div> 
              <div className="marcador">
                  <h3> {score1}   </h3>            
              <h3>-</h3>
                <h3>  {score2}  </h3>
            </div>
      <div className='local'>

          <div className="App local-decrement">
          <div class="square">
          
            <img className="imglocal" src={guasave} alt="local" />
          </div>
        
          
          <input
            type="number"  size="2"
            onChange={e => setNuevoMensaje2(e.target.value)}
          />
          <button className="btn" onClick={localDecrement}>local</button>
        </div>       
      
      </div>

      
   </div>
  </>

  );
}

export default App;