/* eslint-disable react/static-property-placement */
import { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../task';

import './TaskList.css';

export default class TaskList extends Component {
  static defaultProps = {
    onToggleDone: () => {},
    onDeleted: () => {},
    onEdit: () => {},
  };

  static propTypes = {
    onToggleDone: PropTypes.func,
    onDeleted: PropTypes.func,
    onEdit: PropTypes.func,
  };

  render() {
    const { todos, onDeleted, onToggleDone, onEdit, getTimerStatus } = this.props;
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
          getTimerStatus={getTimerStatus}
        />
      );
    });

    return <ul className="todo-list">{elem}</ul>;
  }
}
