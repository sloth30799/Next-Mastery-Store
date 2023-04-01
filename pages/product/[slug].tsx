import { client } from "@/lib/client"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai"
import { useState } from "react"
import { useShoppingCartContext } from "@/context/ShoppingCartContext"
import { getImageUrl } from "@/lib/getImageUrl"
import Image from "next/image"
import { Image as ImageType, Product as ProductType } from "../../types"
import { Product } from "@/components"
import Head from "next/head"
import Link from "next/link"

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
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <body>
        <div>
          <Link href=".." className="text-lg">
            &larr; To the main page
          </Link>
          <div className="product-detail-container">
            <div>
              <div className="image-container">
                <Image
                  src={getImageUrl(image && image[index])}
                  alt={name}
                  width={300}
                  height={300}
                  className="product-detail-image"
                />
              </div>
              <div className="small-images-container">
                {image?.map((img: ImageType, i: number) => (
                  <Image
                    key={i}
                    src={getImageUrl(img)}
                    width={300}
                    height={300}
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
                <div className="flex">
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
                <p className="quantity-desc flex items-center">
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
                <button
                  type="button"
                  className="buy-now"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className="maylike-products-wrapper">
            <h2>You may also like</h2>
            <div className="marquee">
              <div className="maylike-products-container track">
                {products.map((item: ProductType) => (
                  <Product key={item._id} product={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "product" && slug.current == '${params?.slug}'][0]`
  const productsQuery = `*[_type == "product"]`

  const product: ProductType = await client.fetch(query)
  const products: ProductType[] = await client.fetch(productsQuery)

  if (!product) {
    return {
      notFound: true,
    }
  }

  return {
    props: { product, products },
    revalidate: 60 * 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "product"] {
          slug {
              current
          }
      }`

  const products = await client.fetch(query)

  const paths = products.map((product: ProductType) => ({
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
