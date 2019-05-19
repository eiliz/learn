import React from 'react';

const Color = ({ title, color, rating = 0 }) => (
  <section className='color'>
    <h1>{title}</h1>
  </section>
);

export default Color;
