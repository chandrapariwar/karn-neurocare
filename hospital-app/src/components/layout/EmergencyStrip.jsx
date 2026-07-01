export default function EmergencyStrip({ onBook }) {
  return (
    <div className="bg-danger px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
      <div>
        <div className="text-white font-semibold text-base">🚑 24/7 Emergency Services Available</div>
        <div className="text-white/80 text-sm mt-0.5">Immediate care for all critical and life-threatening conditions</div>
      </div>
      <div className="text-center">
        <div className="text-white/75 text-xs">Emergency Helpline</div>
        <div className="text-white font-black text-2xl tracking-tight">📞 1800-MED-PLUS</div>
      </div>
      <button onClick={onBook} className="px-6 py-3 bg-white text-danger font-bold rounded-xl hover:bg-red-50 transition-colors text-sm">
        Book Emergency Slot →
      </button>
    </div>
  )
}
