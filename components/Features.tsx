import React from "react"
import { FaShippingFast } from "react-icons/fa"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { TbTruckReturn } from "react-icons/tb"

const Features = () => {
  return (
    <div className="grid grid-cols-3 gap-6 my-24 justify-items-center hover:cursor-default">
      <div className="flex flex-col items-center justify-center">
        <FaShippingFast className="text-3xl lg:text-6xl" />
        <span className="text-sm md:font-bold">Fast Shipping</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <AiOutlineCheckCircle className="text-3xl lg:text-6xl" />
        <span className="text-sm md:font-bold">Warranty</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <TbTruckReturn className="text-3xl lg:text-6xl" />
        <span className="text-sm md:font-bold">Returns</span>
      </div>
    </div>
  )
}

export default Features
