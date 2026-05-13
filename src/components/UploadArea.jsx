export default function UploadArea({ onDragOver, onDrop, onClick, t }) {
  return (
    <div
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onClick}
      className="border-3 border-dashed border-white border-opacity-40 rounded-3xl p-12 text-center cursor-pointer bg-white bg-opacity-5 hover:bg-opacity-10 hover:border-opacity-60 transition duration-300 backdrop-blur-sm"
    >
      <div className="text-6xl mb-4">📸</div>
      <h2 className="text-2xl font-bold text-white mb-2">{t.uploadImage}</h2>
      <p className="text-indigo-100 mb-2">{t.dragDrop}</p>
      <p className="text-indigo-200 text-sm">{t.orClick}</p>
    </div>
  )
}
