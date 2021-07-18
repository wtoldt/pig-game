import React from 'react';
import './Board.scss';

export default function Board ({children}) {

  return (
    <div className="pg-board">
      {children}
    </div>
  );
}