import { Component } from 'react';

import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import TaskList from '../task-list';

import './app.css';

export default class App extends Component {
  // eslint-disable-next-line react/no-unused-class-component-methods
  maxId = 0;

  constructor(props) {
    super(props);
    this.state = {
      todoData: [],

      allView: true,
      completedView: false,
      activeView: false,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: todoData.filter((i) => i.id !== id) };
    });
  };

  // eslint-disable-next-line class-methods-use-this
  clearAllCompleted = () => {
    const { todoData } = this.state;
    const removableItems = todoData.filter((i) => i.completed === true);
    removableItems.forEach((i) => {
      this.deleteItem(i.id);
    });
  };

  // eslint-disable-next-line class-methods-use-this
  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((i) => i.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };
      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return { todoData: newArr };
    });
  };

  // eslint-disable-next-line class-methods-use-this
  addItem = (label) => {
    this.setState(({ todoData }) => {
      // eslint-disable-next-line react/no-unused-class-component-methods
      const newData = [...todoData, { label, id: (this.maxId += 1), completed: false, createdDate: new Date() }];
      return { todoData: newData };
    });
  };

  // eslint-disable-next-line react/no-unused-class-component-methods, class-methods-use-this
  editItem = (newlabel, id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((i) => i.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, label: newlabel };
      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return { todoData: newArr };
    });
  };

  viewState = (name) => {
    if (name === 'completed') this.setState({ completedView: true, activeView: false, allView: false });
    if (name === 'active') this.setState({ completedView: false, activeView: true, allView: false });
    if (name === 'all') this.setState({ completedView: false, activeView: false, allView: true });
  };

  render() {
    const { todoData, completedView, activeView, allView } = this.state;

    let viewItems = todoData;
    if (completedView) viewItems = todoData.filter((i) => i.completed);
    if (activeView) viewItems = todoData.filter((i) => !i.completed);
    if (allView) viewItems = todoData;

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
        <Footer viewState={this.viewState} activeItems={activeItems} clearAllCompleted={this.clearAllCompleted} />
      </section>
    );
  }
}
