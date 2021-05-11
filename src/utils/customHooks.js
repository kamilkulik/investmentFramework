import { useEffect, useReducer, useRef } from 'react'
import axios from 'axios'

// HOOK FOR IGNORING INITIAL FIRST MOUNT OF COMPONENT

export const useIgnoreMountEffect = (func, deps) => {
  const didMount = useRef(false)

  useEffect(() => {
    if (didMount.current) func()
    else didMount.current = true
  }, [deps])
}

// FETCH STOCK INFO CUSTOM HOOK

const initialState = {
  status: 'idle',
  error: null,
  data: [],
}

export const useFetchStockInfo = (info) => {
  // const [status, setStatus] = useState('idle')
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'FETCHING':
        return { ...initialState, status: 'fetching' }
      case 'FETCHED':
        return { ...initialState, status: 'fetched', data: action.payload }
      case 'FETCH_ERR':
        return { ...initialState, status: 'error', error: action.payload }
      default:
        return state
    }
  }, initialState)

  useEffect(() => {
    if (!info) return

    dispatch({ type: 'FETCHING' })
    axios
      .get('http://localhost:4000/api/wse/stocknames')
      .then((res) => {
        if (res.data.length !== 0) {
          dispatch({ type: 'FETCHED', payload: res })
        }
      })
      .catch((err) => dispatch({ type: 'FETCH_ERR', payload: err }))
  }, [info])

  return { ...state }
}
