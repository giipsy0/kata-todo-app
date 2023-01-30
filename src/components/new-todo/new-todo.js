import { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTodo extends Component {
  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { onItemAdded } = this.props;
    const { label } = this.state;
    e.preventDefault();
    onItemAdded(label);
    this.setState(() => ({
      label: '',
    }));
    };

  render() {
    const { label } = this.state;

    return (
    <header className="header">
            <h1>todos</h1>
      <form onSubmit={this.onSubmit}>
      <input type="text"
           className="new-todo"
           placeholder="What needs to be done?"
           autoFocus
           onChange={this.onLabelChange}
           value={label}
           required/>
      </form>
    </header>
    );
  }
}

NewTodo.defaultProps = {
  onItemAdded: () => {},
};

NewTodo.propTypes = {
  onItemAdded: PropTypes.func,
};