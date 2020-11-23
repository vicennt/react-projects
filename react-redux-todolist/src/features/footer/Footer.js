import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import RemainingTodos from './RemainingTodos';
import StatusFilter from './StatusFilter';
import ColorFilters from './ColorsFilter';
import {
  colorFilterChanged,
  statusFilterChanged,
} from '../filters/filtersSlice'
import {
  completedTodosCleared,
  allTodosCompleted,
  selectTodos,
} from '../todos/todosSlice'


const Footer = () => {
  const dispatch = useDispatch()

  const todosRemaining = useSelector((state) => {
    const uncompletedTodos = selectTodos(state).filter(
      (todo) => !todo.completed
    )
    return uncompletedTodos.length
  })

  const { status, colors } = useSelector((state) => state.filters)

  const onMarkCompletedClicked = () => dispatch(allTodosCompleted())
  const onClearCompletedClicked = () => dispatch(completedTodosCleared())

  const onColorChange = (color, changeType) =>
    dispatch(colorFilterChanged(color, changeType))

  const onStatusChange = (status) => dispatch(statusFilterChanged(status))

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button" onClick={onMarkCompletedClicked}>
          Mark All Completed
        </button>
        <button className="button" onClick={onClearCompletedClicked}>
          Clear Completed
        </button>
      </div>

      <RemainingTodos count={todosRemaining} />
      <StatusFilter value={status} onChange={onStatusChange} />
      <ColorFilters value={colors} onChange={onColorChange} />
    </footer>
  )
}

export default Footer
