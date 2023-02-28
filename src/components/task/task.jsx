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
    };
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

  render() {
    const { editing } = this.state;
    const { label, completed, onDeleted, onToggleDone, createdDate, id } = this.props;

    let liClass = '';

    if (completed) liClass = 'completed';

    if (editing) liClass = 'editing';

    return (
      <li className={liClass}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleDone} id={id} />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor={id}>
            <span className="description">{label}</span>
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
