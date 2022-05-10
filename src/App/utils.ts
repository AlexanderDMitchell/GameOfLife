export const updateFavicon = (color: string) => {
  const link = document.querySelector("link[rel~='icon']")

  if (!link || !(link instanceof HTMLLinkElement)) {
    return
  }

  const faviconUrl = link.href

  const img = document.createElement('img')

  img.addEventListener('load', () => {
    const canvas = document.createElement('canvas')

    canvas.width = 16
    canvas.height = 16

    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    context.drawImage(img, 0, 0)
    context.globalCompositeOperation = 'source-over'
    context.fillStyle = color
    context.fillRect(0, 0, 16, 16)
    context.fill()

    link.type = 'image/x-icon'
    link.href = canvas.toDataURL()
  })

  img.src = faviconUrl
}

export const updateMetaThemeColor = (color: string) => {
  const meta = document.querySelector("link[rel~='icon']")

  if (!meta || !(meta instanceof HTMLMetaElement)) {
    return
  }

  meta.content = color
}
