import { Layout } from "@/components"
import { ShoppingCartProvider } from "@/context/ShoppingCartContext"
import "@/styles/globals.css"
import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from "next/app"
import { Toaster } from "react-hot-toast"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ShoppingCartProvider>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </ShoppingCartProvider>
    </ChakraProvider>
  )
}
