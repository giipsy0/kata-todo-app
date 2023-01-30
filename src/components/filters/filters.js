import PropTypes from 'prop-types';

const filterButtons = [
  { name: 'all', label: 'All' },
  { name: 'active', label: 'Active' },
  { name: 'completed', label: 'Completed' },
];

const Filters = ({filter, onFilterChange = () => {}}) => {
  const buttons = filterButtons.map(({name, label}) => {
    const isActive = name === filter;
    let classNames;

    if (isActive) {
      classNames = 'selected';
    }

    return (
        <li key={name}>
        <button
            key={name}
            type="button"
            onClick={() => onFilterChange(name)}
            className={classNames}>{label}</button>
        </li>
    );
  });

  return (
      <ul className="filters">
        { buttons }
      </ul>
  );
};

export default Filters;

Filters.defaultProps = {
  filter: 'all',
  onFilterChange: () => {},
};

Filters.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};
