export type Product = {
  id: string
  name: string
  price: number
  image?: string
  description?: string
  brand?: {
    name?: string
  }
}

export type User = {
  id: string
  name: string
  firstName: string
  lastName: string
}
