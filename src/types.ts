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
