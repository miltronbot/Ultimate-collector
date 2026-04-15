import { fieldTrips } from '../data/schoolData'

export default function FieldTrips() {
  return (
    <div>
      <div className="sec">🌍 Field Trips</div>
      <div className="note">
        <span className="ni">🗺️</span>
        <div>
          Explore fun learning spots near Kerrville, TX! Field trips are a great way to see
          what you're learning in action.
        </div>
      </div>

      <div className="g2">
        {fieldTrips.map((trip, i) => (
          <div className="card" key={i}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 40, flexShrink: 0 }}>{trip.emoji}</div>
              <div>
                <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 17, marginBottom: 4 }}>
                  {trip.name}
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)', marginBottom: 6 }}>
                  📍 {trip.location} &bull; {trip.subject}
                </div>
                <div style={{ fontSize: 13, color: 'var(--mid)', lineHeight: 1.6 }}>
                  {trip.desc}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
