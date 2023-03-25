import { getImageUrl } from "@/lib/getImageUrl"
import { Banner } from "@/types"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type HeroBannerProps = {
  heroBanner: Banner
}

const HeroBanner = ({ heroBanner }: HeroBannerProps) => {
  return (
    <div className="hero-banner-container">
      <div>
        <Image
          src={getImageUrl(heroBanner.image[0])}
          alt={heroBanner.product}
          width={300}
          height={300}
          className="hero-banner-image right-[5%]"
        />
        <Image
          src={getImageUrl(heroBanner.image[1])}
          alt={heroBanner.product}
          width={300}
          height={300}
          className="hero-banner-image lg:right-[55%] xl:right-[35%] hidden lg:block"
        />
        <Image
          src={getImageUrl(heroBanner.image[2])}
          alt={heroBanner.product}
          width={300}
          height={300}
          className="hero-banner-image right-[65%] hidden xl:block"
        />

        <div>
          <div className="text">
            <p className="beats-solo">{heroBanner.smallText}</p>
            <h3>{heroBanner.midText}</h3>
            <Link href={`/product/headphones_c`}>
              <button type="button">{heroBanner.buttonText}</button>
            </Link>
          </div>

          <div className="hidden desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
