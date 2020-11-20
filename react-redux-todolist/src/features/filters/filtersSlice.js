
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
        case 'filters/colorFilterChanged': {
            let { color, changeType } = action.payload;
            const { colors } = state;
      
            switch (changeType) {
                case 'added': {
                    if (colors.includes(color)) {
                        return state;
                    }
                    return {
                        ...state,
                        colors: state.colors.concat(color) // Concat crear una copia del array
                    }
                }
              case 'removed': {
                return {
                  ...state,
                  colors: state.colors.filter(
                    (existingColor) => existingColor !== color // Devuelve todos menos el color a eliminar
                  ),
                }
              }
              default:
                return state
            }
          }
        default:
            return state;
    }
}