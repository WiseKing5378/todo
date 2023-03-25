import './TaskFilter.css';
import PropTypes from 'prop-types';

function TaskFilter(props) {
  const { getActiveFilter, activeFilter } = props;
  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={activeFilter === 'all' ? 'selected' : ''}
          onClick={() => {
            getActiveFilter('all');
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
            getActiveFilter('active');
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
            getActiveFilter('completed');
          }}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}
TaskFilter.defaultProps = {
  getActiveFilter: () => {},
};

TaskFilter.propTypes = {
  getActiveFilter: PropTypes.func,
};
export default TaskFilter;
