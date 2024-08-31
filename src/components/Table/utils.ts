




export const getLeftLast = (columns: any[],index: number) => {
  for (index += 1; index < columns.length; index++) {
    if (columns[index].fixed === 'left') {
      return false
    }
  }
  return true
}

export const getRightLast = (columns: any[],index: number) => {
  for (index -= 1; index >= 0; index--) {
    if (columns[index].fixed === 'right') {
      return false
    }
  }
  return true
}

export const getLeftWidth = (columns: any[],index: number) => {
  let width = 0;
  for (index -= 1; index >= 0; index--) {
    if (columns[index].fixed === 'left') {
      width += columns[index].width || 0
    }
  }
  return width
}
export const getRightWidth = (columns: any[],index: number) => {
  let width = 0;
  for (index += 1; index < columns.length; index++) {
    if (columns[index].fixed === 'right') {
      width += columns[index].width || 0
    }
  }
  return width
}
