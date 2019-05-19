import React from 'react';
import PropTypes from 'prop-types';

class AddColorForm extends React.Component {
  _title = React.createRef();
  _color = React.createRef();

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    this.props.onNewColor(this._title.current, this._color.current);
    this._title.current.value = '';
    this._color.current.value = '#f3df3d';
    this._title.current.focus();
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <input
          ref={this._title}
          type='text'
          placeholder='color title...'
          required
        />
        <input ref={this._color} type='color' required />
        <button>ADD</button>
      </form>
    );
  }
}

AddColorForm.propTypes = {
  onNewColor: PropTypes.func
};

AddColorForm.defaultProps = {
  onNewColor: f => f
};

export default AddColorForm;
