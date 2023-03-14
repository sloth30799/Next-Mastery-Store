import Image from "next/image"
import Link from "next/link"
import React from "react"
import { urlFor } from "@/lib/client"

type HeroBannerProps = {
  heroBanner: {
    smallText: string
    midText: string
    largeText: string
    image: object
    product: string
    buttonText: string
    desc: string
  }
}

const HeroBanner = ({ heroBanner }: HeroBannerProps) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText}</h1>
        <img
          src={urlFor(heroBanner.image).url()}
          alt={heroBanner.product}
          // width={450}
          // height={450}
          className="hero-banner-image"
        />

        <div>
          <Link href={`/product/headphones_c`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>

          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
