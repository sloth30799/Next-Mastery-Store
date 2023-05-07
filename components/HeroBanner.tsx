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
    <div className="bg-yellow py-6 px-3 text-red tracking-wide">
      <div className="z-50">
        <div className="flex justify-center gap-6 xl:gap-12">
          <div className="flex flex-col gap-3 justify-center">
            <p className="font-semibold">{heroBanner.smallText}</p>
            <h3 className="text-5xl md:text-6xl font-bold">
              {heroBanner.midText}
            </h3>
            <p className="text-2xl md:text-4xl font-semibold">
              {heroBanner.discount}
            </p>
            <p>{heroBanner.desc}</p>
            <Link href={`/product/orion-backpack`}>
              <button
                type="button"
                className="mt-3 font-semibold rounded-lg p-2 bg-blue text-white hover:bg-white hover:text-red"
              >
                {heroBanner.buttonText}
              </button>
            </Link>
          </div>
          <Image
            src={getImageUrl(heroBanner.image[0])}
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
            className="hidden lg:block drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
