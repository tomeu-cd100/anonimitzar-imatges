export default function Canvas({ canvasRef, onMouseDown, onMouseMove, onMouseUp, onMouseLeave }) {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-3 border border-white border-opacity-20">
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        className="mx-auto rounded-lg cursor-crosshair block"
      />
    </div>
  )
}
