import React, { useEffect } from 'react'
import axios from 'axios'

export const useIgnoreMountEffect = (func, deps) => {
  const didMount = React.useRef(false)

  React.useEffect(() => {
    if (didMount.current) func()
    else didMount.current = true
  }, [deps])
}

export const useFetchStockInfo = (info) => {
  const [stockInfo, setStockInfo] = React.useState([])
  const [status, setStatus] = React.useState('idle')

  useEffect(() => {
    if (!info) return

    setStatus('fetching')
    axios
      .get('http://localhost:4000/api/wse/stocknames')
      .then((res) => {
        if (res.data.length !== 0) {
          const stockArr = res.data.map((stock) => stock[info])
          setStockInfo(stockArr)
          setStatus('fetched')
        }
      })
      .catch((err) => console.log(err))
  }, [info])

  return { status, stockInfo }
}
