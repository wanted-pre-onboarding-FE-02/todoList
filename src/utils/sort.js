export const sortByDateAsd = (a, b) => {
  // 오름차순
  const dateA = Date.parse(a.date)
  const dateB = Date.parse(b.date)

  if (dateA < dateB) {
    return -1
  }

  if (dateA > dateB) {
    return 1
  }

  return 0
}

export const sortByDateDsd = (a, b) => {
  // 내림차순
  const dateA = Date.parse(a.date)
  const dateB = Date.parse(b.date)

  if (dateA < dateB) {
    return 1
  }

  if (dateA > dateB) {
    return -1
  }

  return 0
}

export const sortByDic = (a, b) => {
  // 사전순
  const textA = a.text
  const textB = b.text

  if (textA < textB) {
    return -1
  }

  if (textA > textB) {
    return 1
  }

  return 0
}

export const sortByDone = (a, b) => {
  // 사전순
  const doneA = a.done
  const doneB = b.done

  if (doneA < doneB) {
    return 1
  }

  if (doneA > doneB) {
    return -1
  }

  return 0
}
