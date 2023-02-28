/* eslint-disable no-param-reassign */
import { Component } from 'react';
import uuid from 'react-uuid';

import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import TaskList from '../task-list';

import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoData: [],
      activeFilter: 'all',
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: todoData.filter((i) => i.id !== id) };
    });
  };

  clearAllCompleted = () => {
    this.setState(({ todoData }) => {
      return { todoData: todoData.filter((i) => !i.completed) };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((i) => {
          if (i.id === id) i = { ...i, completed: !i.completed };
          return i;
        }),
      };
    });
  };

  addItem = (label) => {
    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, { label, id: uuid(), completed: false, createdDate: new Date() }],
      };
    });
  };

  editItem = (newlabel, id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((i) => {
          if (i.id === id) i = { ...i, label: newlabel };
          return i;
        }),
      };
    });
  };

  setActiveFilter = (name) => {
    this.setState({ activeFilter: name });
  };

  render() {
    const { todoData, activeFilter } = this.state;

    let viewItems = todoData;
    if (activeFilter === 'completed') viewItems = todoData.filter((i) => i.completed);
    if (activeFilter === 'active') viewItems = todoData.filter((i) => !i.completed);
    if (activeFilter === 'all') viewItems = todoData;

    const activeItems = todoData.filter((i) => !i.completed).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm taskLabel={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={viewItems}
            onEdit={this.editItem}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
          />
        </section>
        <Footer
          setActiveFilter={this.setActiveFilter}
          activeFilter={activeFilter}
          activeItems={activeItems}
          clearAllCompleted={this.clearAllCompleted}
        />
      </section>
    );
  }
}
