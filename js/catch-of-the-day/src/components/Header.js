import React from 'react';

// Stateless funcctional component
// For when the component just renders some HTML
// and is only being fed some data through props
// rather than having its own data
// Also using destructuring on the props argument
// that's being sent to it

const Header = ({ tagline }) => (
  <header className='top'>
    <h1>
      Catch
      <span className='ofThe'>
        <span className='of'>of</span>
        <span className='the'>the</span>
      </span>
      Day
    </h1>
    <h3 className='tagline'>
      <span>{tagline}</span>
    </h3>
  </header>
);

// equivalent to below

// const Header = props => (
//   <header className='top'>
//     <h1>
//       Catch
//       <span className='ofThe'>
//         <span className='of'>of</span>
//         <span className='the'>the</span>
//       </span>
//       Day
//     </h1>
//     <h3 className='tagline'>
//       <span>{props.tagline}</span>
//     </h3>
//   </header>
// );

// class Header extends React.Component {
//   render() {
//     return (
//       <header className='top'>
//         <h1>
//           Catch
//           <span className='ofThe'>
//             <span className='of'>of</span>
//             <span className='the'>the</span>
//           </span>
//           Day
//         </h1>
//         <h3 className='tagline'>
//           <span>{this.props.tagline}</span>
//         </h3>
//       </header>
//     );
//   }
// }

export default Header;
