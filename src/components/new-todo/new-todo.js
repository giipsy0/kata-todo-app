import { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTodo extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    });
  }

  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    });
  }

  onSubmit = (e) => {
    const { onItemAdded } = this.props;
    const { label, sec, min } = this.state;
    e.preventDefault();
    onItemAdded(label, min, sec);
    this.setState({
      label: '',
      min: '',
      sec: '',
    });
  };

  render() {
    const { label, min, sec } = this.state;
    return (
    <header className="header">
            <h1>todos</h1>
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          name="description"
          placeholder="What need to be done?"
          onChange={this.onLabelChange}
          value={label}
          required
          autoFocus
        />
        <input
          type="text"
          className="new-todo-form__timer"
          name="minutes"
          value={min}
          placeholder="Min"
          onChange={this.onMinChange}
          required
        />
        <input
          type="text"
          className="new-todo-form__timer"
          name="seconds"
          value={sec}
          placeholder="Sec"
          onChange={this.onSecChange}
          required
        />
        <button type="submit" aria-label="submission" className="new-todo-form-btn" />
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