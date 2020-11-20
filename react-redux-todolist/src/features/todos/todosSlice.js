// Creamos el estado inicial de la aplicacion (para primera ejecución)
const initialState = [
    { id: 0, text: "Learn react", completed: true},
    { id: 1, text: "Learn redux", completed: false, color: "purple"},
    { id: 2, text: "Build something fun!", completed: false, color: "blue"}
]

const nextTodoId = (todos) => {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1;
}

// Ahora el initial state es directamente el array de todos
export default function todosReducer(state = initialState, action) {
    switch(action.type){
        case 'todos/todoAdded': {
            return [
                ...state, // Copiamos todos los todos
                {
                    id: nextTodoId(state),
                    text: action.payload, // Aquí tenemos el texto del todo,
                    completed: false
                }
            ]
        }
        case 'todos/todoToggled':{
            return state.todos.map(todo =>{
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
        case 'todos/colorSelected': {
            const { color, todoId } = action.payload;
            return state.map ((todo) => {
                if(todo.id !== todoId) {
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
        default: return state;
    }
}
