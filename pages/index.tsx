import { client } from "../lib/client"
import { Product, FooterBanner, HeroBanner, Features } from "../components"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { Product as ProductType } from "../types"
import ToolBox from "@/components/ToolBox"
import { useRouter } from "next/router"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sortOrder = context.query?.sort as string | undefined
  const categoryFilters = context.query?.filter as string | undefined

  const categories = JSON.stringify(categoryFilters?.split("&"))

  let query = `*[_type == "product"]`

  if (categoryFilters) {
    query = `*[_type == "product" && category in ${categories}]`
  }

  if (sortOrder) {
    query += ` | order(price ${sortOrder})`
  }

  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

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
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Best backpacks in the market</p>
      </div>
      <ToolBox />
      <div className="products-container">
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
