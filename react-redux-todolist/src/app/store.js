import { configureStore } from '@reduxjs/toolkit';

import todosReducer from '../features/todos/todosSlice';
import filtersReducer from '../features/filters/filtersSlice';

/*condigureStore nos permite:
  - combinar los reducers
  - añade automáticamente el thunk middleware
  - añade automáticamente el setup para el redux devtools extensions 
  - añade un middlware extra para controlar los bugs por inmutabilidad
*/
const store = configureStore({
  reducer: {
    todos: todosReducer,
    filters: filtersReducer
  }
})


export default store;
