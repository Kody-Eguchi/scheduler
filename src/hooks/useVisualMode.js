import { useState } from 'react';

export default function useVisualMode(initial) {
  
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {

   
    const newHistory = [...history];

    if (replace) {
      newHistory.pop();
    }

    newHistory.push(newMode);
    setHistory(newHistory);

  //   if (replace) {
  //     setHistory(history.slice(0 , history.length -1));
  //     setMode(history[history.length - 1])
  //   } else {}
  //   setMode(change);
    // history.push(mode);
  }
  
  
  const back = () => {
    if (history.length === 1) return ;

    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
    
    // setHistory(history.slice(0 , history.length -1)); 
    // setMode(history[history.length -1])
  }
  const mode = history[history.length -1]
  return { mode, transition, back };
}
