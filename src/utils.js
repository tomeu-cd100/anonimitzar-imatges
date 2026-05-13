export const pixelateImage = (canvas, boxes, pixelSize) => {
  const ctx = canvas.getContext('2d')
  
  boxes.forEach(box => {
    const { x, y, width, height } = box
    
    // Validar que el requadre té mida
    if (width <= 0 || height <= 0) return
    
    // Aplicar pixelació
    const imageData = ctx.getImageData(x, y, width, height)
    const data = imageData.data
    
    for (let i = 0; i < width; i += pixelSize) {
      for (let j = 0; j < height; j += pixelSize) {
        // Obtenir color mitjà del bloc de píxels
        let r = 0, g = 0, b = 0, count = 0
        
        for (let di = 0; di < pixelSize && i + di < width; di++) {
          for (let dj = 0; dj < pixelSize && j + dj < height; dj++) {
            const idx = ((j + dj) * width + (i + di)) * 4
            r += data[idx]
            g += data[idx + 1]
            b += data[idx + 2]
            count++
          }
        }
        
        r = Math.round(r / count)
        g = Math.round(g / count)
        b = Math.round(b / count)
        
        // Omplir el bloc amb el color mitjà
        for (let di = 0; di < pixelSize && i + di < width; di++) {
          for (let dj = 0; dj < pixelSize && j + dj < height; dj++) {
            const idx = ((j + dj) * width + (i + di)) * 4
            data[idx] = r
            data[idx + 1] = g
            data[idx + 2] = b
          }
        }
      }
    }
    
    ctx.putImageData(imageData, x, y)
  })
}

export const downloadImage = (canvas, filename = 'anonimitzat.png') => {
  const link = document.createElement('a')
  link.href = canvas.toDataURL('image/png')
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const copyToClipboard = async (canvas) => {
  try {
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ])
    return true
  } catch (err) {
    console.error('Error copying to clipboard:', err)
    return false
  }
}
