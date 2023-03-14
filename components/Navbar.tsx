import { useShoppingCartContext } from "@/context/ShoppingCartContext"
import Link from "next/link"
import React from "react"
import { AiOutlineShopping } from "react-icons/ai"
import Cart from "./Cart"

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useShoppingCartContext()
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">NMS Headphones</Link>
      </p>

      <button
        title="cart"
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar
