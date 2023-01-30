import PropTypes from 'prop-types';

import Filters from "../filters/filters";

const Footer = ({activeItemsLeft, filter, onFilterChange, clearCompleted}) => (
    <footer className="footer">
        <span className="todo-count">{activeItemsLeft} items left</span>
        <Filters
        filter={filter}
        onFilterChange={onFilterChange}/>
        <button className="clear-completed"
        onClick={clearCompleted}>Clear completed</button>
    </footer>
);

export default Footer;

Footer.defaultProps = {
  clearCompleted: () => {},
  left: 0,
};

Footer.propTypes = {
  clearCompleted: PropTypes.func,
  left: PropTypes.number,
};