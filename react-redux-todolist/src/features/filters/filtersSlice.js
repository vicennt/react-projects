
const initialState = {
    status: "All",
    colors: []
}

// ES6 nos permite assignar un defalt value a los argumentos, assignamos initialState al state.
// dentro de un reducer no esta permitido mutar el estado
export default function filterReducer(state = initialState, action) {
    // Aquí seleccionamos la acción que queremos ejecutar
    switch (action.type) {
        case 'filters/statusFilterChanged': {
            return {
                ...state,
                status: action.payload 
            }
        }
        default:
            return state;
    }
}