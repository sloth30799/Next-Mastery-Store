import ScaleLoader from "react-spinners/ScaleLoader"
import { LengthType } from "react-spinners/helpers/props"

export const Spinner = (props: { color: string; size: LengthType }) => {
  return (
    <ScaleLoader {...props} aria-label="Loading Spinner" data-testid="loader" />
  )
}
