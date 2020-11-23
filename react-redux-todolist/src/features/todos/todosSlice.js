import { client } from '../../api/client'
import { createSelector } from 'reselect';

// Creamos el estado inicial de la aplicacion (para primera ejecución)
const initialState = []

// Ahora el initial state es directamente el array de todos
export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded': {
      return [...state, action.payload]
    }
    case 'todos/todoToggled': {
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo
        }
        // Hemos encontrado el todo que tiene que cambiar
        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    }
    case 'todos/colorSelected': {
      const { color, todoId } = action.payload
      return state.map((todo) => {
        if (todo.id !== todoId) {
          return todo
        }
        return {
          ...todo,
          color,
        }
      })
    }
    case 'todos/todoDeleted': {
      return state.filter((todo) => todo.id !== action.payload)
    }
    case 'todos/allCompleted': {
      return state.map((todo) => {
        return { ...todo, completed: true } // Ponemos todos a true
      })
    }
    case 'todos/completedCleared': {
      return state.filter((todo) => !todo.completed)
    }
    case 'todos/todosLoaded': {
        return action.payload; // Cambiamos todo el estado actual por el que viene en el payload.
    }
    default:
      return state
  }
}

// Creamos action creator para poder reutilizar y encapsular las acciones
export const todosLoaded = todos => {
  return {
    type: "todos/todosLoaded",
    payload: todos
  }
}

export const todoAdded = todo => {
  return {
    type: "todos/todoAdded",
    payload: todo
  }
}

// Implementamos una thunk function que nos permitira hacer logica async en el middleware
export async function fetchTodos(dispatch, getState) {
  const response = await client.get('/fakeApi/todos')
  dispatch(todosLoaded(response.todos))
}

// Implementamos una thunk function que nos permite crear un todo utilizando la fake api
export function saveNewTodo(text) {
    return async function saveNewTodoThunk (dispatch, getState){
        const initialTodo = { text };
        const response = await client.post("/fakeApi/todos", {todo: initialTodo});
        dispatch(todoAdded(response.todo));
    }
}

export const selectTodoIds = createSelector(
  state => state.todos,
  todos => todos.map(todo => todo.id)
)

