const el = (id) => document.getElementById(id)
const err = el('error')
const msg = el('msg')

const eventConfig = {
    deca: [
        { id: 'deca100m', label: '100m (s)', min: 5, max: 20, step: '0.01' },
        { id: 'deca110mHurdles', label: '110m hurdles (s)', min: 10, max: 30, step: '0.01' },
        { id: 'deca400m', label: '400m (s)', min: 20, max: 100, step: '0.01' },
        { id: 'deca1500m', label: '1500m (s)', min: 150, max: 400, step: '0.01' },
        { id: 'decaDiscus', label: 'Discus (m)', min: 0, max: 85, step: '0.01' },
        { id: 'decaHighJump', label: 'High jump (cm)', min: 0, max: 300, step: '0.01' },
        { id: 'decaJavelin', label: 'Javelin (m)', min: 0, max: 110, step: '0.01' },
        { id: 'decaLongJump', label: 'Long jump (cm)', min: 0, max: 1000, step: '1', integerOnly: true },
        { id: 'decaPoleVault', label: 'Pole vault (cm)', min: 0, max: 1000, step: '0.01' },
        { id: 'decaShotPut', label: 'Shot put (m)', min: 0, max: 30, step: '0.01' }
    ],
    hep: [
        { id: 'hep100mHurdles', label: '100m hurdles (s)', min: 10, max: 30, step: '0.01' },
        { id: 'hep200m', label: '200m (s)', min: 20, max: 100, step: '0.01' },
        { id: 'hep800m', label: '800m (s)', min: 70, max: 250, step: '0.01' },
        { id: 'hepHighJump', label: 'High jump (cm)', min: 0, max: 300, step: '0.01' },
        { id: 'hepJavelin', label: 'Javelin (m)', min: 0, max: 110, step: '0.01' },
        { id: 'hepLongJump', label: 'Long jump (cm)', min: 0, max: 1000, step: '1', integerOnly: true },
        { id: 'hepShotPut', label: 'Shot put (m)', min: 0, max: 30, step: '0.01' }
    ]
}

function currentMode() {
    return document.querySelector('input[name="mode"]:checked').value
}

function setError(t) {
    err.textContent = t
    msg.textContent = ''
}

function setMsg(t) {
    msg.textContent = t
    err.textContent = ''
}

function validateCompetitorName(name) {
    if (!name) {
        return 'You must fill in all required fields.'
    }
    if (name.length > 50) {
        return 'Competitor name must be 50 characters or fewer.'
    }
    if (!/^[\p{L} ]+$/u.test(name)) {
        return 'Competitor name may only contain letters and spaces. Example: Anna Andersson.'
    }
    return ''
}

function buildEventOptions() {
    const mode = currentMode()
    const select = el('event')
    select.innerHTML = eventConfig[mode]
        .map(e => `<option value="${e.id}">${escapeHtml(e.label)}</option>`)
        .join('')
    updateRawInputStep()
}

function updateRawInputStep() {
    const mode = currentMode()
    const eventId = el('event').value
    const config = eventConfig[mode].find(e => e.id === eventId)
    el('raw').step = config ? config.step : '0.01'
}

function buildStandingsHead() {
    const mode = currentMode()
    const headers = ['Position', 'Name', ...eventConfig[mode].map(e => e.label), 'Total']
    el('standingsHead').innerHTML = headers.map(h => `<th>${escapeHtml(h)}</th>`).join('')
}

document.querySelectorAll('input[name="mode"]').forEach(radio => {
    radio.addEventListener('change', async () => {
        buildEventOptions()
        buildStandingsHead()
        await renderStandings()
    })
})

el('event').addEventListener('change', updateRawInputStep)

el('add').addEventListener('click', async () => {
    const name = el('name').value.trim()
    const nameError = validateCompetitorName(name)

    if (nameError) {
        setError(nameError)
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
    const mode = currentMode()

    const nameError = validateCompetitorName(name)
    if (nameError && name !== '') {
        setError(nameError)
        return
    }

    if (!name || !event || rawValue === '') {
        setError('You must fill in all required fields.')
        return
    }

    if (!/^-?\d+(\.\d+)?$/.test(rawValue.trim())) {
        setError('Result must be a number. Example: 12.34 or 250.')
        return
    }

    const raw = Number(rawValue)
    const config = eventConfig[mode].find(e => e.id === event)

    if (config?.integerOnly && !Number.isInteger(raw)) {
        setError('Long jump must be entered in centimeters as a whole number. Example: 523.')
        return
    }

    if (config && raw < config.min) {
        setError(`Too low. Valid range for ${config.label} is ${config.min} to ${config.max}.`)
        return
    }

    if (config && raw > config.max) {
        setError(`Too high. Valid range for ${config.label} is ${config.min} to ${config.max}.`)
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
        const mode = currentMode()
        const activeEvents = eventConfig[mode]

        const rows = data
            .sort((a, b) => (b.total || 0) - (a.total || 0))
            .map((r, index) => `
<tr>
    <td>${index + 1}</td>
    <td>${escapeHtml(r.name)}</td>
    ${activeEvents.map(e => `<td>${r.scores?.[e.id] ?? ''}</td>`).join('')}
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

buildEventOptions()
buildStandingsHead()
renderStandings()