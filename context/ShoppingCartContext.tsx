import { CartItem, Product } from "@/types"
import { createContext, useState, ReactNode, useContext } from "react"
import { toast } from "react-hot-toast"

type ShoppingCartProviderProps = {
  children: ReactNode
}

type ShoppingCartContextProps = {
  showCart: boolean
  setShowCart: (value: boolean) => void
  cartItems: CartItem[]
  setCartItems: (value: []) => void
  totalPrice: number
  setTotalPrice: (value: number) => void
  totalQuantities: number
  setTotalQuantities: (value: number) => void
  qty: number
  incQty: () => void
  decQty: () => void
  onAdd: (product: CartItem, quantity: number) => void
  toggleCartItemQuantity: (id: number, value: string) => void
  onRemove: (product: Product) => void
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps)

export function useShoppingCartContext() {
  return useContext(ShoppingCartContext)
}

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState<any>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [qty, setQty] = useState(1)

  let foundProduct: CartItem
  let index: number

  function incQty() {
    setQty((prev) => prev + 1)
  }

  function decQty() {
    setQty((prev) => {
      if (prev - 1 < 1) return 1

      return prev - 1
    })
  }

  function onAdd(product: CartItem, quantity: number) {
    const checkProductInCart = cartItems.find(
      (item: Product) => item._id === product._id
    )

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct: CartItem) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          }
      })

      setCartItems(updatedCartItems)
    } else {
      product.quantity = quantity

      setCartItems([...cartItems, { ...product }])
    }

    toast.success(`${qty} ${product.name} added to the cart.`)
  }

  function toggleCartItemQuantity(id: number, value: string) {
    foundProduct = cartItems.find((item: Product) => item._id === id)
    index = cartItems.findIndex((product: Product) => product._id === id)

    if (value === "inc") {
      const newCartItem = cartItems.map((item: CartItem) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
      setCartItems(newCartItem)
      setTotalPrice((prev) => prev + foundProduct.price)
      setTotalQuantities((prev) => prev + 1)
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        const newCartItem = cartItems.map((item: CartItem) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        setCartItems(newCartItem)
        setTotalPrice((prev) => prev - foundProduct.price)
        setTotalQuantities((prev) => prev - 1)
      }
    }
  }

  function onRemove(product: Product) {
    foundProduct = cartItems.find((item: Product) => item._id === product._id)
    const newCartItems = cartItems.filter(
      (item: Product) => item._id !== product._id
    )

    setTotalPrice((prev) => prev - foundProduct.price * foundProduct.quantity)
    setTotalQuantities((prev) => (prev = prev - foundProduct.quantity))
    setCartItems(newCartItems)
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
