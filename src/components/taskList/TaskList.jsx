import PropTypes from 'prop-types';

import Task from '../task';

import './TaskList.css';

function TaskList(props) {
  const { todos, onDeleted, onToggleDone, onEdit } = props;
  const elem = todos.map((i) => {
    const { label, id, completed, createdDate, taskTime } = i;
    return (
      <Task
        createdDate={createdDate}
        key={id}
        id={id}
        label={label}
        completed={completed}
        taskTime={taskTime}
        onEdit={(...args) => onEdit(...args)}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
      />
    );
  });

  return <ul className="todo-list">{elem}</ul>;
}

TaskList.defaultProps = {
  onToggleDone: () => {},
  onDeleted: () => {},
  onEdit: () => {},
};

TaskList.propTypes = {
  onToggleDone: PropTypes.func,
  onDeleted: PropTypes.func,
  onEdit: PropTypes.func,
};

export default TaskList;
