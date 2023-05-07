import { Layout } from "@/components"
import { Preloader } from "@/components/loader"
import { ShoppingCartProvider } from "@/context/ShoppingCartContext"
import type { AppProps } from "next/app"
import { Toaster } from "react-hot-toast"
import "@/styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Preloader backgroundColor="bg-white" color="#000" size={80}>
      <ShoppingCartProvider>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </ShoppingCartProvider>
    </Preloader>
  )
}
