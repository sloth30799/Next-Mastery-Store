import { urlFor } from "@/lib/client"
import Link from "next/link"
import React from "react"

type FooterBannerProps = {
  footerBanner: {
    discount: string
    largeText1: string
    largeText2: string
    saleTime: string
    smallText: string
    midText: string
    largeText: string
    image: object
    product: string
    buttonText: string
    desc: string
  }
}

const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    desc,
    product,
    buttonText,
    image,
  },
}: FooterBannerProps) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/headphones_c`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>

        <img
          src={urlFor(image).url()}
          alt={product}
          className="footer-banner-image"
        />
      </div>
    </div>
  )
}

export default FooterBanner
