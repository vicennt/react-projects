// Creamos el estado inicial de la aplicacion (para primera ejecución)
const initialState = {
    todos: [
        { id: 0, text: "Learn react", completed: true},
        { id: 1, text: "Learn redux", completed: false, color: "purple"},
        { id: 2, text: "Build something fun!", completed: false, color: "blue"}
    ],
    filters: {
        status: "All",
        colors: []
    }
}

const nextTodoId = (todos) => {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1;
}

// ES6 nos permite assignar un defalt value a los argumentos, assignamos initialState al state.
// dentro de un reducer no esta permitido mutar el estado
export default function appReducer(state = initialState, action) {
    // Aquí seleccionamos la acción que queremos ejecutar
    switch (action.type) {
        case 'todos/todoAdded':{
            return {
                ...state, // hacemos copia del estado (inmutabilidad)
                todos: [
                    ...state.todos,
                    {
                        id: nextTodoId(state.todos),
                        text: action.payload, // Aquí tenemos el texto del todo,
                        completed: false
                    }
                ]
            }
        }
        case 'todos/todoToggled':{
            return {
                ...state,
                // Tenemos que hacer una copia de todos los todos
                todos: state.todos.map(todo =>{
                    if(todo.id !== action.payload){
                        return todo;
                    }
                    // Hemos encontrado el todo que tiene que cambiar
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                })
            }
        }
        case 'filters/statusFilterChanged': {
            return {
                ...state,
                filters: {
                    ...state.filters, // copiamos otros filtros
                    status: action.payload
                }
            }
        }
        default:
            // Si el reducer no reconoce ningúna de las acciones (no case) devolvemos el estado sin modificar
            return state;
    }
}