import { useState } from 'react'
import { v4 as uuid } from 'uuid'

import NewTodo from '../NewTodo'
import TodoList from '../TodoList'
import Footer from '../Footer'

export default function App() {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('all')

  const createTodoItem = (label, timer, status = '') => ({
      label,
      status,
      date: new Date(),
      id: uuid(),
      timer,
    })

  const addItem = (text, sec) => {
    const time = Number.isNaN(sec) ? 0 : Number(sec)
    const newItem = createTodoItem(text, time)
    const newArr = [...items, newItem]
    setItems(newArr)
  }

  const deleteItem = (id) => {
    const newArr = items.filter((item) => item.id !== id)
    setItems(newArr)
  }

  const onToggleDone = (id) => {
    const newArr = items.map((item) => {
      if (id === item.id) {
        item.status = item.status === '' ? 'completed' : ''
      }
      return item
    })
    setItems(newArr)
  }

  const onToggleEdit = (id) => {
    const newArr = items.map((item) => {
      if (item.status === 'editing') {
        item.status = ''
      }
      if (item.id === id) {
        item.status = 'editing'
      }
      return item
    })
    setItems(newArr)
  }

  const editInputHandler = (id, value) => {
    const newArr = items.map((item) => {
      if (item.id === id) {
        item.label = value
      }
      return item
    })
    setItems(newArr)
  }

  const onEditSubmit = (id) => {
    const newArr = items.map((item) => {
      if (item.id === id) {
        item.status = ''
      }
      return item
    })
    setItems(newArr)
  }

  const onFilterChange = (value) => {
    setFilter(value)
  }

  const onClearCompleted = () => {
    const newArr = items.filter(({ status }) => status !== 'completed')
    setItems(newArr)
  }

  const updateTime = (id, newTime) => {
    const newArr = items.map((item) => {
      if (item.id === id) {
        item.timer = newTime
      }
      return item
    })
    setItems(newArr)
  }

  return (
    <section className='todoapp'>
      <NewTodo
      onItemAdded={addItem}/>
    <section className='main'>
      <TodoList
      items={ items }
      onDeleted={ deleteItem }
      onToggleDone={ onToggleDone }
      onToggleEdit={ onToggleEdit }
      editInputHandler={ editInputHandler}
      onEditSubmit={ onEditSubmit }
      updateTime={ updateTime }
      filter={filter}
      />
      <Footer
      items={items}
      filter={filter}
      onFilterChange={ onFilterChange }
      clearCompleted={ onClearCompleted }/>
    </section>
    </section>
  )
}
