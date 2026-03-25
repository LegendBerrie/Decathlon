const el = (id) => document.getElementById(id)
const err = el('error')
const msg = el('msg')

const limits = {
    deca100m: { min: 5, max: 20 },
    deca110mHurdles: { min: 10, max: 30 },
    deca400m: { min: 20, max: 100 },
    deca1500m: { min: 150, max: 400 },
    decaDiscus: { min: 0, max: 85 },
    decaHighJump: { min: 0, max: 300 },
    decaJavelin: { min: 0, max: 110 },
    decaLongJump: { min: 0, max: 1000 },
    decaPoleVault: { min: 0, max: 1000 },
    decaShotPut: { min: 0, max: 30 },

    hep100mHurdles: { min: 10, max: 30 },
    hep200m: { min: 20, max: 100 },
    hep800m: { min: 70, max: 250 },
    hepHighJump: { min: 0, max: 300 },
    hepJavelin: { min: 0, max: 110 },
    hepLongJump: { min: 0, max: 1000 },
    hepShotPut: { min: 0, max: 30 }
}

function setError(t) {
    err.textContent = t
    msg.textContent = ""
}

function setMsg(t) {
    msg.textContent = t
    err.textContent = ""
}

function updateRawInputStep() {
    const event = el('event').value
    if (event === 'decaLongJump' || event === 'hepLongJump') {
        el('raw').step = '1'
    } else {
        el('raw').step = '0.01'
    }
}

el('event').addEventListener('change', updateRawInputStep)
updateRawInputStep()

el('add').addEventListener('click', async () => {
    const name = el('name').value.trim()

    if (!name) {
        setError('You must fill in all required fields.')
        return
    }

    try {
        const res = await fetch('/api/competitors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        })

        if (!res.ok) {
            const t = await res.text()
            setError(t || 'Failed to add competitor')
            return
        }

        setMsg('Added')
        await renderStandings()
    } catch (e) {
        setError('Could not load standings')
    }
})

el('save').addEventListener('click', async () => {
    const name = el('name2').value.trim()
    const event = el('event').value
    const rawValue = el('raw').value

    if (!name || !event || rawValue === '') {
        setError('You must fill in all required fields.')
        return
    }

    const raw = Number(rawValue)

    if (Number.isNaN(raw)) {
        setError('You must fill in all required fields.')
        return
    }

    if ((event === 'decaLongJump' || event === 'hepLongJump') && !Number.isInteger(raw)) {
        setError('Long jump must be entered in centimeters.')
        return
    }

    const limit = limits[event]

    if (limit && raw < limit.min) {
        setError('Too low')
        return
    }

    if (limit && raw > limit.max) {
        setError('Too high')
        return
    }

    try {
        const res = await fetch('/api/score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, event, raw })
        })

        if (!res.ok) {
            const t = await res.text()
            setError(t || 'Score failed')
            return
        }

        const json = await res.json()
        setMsg(`Saved: ${json.points} pts`)
        await renderStandings()
    } catch (e) {
        setError('Score failed')
    }
})

el('export').addEventListener('click', async () => {
    try {
        const res = await fetch('/api/export.csv')
        const text = await res.text()
        const blob = new Blob([text], { type: 'text/csv;charset=utf-8' })
        const a = document.createElement('a')
        const disposition = res.headers.get('Content-Disposition')

        let filename = 'results.csv'
        if (disposition && disposition.includes('filename=')) {
            filename = disposition.split('filename=')[1]
        }

        a.href = URL.createObjectURL(blob)
        a.download = filename
        a.click()
    } catch (e) {
        setError('Export failed')
    }
})

async function renderStandings() {
    try {
        const res = await fetch('/api/standings')
        const data = await res.json()

        const rows = data
            .sort((a, b) => (b.total || 0) - (a.total || 0))
            .map(r => `
<tr>
    <td>${escapeHtml(r.name)}</td>
    <td>${r.scores?.["deca100m"] ?? ''}</td>
    <td>${r.scores?.["deca110mHurdles"] ?? ''}</td>
    <td>${r.scores?.["deca400m"] ?? ''}</td>
    <td>${r.scores?.["deca1500m"] ?? ''}</td>
    <td>${r.scores?.["decaDiscus"] ?? ''}</td>
    <td>${r.scores?.["decaHighJump"] ?? ''}</td>
    <td>${r.scores?.["decaJavelin"] ?? ''}</td>
    <td>${r.scores?.["decaLongJump"] ?? ''}</td>
    <td>${r.scores?.["decaPoleVault"] ?? ''}</td>
    <td>${r.scores?.["decaShotPut"] ?? ''}</td>
    <td>${r.scores?.["hep100mHurdles"] ?? ''}</td>
    <td>${r.scores?.["hep200m"] ?? ''}</td>
    <td>${r.scores?.["hep800m"] ?? ''}</td>
    <td>${r.scores?.["hepHighJump"] ?? ''}</td>
    <td>${r.scores?.["hepJavelin"] ?? ''}</td>
    <td>${r.scores?.["hepLongJump"] ?? ''}</td>
    <td>${r.scores?.["hepShotPut"] ?? ''}</td>
    <td>${r.total ?? 0}</td>
</tr>
`).join('')

        el('standings').innerHTML = rows
    } catch (e) {
        setError('Could not load standings')
    }
}

function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
}

renderStandings()