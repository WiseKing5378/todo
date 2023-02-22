/* eslint-disable react/static-property-placement */
import { Component } from 'react';
import './task-filter.css';
import PropTypes from 'prop-types';

export default class TaskFilter extends Component {
  static defaultProps = {
    viewState: () => {},
  };

  static propTypes = {
    viewState: PropTypes.func,
  };

  render() {
    const { viewState } = this.props;
    return (
      <ul className="filters">
        <li>
          <button
            type="button"
            className="selected"
            onClick={() => {
              viewState('all');
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              viewState('active');
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              viewState('completed');
            }}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
