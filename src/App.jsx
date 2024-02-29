import { useCallback, useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Timer() {
  const [second, setSeecond] = useState(0)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    console.log("Inside useEffect")

    const timer = setInterval(() => {
      setSeecond((second) => second + 1)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, []);
  const tooltepRef = useRef(null)
  const onMouseOver = useCallback(()=>setShown(true),[])
  const onMouseOut = useCallback(()=>setShown(false),[])
  useEffect(()=>{
    tooltepRef?.current.addEventListener("mouseover", onMouseOver)
    tooltepRef?.current.addEventListener("mouseout", onMouseOut)
    const ref = tooltepRef?.current; 

    return ()=>{
      ref?.removeEventListener("mouseover", onMouseOver)
      ref?.removeEventListener("mouseout", onMouseOut)
    }
  }, [onMouseOver, onMouseOut])

  return (
    <div>
      <h1>{second}</h1>
      <div ref={tooltepRef}>ToolTip</div>
      {shown && <div>{second}</div>}
    </div>
  )
}

function App() {
  const [index, setIndex] = useState(0)
  const updateIndex = useCallback(() => setIndex(index + 1), [index])
  return (
    <>
      <Timer key={index} />
      <div>
        <button onClick={updateIndex}>RESTART</button>
      </div>
    </>
  )
}

export default App
