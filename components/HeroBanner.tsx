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
    <div className="bg-yellow rounded-xl px-12 py-6 text-red tracking-wide">
      <div className="z-50">
        <div className="flex justify-center gap-24">
          <Image
            src={getImageUrl(heroBanner.image[0])}
            alt={heroBanner.product}
            width={300}
            height={300}
            className="hidden lg:block drop-shadow-2xl"
          />
          <Image
            src={getImageUrl(heroBanner.image[1])}
            alt={heroBanner.product}
            width={300}
            height={300}
            className="hidden md:block drop-shadow-2xl"
          />
          <Image
            src={getImageUrl(heroBanner.image[2])}
            alt={heroBanner.product}
            width={300}
            height={300}
            className="drop-shadow-2xl"
          />
        </div>
        <div className="flex flex-col md:flex-row md:justify-between gap-6 mt-6 md:items-end">
          <div className="flex flex-col gap-3">
            <p className="text-md md:text-lg">{heroBanner.smallText}</p>
            <h3 className="text-5xl md:text-6xl font-bold">
              {heroBanner.midText}
            </h3>
            <p className="text-2xl md:text-4xl font-semibold">
              {heroBanner.discount}
            </p>
            <Link href={`/product/headphones_c`}>
              <button
                type="button"
                className="mt-3 font-semibold rounded-lg p-2 bg-blue text-white hover:bg-white hover:text-red"
              >
                {heroBanner.buttonText}
              </button>
            </Link>
          </div>

          <div className="text-md tracking-wider">
            <h3>Description</h3>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
