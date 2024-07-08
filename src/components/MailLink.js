exports.mailLink = () => {
  let coded = 'i1BI@i1BIs1VDIk.Xcp'
  let key = 'JNhMQHRZroBj1pGTn5WYPeUqA0bkc7SdzyLVgf4tI8wE6OsXuCiK2vlam3DFx9'
  let shift = coded.length
  let link = ''
  for (let i = 0; i < coded.length; i++) {
    if (key.indexOf(coded.charAt(i)) === -1) {
      let ltr = coded.charAt(i)
      link += ltr
    } else {
      let ltr = (key.indexOf(coded.charAt(i)) - shift + key.length) % key.length
      link += key.charAt(ltr)
    }
  }
  return link
}
