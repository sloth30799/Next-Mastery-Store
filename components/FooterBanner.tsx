import { getImageUrl } from "@/lib/getImageUrl"
import { Banner } from "@/types"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type FooterBannerProps = {
  footerBanner: Banner
}

const FooterBanner = ({ footerBanner }: FooterBannerProps) => {
  const {
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
  } = footerBanner

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
            <button type="button" className="hover:bg-blue hover:text-white">
              {buttonText}
            </button>
          </Link>
        </div>

        <Image
          src={getImageUrl(image[0])}
          width={300}
          height={300}
          alt={product}
          className="footer-banner-image"
        />
      </div>
    </div>
  )
}

export default FooterBanner
