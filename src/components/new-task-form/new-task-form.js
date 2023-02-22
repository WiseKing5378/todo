/* eslint-disable react/static-property-placement */
import { Component } from 'react';
import './new-task-form.css';
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
    };
  }

  // eslint-disable-next-line class-methods-use-this
  onSubmit = (event) => {
    event.preventDefault();
    const { taskLabel } = this.props;
    const { label } = this.state;
    if (label) taskLabel(label);
    this.setState({ label: '' });
  };

  // eslint-disable-next-line class-methods-use-this
  OnLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  render() {
    const { label } = this.state;
    return (
      <form className="new-task-form" onSubmit={this.onSubmit}>
        <input className="new-todo" value={label} placeholder="What needs to be done?" onChange={this.OnLabelChange} />
      </form>
    );
  }
}
