import React from 'react';

import './App.scss';
import cardImages from './cardImages';

import GamePlayGround from "./components/GamePlayGround";

function App() {

  return (
    <div className="">
      <GamePlayGround cardImages={cardImages} size={18} />
    </div>
  );
}
export default App;
