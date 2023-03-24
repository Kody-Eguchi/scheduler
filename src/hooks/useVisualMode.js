import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (change, replace = false) => {
    if (replace) {
      setHistory(history.slice(0 , history.length -1));
      setMode(history[history.length - 1])
    } else {}
    setMode(change);
    history.push(mode);
  }
  
  
  const back = () => {
    setHistory(history.slice(0 , history.length -1)); 
    setMode(history[history.length -1])
  }

  return { mode, transition, back };
}
