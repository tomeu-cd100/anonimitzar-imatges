export default function Instructions({ t }) {
  const steps = [
    t.step1,
    t.step2,
    t.step3,
    t.step4,
    t.step5,
  ]

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
      <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
        <span className="text-2xl">📖</span> {t.instructions}
      </h3>
      <ol className="space-y-3">
        {steps.map((step, idx) => (
          <li key={idx} className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center font-bold text-white text-sm">
              {idx + 1}
            </span>
            <span className="text-indigo-100 text-sm leading-relaxed">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
