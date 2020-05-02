import { createContext, Dispatch, SetStateAction } from 'react'
import { Labels, User } from '../types'

export default createContext<{
  done: boolean,
  error: string,
  labels: Labels,
  logout: () => void,
  setError: Dispatch<SetStateAction<string>>
  setLabels: Dispatch<SetStateAction<Labels>>
  updating: string,
  user: User,
}>({
  done: false,
  error: '',
  labels: [],
  logout: () => undefined,
  setError: () => undefined,
  setLabels: () => undefined,
  updating: '',
  user: null,
})
