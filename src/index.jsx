import React, { useState,useEffect } from 'react';
import ReactDom from 'react-dom'
import './style.css';
// #ifdef H5
import h5 from './h5';
// #endif

// #ifdef APP
import app from './app';
// #endif

function App() {
  const [count, setCount] = useState(0);


  let handleCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p onClick={handleCount}>{count}</p>
      {/* #ifdef H5 */}
      <div className='h5'>{h5()}</div>
      {/* #endif */}
      {/* #ifdef APP */}
      <div className='app'>{app()}</div>
      {/* #endif */}
    </div>
  );
}

ReactDom.render(<App />, document.getElementById('root'));