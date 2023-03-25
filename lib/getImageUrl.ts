import { useNextSanityImage } from "next-sanity-image"
import { Image } from "@/types"
import { client } from "@/lib/client"

export function getImageUrl(image: Image) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const imageProps = useNextSanityImage(client, image)
  const url = imageProps.src

  return url
}
