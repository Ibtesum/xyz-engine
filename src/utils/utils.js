
export const calculateMinMax = (arr) => {
  if (arr) {
    const min = arr?.reduce((a, b) => {
      return Math.min(a, b)
    }, arr[0])
    const max = arr?.reduce((a, b) => {
      return Math.max(a, b)
    }, 0)
    return { max, min }
  }
}


