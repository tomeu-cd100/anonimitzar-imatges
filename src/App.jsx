import React, { useState, useRef, useEffect } from 'react'
import { translations } from './translations'
import { pixelateImage, downloadImage, copyToClipboard } from './utils'
import UploadArea from './components/UploadArea'
import Canvas from './components/Canvas'
import Controls from './components/Controls'
import Instructions from './components/Instructions'

export default function App() {
  const [language, setLanguage] = useState('ca')
  const [image, setImage] = useState(null)
  const [boxes, setBoxes] = useState([])        // coordenades d'imatge, no de pantalla
  const [pixelSize, setPixelSize] = useState(15)
  const [copied, setCopied] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [startPos, setStartPos] = useState(null)
  const [currentBox, setCurrentBox] = useState(null)
  const [historyCount, setHistoryCount] = useState(0)

  const canvasRef       = useRef(null)
  const fileInputRef    = useRef(null)
  const scaleRef        = useRef(1)
  const imageRef        = useRef(null)   // HTMLImageElement original (mai modificat)
  const committedRef    = useRef(null)   // Canvas full-res amb pixelats aplicats
  const historyRef      = useRef([])     // snapshots de committedRef per desfer
  const boxesRef        = useRef([])     // mirall síncrон de boxes per a ResizeObserver

  useEffect(() => { imageRef.current = image }, [image])

  const t = translations[language]

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const calcScale = () => {
    if (!canvasRef.current || !imageRef.current) return 1
    const rect = canvasRef.current.parentElement.getBoundingClientRect()
    return Math.min(
      1,
      (rect.width - 32) / imageRef.current.width,
      (window.innerHeight * 0.80) / imageRef.current.height
    )
  }

  // Coordenades del ratolí → espai d'imatge (resolució real)
  const toImageCoords = (clientX, clientY) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const cssScaleX = canvas.width / rect.width
    const cssScaleY = canvas.height / rect.height
    const s = scaleRef.current
    return {
      x: (clientX - rect.left) * cssScaleX / s,
      y: (clientY - rect.top)  * cssScaleY / s,
    }
  }

  // Actualitza boxes de manera síncrona (abans que ResizeObserver pugui llegir boxesRef)
  const setBoxesSync = (newBoxes) => {
    boxesRef.current = newBoxes
    setBoxes(newBoxes)
  }

  // ── Dibuix ──────────────────────────────────────────────────────────────────

  // Dibuixa des del canvas comès (committed) + requadres overlay
  const redrawCanvas = (imageBoxes) => {
    const canvas = canvasRef.current
    const committed = committedRef.current
    if (!canvas || !committed) return
    const s = scaleRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(committed, 0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = '#ff6b6b'
    ctx.lineWidth = 2
    ctx.fillStyle = 'rgba(255, 107, 107, 0.12)'
    imageBoxes.forEach(b => {
      ctx.strokeRect(b.x * s, b.y * s, b.width * s, b.height * s)
      ctx.fillRect(  b.x * s, b.y * s, b.width * s, b.height * s)
    })
  }

  // Redimensiona el canvas de pantalla i torna a dibuixar
  const resizeAndRedraw = (imageBoxes) => {
    const canvas = canvasRef.current
    const img = imageRef.current
    if (!canvas || !img) return
    const s = calcScale()
    scaleRef.current = s
    canvas.width  = img.width  * s
    canvas.height = img.height * s
    redrawCanvas(imageBoxes ?? boxesRef.current)
  }

  // ── Efectes ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!image) return
    // Inicialitza el canvas comès a resolució completa
    const c = document.createElement('canvas')
    c.width = image.width
    c.height = image.height
    c.getContext('2d').drawImage(image, 0, 0)
    committedRef.current = c
    resizeAndRedraw([])
  }, [image]) // eslint-disable-line

  // ResizeObserver: adapta la mida quan canvia el contenidor
  useEffect(() => {
    if (!image || !canvasRef.current) return
    const observer = new ResizeObserver(() => {
      resizeAndRedraw(boxesRef.current)
    })
    observer.observe(canvasRef.current.parentElement)
    return () => observer.disconnect()
  }, [image]) // eslint-disable-line

  // ── Càrrega d'imatge ────────────────────────────────────────────────────────

  const handleImageUpload = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        setBoxesSync([])
        historyRef.current = []
        setHistoryCount(0)
        setImage(img)
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation() }
  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation()
    if (e.dataTransfer.files[0]) handleImageUpload(e.dataTransfer.files[0])
  }

  // ── Events del canvas ───────────────────────────────────────────────────────

  const handleCanvasMouseDown = (e) => {
    if (!image) return
    setIsDrawing(true)
    setStartPos(toImageCoords(e.clientX, e.clientY))
  }

  const handleCanvasMouseMove = (e) => {
    if (!isDrawing || !startPos) return
    const { x, y } = toImageCoords(e.clientX, e.clientY)
    const box = {
      x:      Math.min(startPos.x, x),
      y:      Math.min(startPos.y, y),
      width:  Math.abs(x - startPos.x),
      height: Math.abs(y - startPos.y),
    }
    setCurrentBox(box)
    redrawCanvas([...boxesRef.current, box])
  }

  const handleCanvasMouseUp = () => {
    const minPx = 5 / scaleRef.current
    let finalBoxes = boxesRef.current
    if (isDrawing && currentBox && currentBox.width > minPx && currentBox.height > minPx) {
      finalBoxes = [...boxesRef.current, currentBox]
      setBoxesSync(finalBoxes)
    }
    setIsDrawing(false)
    setStartPos(null)
    setCurrentBox(null)
    redrawCanvas(finalBoxes)
  }

  // ── Accions ─────────────────────────────────────────────────────────────────

  const handleApply = () => {
    if (boxes.length === 0) return
    const img = imageRef.current

    // Guardar estat actual a l'historial
    historyRef.current.push(committedRef.current.toDataURL())
    setHistoryCount(historyRef.current.length)

    // Crear nou canvas comès = anterior + pixelació aplicada
    const newCommitted = document.createElement('canvas')
    newCommitted.width  = img.width
    newCommitted.height = img.height
    newCommitted.getContext('2d').drawImage(committedRef.current, 0, 0)
    pixelateImage(newCommitted, boxes, pixelSize) // boxes en coords d'imatge ✓
    committedRef.current = newCommitted

    // Actualitzar pantalla
    redrawCanvas([])
    setBoxesSync([])
  }

  const handleUndo = () => {
    if (boxes.length > 0) {
      const newBoxes = boxes.slice(0, -1)
      setBoxesSync(newBoxes)
      redrawCanvas(newBoxes)
    } else if (historyRef.current.length > 0) {
      const snapshot = historyRef.current.pop()
      setHistoryCount(historyRef.current.length)
      const img = new Image()
      img.onload = () => {
        const c = document.createElement('canvas')
        c.width  = imageRef.current.width
        c.height = imageRef.current.height
        c.getContext('2d').drawImage(img, 0, 0)
        committedRef.current = c
        redrawCanvas([])
      }
      img.src = snapshot
    }
  }

  // Descarrega a resolució completa des del canvas comès
  const handleDownload = () =>
    downloadImage(committedRef.current, `anonimitzat-${Date.now()}.png`)

  const handleCopy = async () => {
    const ok = await copyToClipboard(committedRef.current)
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2000) }
  }

  const handleClear = () => {
    if (!confirm(t.clear + '?')) return
    committedRef.current = null
    historyRef.current = []
    setHistoryCount(0)
    setBoxesSync([])
    setIsDrawing(false)
    setStartPos(null)
    setCurrentBox(null)
    setImage(null)
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-3 md:p-5">
      <div className="max-w-screen-2xl mx-auto">

        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-1 font-display">{t.title}</h1>
            <p className="text-indigo-100">{t.subtitle}</p>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-2 bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded-lg font-semibold hover:bg-opacity-30 transition backdrop-blur"
          >
            <option value="ca" className="text-gray-900">Català</option>
            <option value="es" className="text-gray-900">Español</option>
            <option value="en" className="text-gray-900">English</option>
          </select>
        </div>

        {!image ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <UploadArea
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                t={t}
              />
            </div>
            <div className="space-y-6">
              <Instructions t={t} />
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span className="text-2xl">🔒</span> Privacy
                </h3>
                <p className="text-indigo-100 text-sm leading-relaxed">{t.privacy}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <Canvas
              canvasRef={canvasRef}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
            />
            <Controls
              pixelSize={pixelSize}
              onPixelSizeChange={setPixelSize}
              onApply={handleApply}
              onDownload={handleDownload}
              onCopy={handleCopy}
              onClear={handleClear}
              onUndo={handleUndo}
              boxCount={boxes.length}
              historyCount={historyCount}
              copied={copied}
              t={t}
            />
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) handleImageUpload(e.target.files[0])
            e.target.value = ''
          }}
          className="hidden"
        />
      </div>
    </div>
  )
}
