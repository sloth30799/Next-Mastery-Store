import { useState, ChangeEvent } from "react"
import { BiSearch, BiFilter, BiSortAlt2 } from "react-icons/bi"
import { Checkbox, Divider, Stack } from "@chakra-ui/react"
import { useRouter } from "next/router"

const ToolBox = () => {
  const router = useRouter()
  const [checkedItems, setCheckedItems] = useState([false, false, false])
  const [open, setOpen] = useState(false)

  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked

  const handleAllChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedItems([
      event.target.checked,
      event.target.checked,
      event.target.checked,
    ])
  }

  const handleOneChange = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "classics":
        setCheckedItems([
          event.target.checked,
          checkedItems[1],
          checkedItems[2],
        ])
        break
      case "orion":
        setCheckedItems([
          checkedItems[0],
          event.target.checked,
          checkedItems[2],
        ])
        break
      case "tech":
        setCheckedItems([
          checkedItems[0],
          checkedItems[1],
          event.target.checked,
        ])
        break

      default:
        break
    }
  }

  function sortProducts(order: string) {
    router.push({
      query: { ...router.query, sort: order },
    })
  }

  function filterProducts() {
    let [classics, orion, tech] = checkedItems

    const filterItems = [
      classics && "classics",
      orion && "orion",
      tech && "tech",
    ].filter(Boolean) // Remove falsy items (e.g., undefined) from the array

    const filterQuery = filterItems.join("&")

    router.push({
      query: { ...router.query, filter: filterQuery },
    })
  }

  function handleOpen() {
    setOpen(!open)
  }

  return (
    <>
      <div className="flex justify-around gap-12" onClick={handleOpen}>
        {/* <div className={styles.iconBox}>
          Search
          <BiSearch size={"2rem"} />
        </div> */}
        <div className="flex items-center gap-3 text-lg tracking-wide font-bold hover:cursor-pointer hover:font-extrabold">
          Filter
          <BiFilter size={"2rem"} />
        </div>
        <div className="flex items-center gap-3 text-lg tracking-wide font-bold hover:cursor-pointer hover:font-extrabold">
          Sort
          <BiSortAlt2 size={"2rem"} />
        </div>
      </div>
      {open && (
        <div className="mt-12 flex flex-col justify-center font-semibold tracking-tight md:flex-row gap-12 md:justify-around">
          <div className="flex flex-col gap-3 p-3">
            <Checkbox
              isChecked={allChecked}
              isIndeterminate={isIndeterminate}
              onChange={handleAllChange}
              size={"lg"}
            >
              All
            </Checkbox>
            <Stack pl={6} mt={1} spacing={1}>
              <Checkbox
                isChecked={checkedItems[0]}
                onChange={handleOneChange}
                name="classics"
                size={"lg"}
              >
                Classics
              </Checkbox>
              <Checkbox
                isChecked={checkedItems[1]}
                onChange={handleOneChange}
                name="orion"
                size={"lg"}
              >
                Orion
              </Checkbox>
              <Checkbox
                isChecked={checkedItems[2]}
                onChange={handleOneChange}
                name="tech"
                size={"lg"}
              >
                Tech
              </Checkbox>
            </Stack>
            <button
              onClick={filterProducts}
              className="mt-3 rounded-lg p-1 bg-blue text-white hover:bg-black hover:text-white"
            >
              Filter
            </button>
          </div>
          <ul className="list-disc flex flex-col items-center">
            <li className="text-xl list-none text-semibold">Price</li>
            <li
              onClick={() => sortProducts("desc")}
              className="text-lg underline mt-3 hover:cursor-pointer"
            >
              From Highest to Lowest
            </li>
            <li
              onClick={() => sortProducts("asc")}
              className="text-lg underline mt-3 hover:cursor-pointer"
            >
              From Lowest to Highest
            </li>
            <li className="text-xl list-none mt-3 text-semibold">Other</li>
            <li
              onClick={() => sortProducts("")}
              className="text-lg underline mt-3 hover:cursor-pointer"
            >
              Latest
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default ToolBox
