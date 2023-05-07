import { useRouter } from "next/router"
import React, { useState } from "react"
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri"

type SortOptionProps = {
  text: string
  order: string
}

const SortOption = ({ text, order }: SortOptionProps) => {
  const router = useRouter()

  const sortProducts = (order: string) => {
    router.push({
      query: { ...router.query, sort: order },
    })
  }

  return (
    <li
      onClick={() => sortProducts(order)}
      className="text-sm hover:underline cursor-pointer"
    >
      {text}
    </li>
  )
}

const Sort = () => {
  const [open, setOpen] = useState(false)

  function handleOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }
  return (
    <div className="flex flex-col gap-6">
      <h4
        className="flex text-md font-bold gap-3 items-center cursor-pointer"
        onClick={open ? handleClose : handleOpen}
      >
        Sort
        {open ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
      </h4>
      {open && (
        <ul className="flex flex-col gap-3 list-disc px-6">
          <li className="flex flex-col gap-1">
            <h6 className="text-sm font-semibold">Price</h6>
            <SortOption text="From Highest to Lowest" order="desc" />
            <SortOption text="From Lowest to Highest" order="asc" />
          </li>
          <li className="flex flex-col gap-1">
            <h6 className="text-sm font-semibold">Other</h6>
            <SortOption text="Latest" order="" />
          </li>
        </ul>
      )}
    </div>
  )
}

export default Sort
