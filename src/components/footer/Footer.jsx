import PropTypes from 'prop-types'

import Filters from "../Filters"

export default function Footer(props) {
  const { items, filter, onFilterChange, clearCompleted } = props
  const activeItemsLeft = items.filter((item) => item.status !== 'completed').length

  return (
    <footer className="footer">
        <span className="todo-count">{activeItemsLeft} items left</span>
        <Filters
        filter={filter}
        onFilterChange={onFilterChange}/>
        <button className="clear-completed"
        onClick={clearCompleted}>Clear completed</button>
    </footer>
  )
}

Footer.defaultProps = {
  clearCompleted: () => {},
  left: 0,
}

Footer.propTypes = {
  clearCompleted: PropTypes.func,
  left: PropTypes.number,
}