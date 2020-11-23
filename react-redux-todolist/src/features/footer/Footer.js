import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import RemainingTodos from './RemainingTodos';
import StatusFilter from './StatusFilter';
import ColorFilters from './ColorsFilter';


const Footer = () => {

  const dispatch = useDispatch()

  const todosRemaining = useSelector(state => {
    const uncompletedTodos = state.todos.filter(todo => !todo.completed);
    return uncompletedTodos.length;
  })

  const { status, colors } = useSelector(state => state.filter);
  const onColorChange = (color, changeType) => console.log('Color change: ', { color, changeType });
  const onStatusChange = (status) => console.log('Status change: ', status);
  const onMarkAllCompletedClicked = () => dispatch({ type : 'todos/allCompleted'});
  const onClearCompletedClicked = () => dispatch({ type: 'todos/completedCleared'});

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button" onClick={onMarkAllCompletedClicked}>Mark All Completed</button>
        <button className="button" onClick={onClearCompletedClicked}>Clear Completed</button>
      </div>

      <RemainingTodos count={todosRemaining} />
      <StatusFilter value={status} onChange={onStatusChange} />
      <ColorFilters value={colors} onChange={onColorChange} />
    </footer>
  )
}

export default Footer
