import { PropTypes } from 'prop-types'

import TodoListItem from '../TodoListItem'

export default function TodoList(props) {
  const { items, onDeleted, onToggleDone, onToggleEdit,
    editInputHandler, onEditSubmit, filter, updateTime } = props

  const filterItems = (items, filter) => {
    if (filter === 'active') {
      return items.filter((item) => item.status === '')
    }
    if (filter === 'completed') {
      return items.filter((item) => item.status === 'completed')
    }
    return items
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
      updateTime={(newTime) => updateTime(item.id, newTime)}
      />
  ))

  return <ul className='todo-list'>{ elements }</ul>
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
}
