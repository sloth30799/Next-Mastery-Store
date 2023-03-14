import { Product } from "@/components"
import { client, urlFor } from "@/lib/client"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai"
import { useState } from "react"
import { useShoppingCartContext } from "@/context/ShoppingCartContext"

type Image = {
  asset: {}
  _key: string
}

type Slug = {
  current: string
}

type Product = {
  image: Image[]
  name: string
  slug: Slug
  price: number
  quantity: number
  details: string
  _id: number
}

type Products = Product[]

const ProductDetails = ({
  product,
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { image, name, details, price } = product
  const [index, setIndex] = useState(0)

  const { decQty, incQty, qty, onAdd, setShowCart } = useShoppingCartContext()

  function handleBuyNow() {
    onAdd(product, qty)

    setShowCart(true)
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index]).url()}
              alt={name}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item: Image, i: number) => (
              <img
                key={i}
                src={urlFor(item).url()}
                alt="product"
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item: Product) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "product" && slug.current == '${params?.slug}'][0]`
  const productsQuery = `*[_type == "product"]`

  const product: Product = await client.fetch(query)
  const products: Products = await client.fetch(productsQuery)

  return {
    props: { product, products },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "product"] {
          slug {
              current
          }
      }`

  const products = await client.fetch(query)

  const paths = products.map((product: Product) => ({
    params: {
      slug: product.slug.current,
    },
  }))

  return {
    paths,
    fallback: "blocking",
  }
}

export default ProductDetails
