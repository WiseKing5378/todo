/* eslint-disable react/static-property-placement */
import { Component } from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../task-filter';

import './footer.css';

export default class Footer extends Component {
  static defaultProps = {
    activeItems: 0,
    clearAllCompleted: () => {},
    setActiveFilter: () => {},
  };

  static propTypes = {
    activeItems: PropTypes.number,
    clearAllCompleted: PropTypes.func,
    setActiveFilter: PropTypes.func,
  };

  render() {
    const { activeItems, clearAllCompleted, setActiveFilter, activeFilter } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{activeItems} items left</span>
        <TasksFilter setActiveFilter={setActiveFilter} activeFilter={activeFilter} />
        <button
          type="button"
          className="clear-completed"
          onClick={() => {
            clearAllCompleted();
          }}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}
