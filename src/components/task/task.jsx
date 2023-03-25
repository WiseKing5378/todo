/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/static-property-placement */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './task.css';

function Task(props) {
  const { taskTime, onEdit, id, label, completed, onDeleted, onToggleDone, createdDate } = props;
  const [editing, setEditing] = useState(false);
  const [editLabel, setEditLabel] = useState('');
  const [pause, setPause] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [tasktime, setTasktime] = useState(0);

  useEffect(() => {
    setTasktime(taskTime);
    const timer = setInterval(() => {
      if (tasktime > 0) {
        setTimerId(timer);
        setTasktime(tasktime - 1);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!pause && tasktime > 0) {
        setTimerId(timer);
        setTasktime(tasktime - 1);
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [pause, timerId, tasktime]);

  const onPenClick = () => {
    setEditing(true);
  };

  const onLabelChange = (e) => {
    setEditLabel(e.target.value);
  };

  const onSubmit = (e) => {
    setEditing(false);
    e.preventDefault();
    onEdit(editLabel, id);
  };

  const onTimerClick = () => {
    setPause(!pause);
  };

  const minute = Math.trunc(tasktime / 60);
  const second = tasktime - minute * 60;
  let liClass = '';
  if (completed) liClass = 'completed';
  if (editing) liClass = 'editing';

  const timerbtn = pause ? 'start' : 'pause';

  return (
    <li className={liClass}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleDone} id={id} defaultChecked={completed} />
        <label htmlFor={id}>
          <span className="description">{label}</span>
          <div className="time-manage-btn">
            <button type="button" aria-label="task" className={timerbtn} onClick={onTimerClick} />
            <span className="created">{`${minute >= 10 ? minute : `0${minute}`}:${
              second >= 10 ? second : `0${second}`
            }`}</span>
          </div>
          <span className="created">created {formatDistanceToNow(createdDate, { includeSeconds: true })} ago</span>
        </label>
        <button
          type="button"
          aria-label="task"
          className="icon icon-edit"
          onClick={onPenClick}
          onKeyDown={onPenClick}
        />
        <button type="button" aria-label="task" className="icon icon-destroy" onClick={onDeleted} />
      </div>

      <form onSubmit={onSubmit}>
        <input type="text" className="edit" defaultValue={label} onChange={onLabelChange} />
      </form>
    </li>
  );
}

Task.defaultProps = {
  completed: false,
  id: 1000,
  label: '',
  createdDate: new Date(),
  onToggleDone: () => {},
  onEdit: () => {},
  onDeleted: () => {},
};

Task.propTypes = {
  completed: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  createdDate: PropTypes.instanceOf(Date),
  onToggleDone: PropTypes.func,
  onEdit: PropTypes.func,
  onDeleted: PropTypes.func,
};

export default Task;
