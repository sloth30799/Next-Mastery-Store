import { useShoppingCartContext } from "@/context/ShoppingCartContext"
import Link from "next/link"
import React from "react"
import { AiOutlineShopping } from "react-icons/ai"
import Cart from "./Cart"

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useShoppingCartContext()
  return (
    <div className="navbar-container pb-5">
      <p className="logo">
        <Link href="/">Wanderer Store</Link>
      </p>

      {/* <div className="flex gap-6">
        <p>Collection</p>
        <p>Community</p>
      </div> */}

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
