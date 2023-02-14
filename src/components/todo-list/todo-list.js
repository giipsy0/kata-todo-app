import { PropTypes } from 'prop-types';
import { Component } from 'react';

import TodoListItem from '../todo-list-item';

export default class TodoList extends Component {
  render() {
    const { items, onDeleted, onToggleDone, onToggleEdit,
            editInputHandler, onEditSubmit, filter, onTimerStart, onTimerStop } = this.props;

    function filterItems(items, filter) {
      if (filter === 'active') {
        return items.filter((item) => item.status === '');
      }
      if (filter === 'completed') {
        return items.filter((item) => item.status === 'completed');
      }
      return items;
    }

    const elements = filterItems(items, filter).map((item) => (
      <TodoListItem
      {...item}
      key={item.id}
      onDeleted={onDeleted}
      onToggleDone={onToggleDone}
      onToggleEdit={onToggleEdit}
      editInputHandler={editInputHandler}
      onEditSubmit={onEditSubmit}
      onTimerStart={() => onTimerStart(item.id)}
      onTimerStop={() => onTimerStop(item.id)}
      />
    ));

    return (
      <ul className='todo-list'>
        { elements }
      </ul>
    );
  }
}

TodoList.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  onToggleEdit: () => {},
  editInputHandler: () => {},
  onEditSubmit: () => {},
}

TodoList.propTypes = {
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onToggleEdit: PropTypes.func,
  editInputHandler: PropTypes.func,
  onEditSubmit: PropTypes.func,
};
