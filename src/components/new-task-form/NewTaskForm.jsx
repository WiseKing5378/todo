/* eslint-disable indent */
/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/static-property-placement */
import { Component } from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  static defaultProps = {
    taskLabel: () => {},
  };

  static propTypes = {
    taskLabel: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      label: '',
      min: '',
      sec: '',
    };
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { taskLabel } = this.props;
    const { label, min, sec } = this.state;
    if (label.replace(/\s+/g, '') && min * 60 + +sec > 0) {
      taskLabel(label, min * 60 + +sec);
      this.setState({ label: '', min: '', sec: '' });
    }
  };

  onChange = (event) => {
    // eslint-disable-next-line default-case
    switch (event.target.name) {
      case 'min':
        this.setState({
          min: event.target.value,
        });
        break;
      case 'sec':
        this.setState({
          sec: event.target.value,
        });
        break;
      case 'task':
        this.setState({
          label: event.target.value,
        });
    }
  };

  render() {
    const { label, min, sec } = this.state;

    return (
      <form className="new-task-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          name="task"
          value={label}
          placeholder="What needs to be done?"
          onChange={this.onChange}
        />
        <input
          type="number"
          value={min}
          min="0"
          name="min"
          className="new-todo"
          placeholder="Min"
          onChange={this.onChange}
        />
        <input
          type="number"
          value={sec}
          min="0"
          name="sec"
          className="new-todo"
          placeholder="Sec"
          onChange={this.onChange}
        />
        <button type="submit" />
      </form>
    );
  }
}
