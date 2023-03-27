import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, -1), newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
    setMode(newMode);
  };

  const back = () => {
    if (history.length > 1) {
      setHistory((prev) => prev.slice(0, -1));
      setMode(history[history.length - 2]);
    }
  };

  return { mode, transition, back };
}

/* 2nd opinion code*/
// export default function useVisualMode(initial) {

//   const [history, setHistory] = useState([initial]);

//   const transition = (newMode, replace = false) => {
//     const newHistory = [...history];
//     if (replace) {
//       newHistory.pop();
//     }
//     newHistory.push(newMode);
//     setHistory(newHistory);
//   }

//   const back = () => {
//     if (history.length === 1) return ;
//     const newHistory = [...history];
//     newHistory.pop();
//     setHistory(newHistory);
//   }
//   const mode = history[history.length -1]
//   return { mode, transition, back };
// }

/* MY ORIGINAL CODE */
// export default function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]);

//   const transition = (change, replace = false) => {

//     if (replace) {
//       setHistory(history.slice(0 , history.length -1));
//       setMode(history[history.length - 1])
//     }
//     setMode(change);
// history.push(mode);  ❌this was only problem
//   }

//   const back = () => {
//     setHistory(history.slice(0 , history.length -1));
//     setMode(history[history.length -1])
//   }

//   return { mode, transition, back };
// }
