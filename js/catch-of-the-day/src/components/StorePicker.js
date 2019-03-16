import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  storeInput = React.createRef();

  // If it's a class method, then this is not bound to the instance
  // the function will be stored in the prototype
  // Because this is not bound to the instance, when you pass a reference
  // to the function, this will be undefined
  // and so you have to use this.goToStore.bind(this) whenever passing it as a reference

  // goToStore(event) {
  //   event.preventDefault();
  //   console.log(this.storeInput);
  // }

  // when the function is stored as a property, using an arrow function, this is inherited
  // and so it will point to the instance and we don't need to hard bind it
  goToStore = event => {
    event.preventDefault();
    const storeId = this.storeInput.current.value;
    this.props.history.push(`/store/${storeId}`);
  };

  render() {
    return (
      <>
        <form action='' className='store-selector' onSubmit={this.goToStore}>
          <h2>Please enter a store:</h2>
          <input
            type='text'
            required
            placeholder='Store name'
            defaultValue={getFunName()}
            ref={this.storeInput}
          />
          <button type='submit'>Visit store</button>
        </form>
        {/* This is a comment */}
      </>
    );
  }
}

// <> </> is equivalent to <React.Fragment> </React.Fragment>

export default StorePicker;
