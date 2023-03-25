import React from "react"
import { client } from "../lib/client"
import { Product, FooterBanner, HeroBanner, Features } from "../components"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { Product as ProductType } from "../types"

export const getServerSideProps: GetServerSideProps = async () => {
  const query = '*[_type == "product"]'
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
