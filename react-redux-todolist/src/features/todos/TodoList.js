import React from 'react';
import { useSelector } from 'react-redux';
import TodoListItem from './TodoListItem'

// Funcion selectora (selecciona el array de todos dentro del estado)
const selectTodos = state => state.todos;

const TodoList = () => {
  const todos = useSelector(selectTodos) // useSelector se subscribe automaticamente a la store
  // Cada vez que una action sea disparada se ejecuta la funcion selectora automaticamente
  const renderedListItems = todos.map((todo) => {
    return <TodoListItem key={todo.id} todo={todo} />
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
