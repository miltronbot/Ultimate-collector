import { badges } from '../data/schoolData'

export default function Badges() {
  const earnedCount = badges.filter(b => b.earned).length

  return (
    <div>
      <div className="sec">🏆 Badges & Achievements</div>
      <div className="note">
        <span className="ni">🌟</span>
        <div>
          Earn badges by reaching milestones! You've earned <strong>{earnedCount} of {badges.length}</strong> badges so far. Keep going!
        </div>
      </div>

      <div className="g2" style={{ marginBottom: 20 }}>
        <div className="stat sy">
          <div className="lbl">Badges Earned</div>
          <div className="val">{earnedCount}</div>
          <div className="sub">of {badges.length} total</div>
        </div>
        <div className="stat sb">
          <div className="lbl">Remaining</div>
          <div className="val">{badges.length - earnedCount}</div>
          <div className="sub">keep learning!</div>
        </div>
      </div>

      <div className="sec-sm">Earned Badges</div>
      <div className="badge-grid" style={{ marginBottom: 24 }}>
        {badges.filter(b => b.earned).map(badge => (
          <div className="badge-card earned" key={badge.id}>
            <div className="badge-emoji">{badge.emoji}</div>
            <div className="badge-name">{badge.name}</div>
            <div className="badge-desc">{badge.desc}</div>
          </div>
        ))}
      </div>

      <div className="sec-sm">Locked Badges</div>
      <div className="badge-grid">
        {badges.filter(b => !b.earned).map(badge => (
          <div className="badge-card locked" key={badge.id}>
            <div className="badge-emoji">🔒</div>
            <div className="badge-name">{badge.name}</div>
            <div className="badge-desc">{badge.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
