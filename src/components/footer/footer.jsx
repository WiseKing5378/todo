import PropTypes from 'prop-types';

import TasksFilter from '../taskFilter';

import './footer.css';

function Footer(props) {
  const { activeItems, clearAllCompleted, getActiveFilter, activeFilter } = props;
  return (
    <div className="footer">
      <span className="todo-count">{activeItems} items left</span>
      <TasksFilter getActiveFilter={getActiveFilter} activeFilter={activeFilter} />
      <button type="button" className="clear-completed" onClick={clearAllCompleted}>
        Clear completed
      </button>
    </div>
  );
}

Footer.defaultProps = {
  activeItems: 0,
  clearAllCompleted: () => {},
  getActiveFilter: () => {},
};

Footer.propTypes = {
  activeItems: PropTypes.number,
  clearAllCompleted: PropTypes.func,
  getActiveFilter: PropTypes.func,
};

export default Footer;
