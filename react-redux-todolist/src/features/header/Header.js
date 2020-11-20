import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


const Header = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleChange = e => setText(e.target.value);
  const handleKeyDown = e => {
    const trimmedText = e.target.value.trim() //quitamos espacios en blanco
    if (e.which === 13 && trimmedText) { // e.which contiene el codigo numerico de una tecla en particular
      dispatch({type: 'todos/todoAdded', payload: trimmedText}); // Ejecutamos la action de añadir un todo
      setText("");
    }
  }

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus={true}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // Si la tecla pulsada es enter se lanzara la action a la store
      />
    </header>
  )
}

export default Header;
