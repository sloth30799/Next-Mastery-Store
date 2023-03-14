import { urlFor } from "@/lib/client"
import Link from "next/link"
import React from "react"

type Image = {
  asset: {}
  _key: string
}

type Slug = {
  current: string
}

type ProductProps = {
  product: {
    image: Image[]
    name: string
    slug: Slug
    price: number
    quantity: number
    details: string
    _id: number
  }
}

const Product = ({ product: { image, name, slug, price } }: ProductProps) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0])
              .width(250)
              .height(250)
              .url()}
            alt={name}
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product
