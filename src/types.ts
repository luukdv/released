export type Label = {
  id: number
  img: string
  link: string
  name: string
  release: {
    artist: string
    checked: number
    img: string
    link: string
    title: string
  }
}

export type Labels = [] | Label[]

export type User = null | {
  logout: () => void
  user_metadata: {
    full_name: string
  }
}
