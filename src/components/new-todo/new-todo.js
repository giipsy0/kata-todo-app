import { useState } from 'react'
import PropTypes from 'prop-types'

export default function NewTodo(props) {
  const { onItemAdded } = props
  const [label, setLabel] = useState('')
  const [time, setTime] = useState({ min: '', sec: '' })

  const onLabelChange = (e) => {
    const { value } = e.target
    setLabel(value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const sec = Math.abs(Number(time.min) * 60) + Math.abs(Number(time.sec))
    onItemAdded(label, sec)
    setLabel('')
    setTime({ min: '', sec: '' })
  }

  return (
    <header className="header">
            <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          type="text"
          className="new-todo"
          name="description"
          placeholder="What need to be done?"
          onChange={onLabelChange}
          value={label}
          required
          autoFocus
        />
        <input
          type="text"
          className="new-todo-form__timer"
          name="minutes"
          value={time.min}
          placeholder="Min"
          onChange={(e) => setTime((prev) => ({ ...prev, min: e.target.value }))}
          required
        />
        <input
          type="text"
          className="new-todo-form__timer"
          name="seconds"
          value={time.sec}
          placeholder="Sec"
          onChange={(e) => setTime((prev) => ({ ...prev, sec: e.target.value }))}
          required
        />
        <button type="submit" aria-label="submission" className="new-todo-form-btn" />
      </form>
    </header>
  )
}

NewTodo.defaultProps = {
  onItemAdded: () => {},
}

NewTodo.propTypes = {
  onItemAdded: PropTypes.func,
}