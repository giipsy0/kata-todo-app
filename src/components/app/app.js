import { Component } from 'react';
import { v4 as uuid } from 'uuid';

import NewTodo from '../new-todo';
import TodoList from '../todo-list';
import Footer from '../footer';

export default class App extends Component {
  state = {
  items: [],
  filter: 'all',
  };

  componentDidMount() {
    this.updateTime();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  createTodoItem(label, time, status = '') {
    return {
      label,
      status,
      date: new Date(),
      id: uuid(),
      time,
      timeStarted: false,
    }
  }

  addItem = (text, min, sec) => {
    const newItem = this.createTodoItem(text, Number(min) * 60 + Number(sec));
    this.setState(({ items }) => {
      const newArr = [
        ...items,
        newItem,
      ];
      return {
        items: newArr,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ items }) => {
      const idx = items.findIndex((el) => el.id === id);
      const newData = [
        ...items.slice(0, idx),
        ...items.slice(idx + 1),
      ];
      return {
        items: newData,
      };
    })
  };

  onToggleDone = (id) => {
    this.setState(({ items }) => ({
      items: items.map((item) => {
        if (id === item.id) {
          const status = item.status === '' ? 'completed' : ''
          return { ...item, status }
        }
        return item;
      }),
    }));
  };

  onToggleEdit = (id) => {
    this.setState(({ items }) => ({
      items: items.map((item) => {
        if (item.status === 'editing') {
          return { ...item, status: '' }
        }
        if (item.id === id) {
          return { ...item, status: 'editing' }
        }
        return item
      }),
    }));
  };

  editInputHandler = (id, value) => {
    this.setState(({ items }) => ({
      items: items.map((item) => {
        if (item.id === id) {
          return { ...item, label: value }
        }
        return item
      }),
    }));
  };

  onEditSubmit = (id) => {
    this.setState(({ items }) => ({
      items: items.map((item) => {
        if (item.id === id) {
          return { ...item, status: '' }
        }
        return item
      }),
    }));
  };

  onFilterChange = (value) => {
    this.setState({
      filter: value,
    });
  };

  onClearCompleted = () => {
    this.setState(({ items }) => {
      const newArr = [...items];
      const completedArr = newArr.filter((el) => el.status !== 'completed');
      return {
        items: completedArr,
      }
    });
  };

  onTimerStart = (id) => {
    this.setState(({ items }) => ({
      items: items.map((item) => {
        if (id === item.id) {
          return { ...item, timeStarted: true }
        }
        return item;
      }),
    }))
  };

  onTimerStop = (id) => {
    this.setState(({ items }) => ({
      items: items.map((item) => {
        if (id === item.id) {
          return { ...item, timeStarted: false }
        }
        return item;
      }),
    }))
  };

  updateTime = () => {
    this.interval = setInterval(() => {
      this.setState(({ items }) => {
        const newArr = items.map((item) => {
          if (item.time === 0 || item.status === 'completed') {
            return item;
          }
          if (item.timeStarted) {
            item.time -= 1;
          }
          return item;
        });
        return {
          items: newArr,
        };
      });
    }, 1000);
  };

  render() {
   const { items, filter } = this.state;

   return (
    <section className='todoapp'>
      <NewTodo
      onItemAdded={this.addItem}/>
    <section className='main'>
      <TodoList
      items={ items }
      onDeleted={ this.deleteItem }
      onToggleDone={ this.onToggleDone }
      onToggleEdit={ this.onToggleEdit }
      editInputHandler={ this.editInputHandler}
      onEditSubmit={ this.onEditSubmit }
      filter={filter}
      onTimerStart={ this.onTimerStart }
      onTimerStop={ this.onTimerStop }
      />
      <Footer
      activeItemsLeft={items.filter((item) => item.status !== 'completed').length}
      filter={filter}
      onFilterChange={ this.onFilterChange }
      clearCompleted={ this.onClearCompleted }/>
    </section>
    </section>
  )
  }
}
