import React from "react"
import { FaShippingFast } from "react-icons/fa"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { TbTruckReturn } from "react-icons/tb"

const Features = () => {
  return (
    <div className="grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 justify-items-center gap-6 my-24">
      <div>
        <FaShippingFast size={"4rem"} />
        Fast Shipping
      </div>
      <div>
        <AiOutlineCheckCircle size={"4rem"} />
        Warranty
      </div>
      <div>
        <TbTruckReturn size={"4rem"} />
        Returns
      </div>
    </div>
  )
}

export default Features
