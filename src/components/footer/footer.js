/* eslint-disable react/static-property-placement */
import { Component } from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../task-filter';

import './footer.css';

export default class Footer extends Component {
  static defaultProps = {
    activeItems: 0,
    clearAllCompleted: () => {},
    viewState: () => {},
  };

  static propTypes = {
    activeItems: PropTypes.number,
    clearAllCompleted: PropTypes.func,
    viewState: PropTypes.func,
  };

  render() {
    const { activeItems, clearAllCompleted, viewState } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{activeItems} items left</span>
        <TasksFilter viewState={viewState} />
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
