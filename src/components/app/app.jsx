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

      pause: true,
    };
  }

  componentDidUpdate() {
    const { todoData, pause } = this.state;
    if (!pause && todoData.filter((i) => i.pause === false && i.taskTime > 0).length > 0) {
      this.timer();
    }

    console.log(todoData);
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

  addItem = (label, taskTime) => {
    this.setState(({ todoData }) => {
      return {
        todoData: [
          ...todoData,
          { label, id: uuid(), completed: false, createdDate: new Date(), taskTime, pause: true },
        ],
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

  getTimerStatus = (pause, id) => {
    // this.setState({ curentId: id, pause });
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((i) => {
          if (i.id === id) i = { ...i, pause };
          return i;
        }),
        pause,
        curentId: id,
      };
    });
  };

  timer = () => {
    const { todoData, pause } = this.state;

    const timerid = setInterval(() => {
      this.setState({
        todoData: todoData.map((i) => {
          if (!pause && i.taskTime > 0) i = { ...i, taskTime: i.taskTime - 1 };
          if (i.taskTime === 0) clearTimeout(timerid);

          return i;
        }),
      });
    }, 1000);
    if (pause) {
      clearInterval(timerid);
    }

    if (todoData.filter((i) => i.taskTime === 0).length > 0) {
      this.setState({
        todoData: todoData.map((i) => {
          if (i.taskTime === 0) i = { ...i, pause: true };

          return i;
        }),
      });
    }
  };

  render() {
    const { todoData, activeFilter } = this.state;

    let viewItems = [...todoData];
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
            getTimerStatus={this.getTimerStatus}
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
