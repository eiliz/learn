import React, { Component } from 'react';
import AddColorForm from './components/AddColorForm.js';
import ColorList from './components/ColorList.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: []
    };
  }

  render() {
    const { colors } = this.state;
    return (
      <div className='App'>
        <AddColorForm />
        <ColorList colors={colors} />
      </div>
    );
  }
}

export default App;
