export interface Image {
  _key: string
  asset: {
    _ref: string
  }
}

export interface Slug {
  current: string
}

export interface Product {
  _id: number
  details: string
  image: Image[]
  name: string
  price: number
  slug: Slug
  category: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface Banner {
  buttonText: string
  desc: string
  discount: string
  image: Image[]
  largeText1: string
  largeText2: string
  midText: string
  product: string
  saleTime: string
  smallText: string
}
