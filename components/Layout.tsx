import Head from "next/head"
import React, { ReactNode } from "react"
import Footer from "./Footer"
import Navbar from "./Navbar"

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <Head>
        <title>Wanderer Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
