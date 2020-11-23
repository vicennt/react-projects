import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { client } from '../../api/client'
import { StatusFilters } from '../filters/filtersSlice'

const initialState = {
  status: 'idle',
  entities: {},
}

/*
  createAsyncThunk nos permite crear thunks más rápido
  argumentos:
    - string que se utiliza como prefijo en el action type 
    - un payload creator q es una callback funtion que devuelve una promesa.
*/

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await client.get('/fakeApi/todos');
  return response.todos;
}) // Se generan 3 action creators (../pending, ../fulfilled y ../rejected) -> extraReducers

export const saveNewTodo = createAsyncThunk('todos/saveNewTodo', async (text) => {
  const initialTodo = { text };
  const response = await client.post('/fakeApi/todos', {todo: initialTodo});
  return response.todo;
})

/*
  createSlice() nos simplifica la creación de reducers
    - Podemos escribir lo casos com funciones en lugar de switch/case
    - Podemos escribir código mutable (tenemos la librería Immer por debajo)
    - Todos los action creators se generar automáticamente
    - createSlice automaticamente devuelve el estado si no hay ningun action a realizar

    createSlice({name:"", initialState:{}, reducers:{}})

    - El nombre se utiliza como prefijo para los action types autogenerados
    - el initial state es el estado inicial del reducer
    - el reducers es un objeto donde la key un string y el value es el case reducer

*/

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action) {
      const todo = action.payload
      state.entities[todo.id] = todo
    },
    todoToggled(state, action) {
      const todoId = action.payload
      const todo = state.entities[todoId]
      todo.completed = !todo.completed
    },
    todoColorSelected: {
      reducer(state, action) {
        const { color, todoId } = action.payload
        state.entities[todoId].color = color
      },
      prepare(todoId, color) {
        // Se ejecuta cuando llamamos a un action creator con estos parametros
        return {
          payload: { todoId, color },
        }
      },
    },
    todoDeleted(state, action) {
      delete state.entities[action.payload]
    },
    allTodosCompleted(state, action) {
      Object.values(state.entities).forEach((todo) => {
        todo.completed = true
      })
    },
    completedTodosCleared(state, action) {
      Object.values(state.entities).forEach((todo) => {
        if (todo.completed) {
          delete state.entities[todo.id]
        }
      })
    },
    todosLoading(state, action) {
      state.status = 'loading'
    },
    todosLoaded(state, action) {
      const newEntities = {}
      action.payload.forEach((todo) => {
        newEntities[todo.id] = todo
      })
      state.entities = newEntities
      state.status = 'idle'
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
       state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        const newEntities = {};
        action.payload.forEach(todo => {
          newEntities[todo.id] = todo;
        })
        state.entities = newEntities;
        state.status = "idle";
      })
      .addCase(saveNewTodo.fulfilled, (state, action) => {
        const todo = action.payload;
        state.entities[todo.id] = todo;
      })
  }
})

export const {
  allTodosCompleted,
  completedTodosCleared,
  todoAdded,
  todoColorSelected,
  todoDeleted,
  todoToggled,
  todosLoaded,
  todosLoading,
} = todosSlice.actions

export default todosSlice.reducer




const selectTodoEntities = (state) => state.todos.entities

export const selectTodos = createSelector(selectTodoEntities, (entities) =>
  Object.values(entities)
)

export const selectTodoById = (state, todoId) => {
  return selectTodoEntities(state)[todoId]
}

export const selectTodoIds = createSelector(
  // First, pass one or more "input selector" functions:
  selectTodos,
  // Then, an "output selector" that receives all the input results as arguments
  // and returns a final result value
  (todos) => todos.map((todo) => todo.id)
)

export const selectFilteredTodos = createSelector(
  // First input selector: all todos
  selectTodos,
  // Second input selector: all filter values
  (state) => state.filters,
  // Output selector: receives both values
  (todos, filters) => {
    const { status, colors } = filters
    const showAllCompletions = status === StatusFilters.All
    if (showAllCompletions && colors.length === 0) {
      return todos
    }

    const completedStatus = status === StatusFilters.Completed
    // Return either active or completed todos based on filter
    return todos.filter((todo) => {
      const statusMatches =
        showAllCompletions || todo.completed === completedStatus
      const colorMatches = colors.length === 0 || colors.includes(todo.color)
      return statusMatches && colorMatches
    })
  }
)

export const selectFilteredTodoIds = createSelector(
  // Pass our other memoized selector as an input
  selectFilteredTodos,
  // And derive data in the output selector
  (filteredTodos) => filteredTodos.map((todo) => todo.id)
)
