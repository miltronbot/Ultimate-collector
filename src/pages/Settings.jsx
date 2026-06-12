import { useState, useRef } from 'react'
import { getSettings, saveData, loadData, SETTINGS_KEY, DEFAULT_SETTINGS, ALL_DATA_KEYS, localDateKey } from '../data/config'
import { gradeOptions } from '../data/grades'

export default function Settings() {
  const [form, setForm] = useState(getSettings)
  const [saved, setSaved] = useState(false)
  const [importMsg, setImportMsg] = useState(null)
  const importRef = useRef(null)

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  const save = () => {
    saveData(SETTINGS_KEY, { ...form, weeklyHours: Number(form.weeklyHours) || DEFAULT_SETTINGS.weeklyHours })
    setSaved(true)
    // Config constants are read at load time, so refresh to apply everywhere
    setTimeout(() => window.location.reload(), 600)
  }

  const exportData = () => {
    const backup = { exportedAt: new Date().toISOString(), app: 'savannah-homeschool-dashboard', version: 2 }
    for (const key of ALL_DATA_KEYS) {
      backup[key] = loadData(key, null)
    }
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `homeschool-backup-${localDateKey()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importData = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result)
        if (data.app !== 'savannah-homeschool-dashboard') {
          setImportMsg({ ok: false, text: 'That file is not a dashboard backup.' })
          return
        }
        let restored = 0
        for (const key of ALL_DATA_KEYS) {
          if (data[key] !== null && data[key] !== undefined) {
            saveData(key, data[key])
            restored++
          }
        }
        setImportMsg({ ok: true, text: `Restored ${restored} data sets. Reloading...` })
        setTimeout(() => window.location.reload(), 1200)
      } catch {
        setImportMsg({ ok: false, text: 'Could not read that file — is it a valid backup?' })
      }
    }
    reader.readAsText(file)
  }

  return (
    <div>
      <div className="sec">⚙️ Settings</div>
      <div className="note">
        <span className="ni">🛠️</span>
        <div>
          Customize the dashboard for your student and school year. All data stays on this
          device — use Backup to keep a copy or move to another device.
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="sec-sm">Student Profile</div>
        <div className="g2" style={{ marginBottom: 12 }}>
          <div>
            <label className="form-label" htmlFor="set-name">Student Name</label>
            <input id="set-name" className="form-input" value={form.studentName} onChange={e => update('studentName', e.target.value)} />
          </div>
          <div>
            <label className="form-label" htmlFor="set-grade">Grade Level</label>
            <select id="set-grade" className="form-input" value={form.gradeLevel} onChange={e => update('gradeLevel', e.target.value)}>
              {gradeOptions.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
            </select>
            <div style={{ fontSize: 11, color: 'var(--mid)', marginTop: 4 }}>
              Changes curriculum, TEKS standards, word lists, and game difficulty
            </div>
          </div>
        </div>
        <div className="g2" style={{ marginBottom: 12 }}>
          <div>
            <label className="form-label" htmlFor="set-location">Location</label>
            <input id="set-location" className="form-input" value={form.location} onChange={e => update('location', e.target.value)} />
          </div>
          <div>
            <label className="form-label" htmlFor="set-semester">Semester Label</label>
            <input id="set-semester" className="form-input" value={form.semesterLabel} onChange={e => update('semesterLabel', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="sec-sm">School Year</div>
        <div className="g3" style={{ marginBottom: 12 }}>
          <div>
            <label className="form-label" htmlFor="set-start">Semester Start</label>
            <input id="set-start" className="form-input" type="date" value={form.semesterStart} onChange={e => update('semesterStart', e.target.value)} />
          </div>
          <div>
            <label className="form-label" htmlFor="set-end">Semester End</label>
            <input id="set-end" className="form-input" type="date" value={form.semesterEnd} onChange={e => update('semesterEnd', e.target.value)} />
          </div>
          <div>
            <label className="form-label" htmlFor="set-hours">Weekly Hours Target</label>
            <input id="set-hours" className="form-input" type="number" min="1" max="60" step="0.5" value={form.weeklyHours} onChange={e => update('weeklyHours', e.target.value)} />
          </div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--mid)' }}>
          Texas families commonly target 25.5 hours/week to mirror public school instructional time.
        </div>
      </div>

      <button className="game-btn game-btn-success" onClick={save} style={{ marginBottom: 24 }} aria-label="Save settings">
        {saved ? '✅ Saved! Reloading...' : '💾 Save Settings'}
      </button>

      <div className="card">
        <div className="sec-sm">💾 Backup & Restore</div>
        <div className="note note-blue" style={{ marginBottom: 14 }}>
          <span className="ni">🔒</span>
          <div>
            Your records live only on this device. Download a backup regularly, and use it to
            restore on a new device or after clearing the browser.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="game-btn game-btn-primary" onClick={exportData} style={{ margin: 0 }} aria-label="Download backup file">
            ⬇️ Download Backup
          </button>
          <button className="game-btn game-btn-outline" onClick={() => importRef.current?.click()} style={{ margin: 0 }} aria-label="Restore from backup file">
            ⬆️ Restore from Backup
          </button>
          <input ref={importRef} type="file" accept="application/json,.json" onChange={importData} style={{ display: 'none' }} aria-hidden="true" />
        </div>
        {importMsg && (
          <div style={{ marginTop: 12, fontWeight: 700, fontSize: 14, color: importMsg.ok ? 'var(--green)' : 'var(--red)' }}>
            {importMsg.text}
          </div>
        )}
      </div>
    </div>
  )
}
