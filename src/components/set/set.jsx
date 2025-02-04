import React from 'react';

const Set = ({ content ,component }) => {
   
  return (
    <div>
        <div>请填写你的{content}</div>
        <component></component>
    </div>
  );
};

export default Set;

