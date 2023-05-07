import { client } from "../lib/client"
import {
  Product,
  FooterBanner,
  HeroBanner,
  Features,
  Filter,
  Sort,
} from "../components"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { Banner, Product as ProductType } from "../types"

export const getServerSideProps: GetServerSideProps<{
  products: ProductType[]
  bannerData: Banner[]
}> = async (context) => {
  const sortOrder = context.query?.sort as string | undefined
  const categoryFilters = context.query?.category as string | undefined

  const categories = JSON.stringify(categoryFilters)

  let query = `*[_type == "product"]`

  if (typeof categoryFilters === "string") {
    query = `*[_type == "product" && category in [${categories}]]`
  } else if (typeof categoryFilters === "object") {
    query = `*[_type == "product" && category in ${categories}]`
  }

  if (sortOrder) {
    query += ` | order(price ${sortOrder})`
  }

  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  if (!products || !bannerData) {
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    }
  }

  return {
    props: { products, bannerData },
  }
}

const Home = ({
  products,
  bannerData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      {bannerData.length && <HeroBanner heroBanner={bannerData[0]} />}
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Best backpacks in the market</p>
      </div>
      <div className="container m-auto flex justify-between">
        <Filter />
        <Sort />
      </div>
      <div className="products-container p-3">
        {products?.map((product: ProductType) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <Features />
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
}

export default Home
