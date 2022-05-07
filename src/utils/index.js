export const changeDateForm = (paramDate, isYear = false) => {
  const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

  const day = dayNames[paramDate.getDay()] // getDay: 해당 요일(0 ~ 6)를 나타내는 정수 반환
  const year = paramDate.getFullYear()
  const month = paramDate.getMonth() + 1
  const date = paramDate.getDate()

  const dateStr = `${month}월 ${date}일 ${day}`
  return isYear ? `${year}년 ${dateStr} ` : dateStr
}

export const changeYMD = (paramDate) => {
  if (!paramDate) return null

  const yy = String(paramDate.getFullYear())
  let mm = paramDate.getMonth() + 1
  let dd = paramDate.getDate()

  mm = mm > 9 ? mm : `0${mm}`
  dd = dd > 9 ? dd : `0${dd}`

  const ymd = yy + mm + dd
  return ymd
}
