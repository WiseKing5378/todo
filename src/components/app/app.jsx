/* eslint-disable no-param-reassign */
import { useState } from 'react';
import uuid from 'react-uuid';

import NewTaskForm from '../newTaskForm';
import Footer from '../footer';
import TaskList from '../taskList';

import './app.css';

function App() {
  const [todoData, setTodoData] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  const deleteItem = (id) => {
    setTodoData(todoData.filter((i) => i.id !== id));
  };

  const clearAllCompleted = () => {
    setTodoData(todoData.filter((i) => !i.completed));
  };

  const onToggleDone = (id) => {
    setTodoData(
      todoData.map((i) => {
        if (i.id === id) i = { ...i, completed: !i.completed };
        return i;
      })
    );
  };

  const addItem = (label, taskTime) => {
    setTodoData([...todoData, { label, id: uuid(), completed: false, createdDate: new Date(), taskTime }]);
  };

  const editItem = (newlabel, id) => {
    setTodoData(
      todoData.map((i) => {
        if (i.id === id) i = { ...i, label: newlabel };
        return i;
      })
    );
  };

  const getActiveFilter = (name) => {
    setActiveFilter(name);
  };

  let viewItems = [...todoData];
  if (activeFilter === 'completed') viewItems = todoData.filter((i) => i.completed);
  if (activeFilter === 'active') viewItems = todoData.filter((i) => !i.completed);
  if (activeFilter === 'all') viewItems = todoData;

  const activeItems = todoData.filter((i) => !i.completed).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm taskLabel={addItem} />
      </header>
      <section className="main">
        <TaskList todos={viewItems} onEdit={editItem} onDeleted={deleteItem} onToggleDone={onToggleDone} />
      </section>
      <Footer
        getActiveFilter={getActiveFilter}
        activeFilter={activeFilter}
        activeItems={activeItems}
        clearAllCompleted={clearAllCompleted}
      />
    </section>
  );
}

export default App;
