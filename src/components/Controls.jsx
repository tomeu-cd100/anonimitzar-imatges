export default function Controls({
  pixelSize,
  onPixelSizeChange,
  onApply,
  onDownload,
  onCopy,
  onClear,
  onUndo,
  boxCount,
  historyCount,
  copied,
  t
}) {
  const canUndo = boxCount > 0 || historyCount > 0

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-4 border border-white border-opacity-20">
      <div className="flex flex-wrap items-center gap-3">

        {/* Slider de mida de píxel */}
        <div className="flex items-center gap-3 flex-1 min-w-48">
          <label className="text-white text-sm font-semibold whitespace-nowrap">
            {t.pixelSize}: <span className="text-pink-300">{pixelSize}px</span>
          </label>
          <input
            type="range"
            min="5"
            max="50"
            value={pixelSize}
            onChange={(e) => onPixelSizeChange(Number(e.target.value))}
            className="flex-1 h-2 bg-white bg-opacity-20 rounded-lg appearance-none cursor-pointer accent-pink-400"
          />
        </div>

        {/* Separador vertical */}
        <div className="hidden md:block w-px h-8 bg-white bg-opacity-20" />

        {/* Aplicar */}
        <button
          onClick={onApply}
          disabled={boxCount === 0}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:from-gray-500 disabled:to-gray-600 disabled:opacity-40 text-white font-bold py-2 px-5 rounded-xl transition transform hover:scale-105 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
        >
          ✨ {t.apply}
          {boxCount > 0 && (
            <span className="bg-white bg-opacity-25 text-xs font-bold px-1.5 py-0.5 rounded-full">
              {boxCount}
            </span>
          )}
        </button>

        {/* Desfer */}
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-500 disabled:to-gray-600 disabled:opacity-40 text-white font-bold py-2 px-4 rounded-xl transition transform hover:scale-105 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-1"
        >
          ↶ {t.undo}
          {historyCount > 0 && boxCount === 0 && (
            <span className="text-xs opacity-75">({historyCount})</span>
          )}
        </button>

        {/* Separador vertical */}
        <div className="hidden md:block w-px h-8 bg-white bg-opacity-20" />

        {/* Descarregar */}
        <button
          onClick={onDownload}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-2 px-4 rounded-xl transition transform hover:scale-105"
        >
          ⬇️ PNG
        </button>

        {/* Copiar */}
        <button
          onClick={onCopy}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-xl transition transform hover:scale-105"
        >
          {copied ? '✅' : '📋'} {copied ? t.copied : t.copy}
        </button>

        {/* Esborrar tot */}
        <button
          onClick={onClear}
          className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold py-2 px-4 rounded-xl transition transform hover:scale-105"
        >
          🗑️ {t.clear}
        </button>

      </div>
    </div>
  )
}
