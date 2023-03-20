/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/static-property-placement */
import { Component } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './task.css';

export default class Task extends Component {
  static defaultProps = {
    completed: false,
    id: 1000,
    label: '',
    createdDate: new Date(),
    onToggleDone: () => {},
    onEdit: () => {},
    onDeleted: () => {},
  };

  static propTypes = {
    completed: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.string,
    createdDate: PropTypes.instanceOf(Date),
    onToggleDone: PropTypes.func,
    onEdit: PropTypes.func,
    onDeleted: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      editLabel: '',
      pause: false,
      timerId: null,
      tasktime: 0,
    };
  }

  componentDidMount() {
    this.setState({ tasktime: this.props.taskTime });
    const timer = setInterval(() => {
      this.setState(({ tasktime, pause }) => {
        if (!pause && tasktime > 0) {
          return { timerId: timer, tasktime: tasktime - 1 };
        }
        return { timerId: timer };
      });
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    const { pause, timerId } = this.state;
    if (pause && !prevState.pause) {
      clearInterval(timerId);
    }
    if (prevState.pause && !pause) {
      clearInterval(timerId);

      const timer = setInterval(() => {
        this.setState(({ tasktime, pause: prevpause }) => {
          if (!prevpause && tasktime > 0) {
            return { timerId: timer, tasktime: tasktime - 1 };
          }
          return { timerId: timer };
        });
      }, 1000);
    }
  }

  componentWillUnmount() {
    const { timerId } = this.state;
    clearInterval(timerId);
  }

  onPenClick = () => {
    this.setState({
      editing: true,
    });
  };

  onFormKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.setState({
        editing: false,
      });
    }
  };

  onLabelChange = (e) => {
    this.setState(() => {
      return { editLabel: e.target.value };
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { editLabel } = this.state;
    const { onEdit, id } = this.props;

    onEdit(editLabel, id);
  };

  onTimerClick = () => {
    this.setState(({ pause }) => {
      return { pause: !pause };
    });
  };

  render() {
    const { editing, pause, tasktime } = this.state;
    const { label, completed, onDeleted, onToggleDone, createdDate, id } = this.props;

    let liClass = '';

    const minute = Math.trunc(tasktime / 60);
    const second = tasktime - minute * 60;

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
              <button
                type="button"
                aria-label="task"
                className={timerbtn}
                onClick={() => {
                  this.onTimerClick();
                }}
              />
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
            onClick={this.onPenClick}
            onKeyDown={this.onPenClick}
          />
          <button type="button" aria-label="task" className="icon icon-destroy" onClick={onDeleted} />
        </div>

        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="edit"
            defaultValue={label}
            onChange={this.onLabelChange}
            onKeyDown={this.onFormKeyPress}
          />
        </form>
      </li>
    );
  }
}
