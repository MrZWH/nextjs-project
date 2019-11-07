import React, { useState, useEffect, useReducer, useLayoutEffect, useContext, useRef, memo, useMemo, useCallback } from 'react'
import MyContext from './my-context'

function countReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1
      break;
    case 'minus':
      return state - 1
      break;

    default:
      return state
      break;
  }
}

function MyCountFunc() {
  // const [count, setCount] = useState(0)
  const [count, dispatchCount] = useReducer(countReducer, 0)

  const [name, setName] = useState('zhang')

  const context = useContext(MyContext)

  const inputRef = useRef()

  const countRef = useRef()
  countRef.current = count

  const config = useMemo(
    () => ({
      text: `count is ${count}`,
      color: count > 3 ? 'red' : 'blue'
    }),
    [count]
  )

  const handleButtonClick = useCallback(
    () => dispatchCount({ type: 'add' }),
    []
  )

  const handleButtonClick = useMemo(
    () => () => dispatchCount({ type: 'add' }),
    []
  )

  const handleAlertButtonClick = function () {
    setTimeout(() => {
      // alert(count)
      alert(countRef.current)
    }, 2000);
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // 注意闭包陷阱
  //     // setCount(c => c + 1)

  //     dispatchCount({ type: 'add' })
  //   }, 1000)
  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
    console.log('effect invoked')
    console.log(inputRef)
    return () => console.log('effect deteched')
  }, [count])

  useLayoutEffect(() => {
    console.log('layout effect invoked')
    return () => console.log('layout effect deteched')
  }, [count])

  // return <span>{count}</span>
  return <div>
    <input ref={inputRef} value={name} onChange={e => setName(e.target.value)} />
    <button onClick={handleButtonClick}>{count}</button>
    <p>{context}</p>
    <Child
      config={config}
      onButtonClick={}
    />
    <button onClick={handleAlertButtonClick}>alert count</button>
  </div>
}

export default MyCountFunc

const Child = memo(function Child({ onButtonClick, config }) {
  console.log('child render')
  return (
    <button onClick={onButtonClick} style={{ color: config.color }}>
      {config.text}
    </button>
  )
})