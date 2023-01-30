import PropTypes from 'prop-types';
import { Component } from 'react';

import { formatDistanceToNowStrict } from "date-fns";

export default class TodoListItem extends Component {
  render() {
    const { label, id, status, date,
      onDeleted,
      onToggleDone,
      onToggleEdit,
      editInputHandler,
      onEditSubmit } = this.props;

    function onSubmitHandler(e) {
      e.preventDefault();
      onEditSubmit(id)
    }

    const editInput = status === 'editing' ? (
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <input type="text" className="edit" value={label} onChange={(e) => editInputHandler(id, e.target.value)} />
      </form>
    ) : ('');

    return (
      <li className={status}
      key={id}>
      <div className="view">
      <input className='toggle'
      type='checkbox'
      checked={status === 'completed'}
      onChange={() => onToggleDone(id)}
      />
      <label>
      <span
        className="description">
        {label}
      </span>
      <span
      className='created'>created {formatDistanceToNowStrict(date)} ago</span>
      </label>
      <button type="button"
              className="icon icon-edit"
              onClick={() => onToggleEdit(id)}
              >
      </button>
      <button type='button'
              className='icon icon-destroy'
              onClick={() => onDeleted(id)}>
      </button>
      </div>
      { editInput }
      </li>
    )
  }
}

TodoListItem.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date),
};