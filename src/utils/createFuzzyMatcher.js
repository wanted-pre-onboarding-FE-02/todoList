function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}


function ch2pattern(ch) {
  const offset = 44032
  // 한국어 음절
  if (/[가-힣]/.test(ch)) {
    const chCode = ch.charCodeAt(0) - offset
    // 종성이 있으면 문자 그대로 찾는다.
    if (chCode % 28 > 0) {
      return ch
    }
    const begin = Math.floor(chCode / 28) * 28 + offset
    const end = begin + 27
    return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`
  }
  // 한글 자음
  if (/[ㄱ-ㅎ]/.test(ch)) {
    const con2syl = {
      'ㄱ': '가'.charCodeAt(0),
      'ㄲ': '까'.charCodeAt(0),
      'ㄴ': '나'.charCodeAt(0),
      'ㄷ': '다'.charCodeAt(0),
      'ㄸ': '따'.charCodeAt(0),
      'ㄹ': '라'.charCodeAt(0),
      'ㅁ': '마'.charCodeAt(0),
      'ㅂ': '바'.charCodeAt(0),
      'ㅃ': '빠'.charCodeAt(0),
      'ㅅ': '사'.charCodeAt(0),
    }
    const begin = con2syl[ch] || ((ch.charCodeAt(0) - 12613 /* 'ㅅ'의 코드 */) * 588 + con2syl['ㅅ'])
    const end = begin + 587
    return `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`
  }
  // 그 외엔 그대로 내보냄
  return escapeRegExp(ch)
}

function createFuzzyMatcher(input) {
  const pattern = input.split('').map(ch2pattern).join('.*?')
  return new RegExp(pattern)
}

export { createFuzzyMatcher }