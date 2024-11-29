export const getCircleColor = (index, activeCircle, totalCircles) => {
  const relativeIndex = (index - activeCircle + totalCircles) % totalCircles
  switch (relativeIndex) {
    case 0:
      return '#555555'
    case 1:
      return '#777777'
    case 2:
      return '#999999'
    default:
      return '#cccccc'
  }
}
