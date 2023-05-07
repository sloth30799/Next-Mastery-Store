import { getImageUrl } from "@/lib/getImageUrl"
import { Product } from "@/types"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type ProductProps = {
  product: Product
}

const Product = ({ product: { image, name, slug, price } }: ProductProps) => {
  return (
    <div className="">
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          {image && (
            <Image
              src={getImageUrl(image[0])}
              width={250}
              height={250}
              alt={name}
            />
          )}
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product
