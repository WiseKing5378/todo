/* eslint-disable react/static-property-placement */
import { Component } from 'react';
import './TaskFilter.css';
import PropTypes from 'prop-types';

export default class TaskFilter extends Component {
  static defaultProps = {
    setActiveFilter: () => {},
  };

  static propTypes = {
    setActiveFilter: PropTypes.func,
  };

  render() {
    const { setActiveFilter, activeFilter } = this.props;
    return (
      <ul className="filters">
        <li>
          <button
            type="button"
            className={activeFilter === 'all' ? 'selected' : ''}
            onClick={() => {
              setActiveFilter('all');
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={activeFilter === 'active' ? 'selected' : ''}
            onClick={() => {
              setActiveFilter('active');
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={activeFilter === 'completed' ? 'selected' : ''}
            onClick={() => {
              setActiveFilter('completed');
            }}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
