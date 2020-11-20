import { combineReducers } from 'redux';

import todosReducer from './features/todos/todosSlice';
import filtersReducer from './features/filters/filtersSlice';

const rootReducer = combineReducers({
    todos: todosReducer, // array con los todos
    filters: filtersReducer // objecto con status y colors
})

export default rootReducer;