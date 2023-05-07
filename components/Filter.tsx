import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"

type FilterOptionProps = {
  name: string
}

const FilterOption = ({ name }: FilterOptionProps) => {
  const router = useRouter()

  const [filter, setFilter] = useState(false)

  useEffect(() => {
    const existingCategories = router.query.category

    let category = existingCategories

    if (typeof category === "string") {
      category = [category]
    }

    if (category?.includes(name)) {
      setFilter(true)
    } else {
      setFilter(false)
    }
  }, [router.query.category, name])

  function handleTrue() {
    setFilter(true)

    if (!router.query.category) {
      router.push({
        query: { ...router.query, category: name },
      })
    }

    const existingCategories = router.query.category

    let category = existingCategories

    if (typeof category === "string") {
      category = [category]
    }

    category?.push(name)

    router.push({
      query: { ...router.query, category },
    })
  }

  function handleFalse() {
    setFilter(false)

    const existingCategories = router.query.category

    let category = existingCategories

    if (typeof category === "string") {
      category = [category]
    }

    category = category?.filter((cat) => cat !== name)

    if (category?.length === 0) {
      const { category: _, ...rest } = router.query

      router.push({
        query: rest,
      })
    } else {
      router.push({
        query: { ...router.query, category },
      })
    }
  }

  return (
    <div
      className={`badge ${
        filter ? `` : `badge-outline`
      } gap-2 cursor-pointer capitalize badge-sm`}
      onClick={filter ? handleFalse : handleTrue}
    >
      {filter && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-4 h-4 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      )}
      {name}
    </div>
  )
}

const Filter = () => {
  return (
    <div className="flex gap-3">
      <h4 className="font-semibold">Filter: </h4>
      <div className="flex gap-3">
        <FilterOption name="classics" />
        <FilterOption name="orion" />
        <FilterOption name="tech" />
      </div>
    </div>
  )
}

export default Filter
