/* eslint-disable indent */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

function NewTaskForm(props) {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const { taskLabel } = props;

  const onSubmit = (event) => {
    event.preventDefault();
    if (label.replace(/\s+/g, '') && min * 60 + +sec > 0) {
      taskLabel(label, min * 60 + +sec);
      setLabel('');
      setMin('');
      setSec('');
    }
  };

  const onChange = (event) => {
    // eslint-disable-next-line default-case
    switch (event.target.name) {
      case 'min':
        setMin(event.target.value);
        break;
      case 'sec':
        setSec(event.target.value);
        break;
      case 'task':
        setLabel(event.target.value);
    }
  };

  return (
    <form className="new-task-form" onSubmit={onSubmit}>
      <input className="new-todo" name="task" value={label} placeholder="What needs to be done?" onChange={onChange} />
      <input type="number" value={min} min="0" name="min" className="new-todo" placeholder="Min" onChange={onChange} />
      <input
        type="number"
        value={sec}
        min="0"
        max="59"
        name="sec"
        className="new-todo"
        placeholder="Sec"
        onChange={onChange}
      />
      <button type="submit" />
    </form>
  );
}

NewTaskForm.defaultProps = {
  taskLabel: () => {},
};

NewTaskForm.propTypes = {
  taskLabel: PropTypes.func,
};
export default NewTaskForm;
