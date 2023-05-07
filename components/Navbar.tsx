import { useShoppingCartContext } from "@/context/ShoppingCartContext"
import Link from "next/link"
import React, { useState } from "react"
import { AiOutlineShopping, AiOutlineCloseCircle } from "react-icons/ai"
import { BsMenuButtonFill } from "react-icons/bs"
import Cart from "./Cart"

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useShoppingCartContext()
  const [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return (
    <div className="flex justify-between items-center px-3 py-4">
      <BsMenuButtonFill
        size={"1.5rem"}
        onClick={open}
        className="lg:hidden block"
      />
      {isOpen && (
        <div className="absolute left-0 top-0 z-10 m-auto w-full h-full bg-base-100 flex flex-col gap-3 justify-center items-center">
          <AiOutlineCloseCircle onClick={close} />
          <Link
            href="/"
            className="text-lg px-2 font-title hover:bg-accent rounded hover:text-white active:bg-grey text-sm"
            onClick={close}
          >
            All Products
          </Link>
          <Link
            href="https://wanderer-backpack.vercel.app/"
            className="text-lg px-2 font-title hover:bg-accent rounded hover:text-white active:bg-grey text-sm"
          >
            Travel
          </Link>
          <Link
            href="#"
            className="text-lg px-2 font-title hover:bg-accent rounded hover:text-white active:bg-grey text-sm"
            onClick={close}
          >
            Blogs
          </Link>
          <Link
            href="https://hanyehtun.netlify.app/"
            className="text-lg px-2 font-title hover:bg-accent rounded hover:text-white active:bg-grey text-sm"
          >
            About Us
          </Link>
        </div>
      )}
      <div className="flex items-center gap-6">
        <Link href="/" className="logo mr-12">
          Wanderer Store
        </Link>
        <Link
          href="/"
          className="text-sm hover:underline underline-offset-4 hidden md:block"
        >
          All Products
        </Link>
        <Link
          href="https://wanderer-backpack.vercel.app/"
          className="text-sm hover:underline underline-offset-4 hidden md:block"
        >
          Travel
        </Link>
        <Link
          href="#"
          className="text-sm hover:underline underline-offset-4 hidden md:block"
        >
          Blogs
        </Link>
        <Link
          href="https://hanyehtun.netlify.app/"
          className="text-sm hover:underline underline-offset-4 hidden md:block"
        >
          About Us
        </Link>
      </div>
      <button
        title="cart"
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping size={"1.5rem"} color="black" />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar
