import Link from "next/link"
import React from "react"
import { AiOutlineTwitter, AiFillMail } from "react-icons/ai"

const Footer = () => {
  return (
    <div className="footer-container">
      <p> Copyright © 2023 - All right reserved</p>
      <p className="icons">
        <Link href="https://twitter.com/hanyehtun" target="_blank">
          <AiOutlineTwitter />
        </Link>
        <Link href="mailto:sloth30799@gmail.com" target="_blank">
          <AiFillMail />
        </Link>
      </p>
    </div>
  )
}

export default Footer
