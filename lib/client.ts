import { createClient } from "next-sanity"

export const client = createClient({
  projectId: "5jyu6gl3",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  apiVersion: "2023-03-13",
  useCdn: true,
})
