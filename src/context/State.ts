import { createContext, Dispatch, SetStateAction } from 'react'
import { Labels, User } from '../types'

export default createContext<{
  done: boolean,
  error: string,
  labels: Labels,
  logout: () => void,
  setError: Dispatch<SetStateAction<string>>
  updating: string,
  user: User,
}>({
  done: false,
  error: '',
  labels: [],
  logout: () => undefined,
  setError: () => undefined,
  updating: '',
  user: null,
})
