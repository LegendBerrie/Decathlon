const el = (id) => document.getElementById(id)

const err = el('error')
const msg = el('msg')

function setError(t){
    err.textContent = t
    msg.textContent = ""
}

function setMsg(t){
    msg.textContent = t
    err.textContent = ""
}

el('add').addEventListener('click', async () => {

    const name = el('name').value.trim()

    if(!name){
        setError("You must fill in all required fields.")
        return
    }

    try{

        const res = await fetch('/api/competitors',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name})
        })

        if(!res.ok){
            const t = await res.text()
            setError(t)
        } else{
            setMsg("Added")
        }

        await renderStandings()

    }catch(e){
        setError("Could not load standings")
    }

})

el('save').addEventListener('click', async () => {

    const name = el('name2').value.trim()
    const event = el('event').value
    const raw = parseFloat(el('raw').value)

    if(!name || !event || !raw){
        setError("You must fill in all required fields.")
        return
    }

    try{

        const res = await fetch('/api/score',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name,event,raw})
        })

        if(!res.ok){
            const t = await res.text()
            setError(t)
            return
        }

        const json = await res.json()

        setMsg("Saved: "+json.points+" pts")

        await renderStandings()

    }catch(e){
        setError("Score failed")
    }

})

el('export').addEventListener('click', async () => {

    try{

        const res = await fetch('/api/export.csv')

        const text = await res.text()

        const blob = new Blob([text],{type:'text/csv;charset=utf-8'})

        const a = document.createElement('a')

        const disposition = res.headers.get('Content-Disposition')

        let filename = 'results.csv'

        if(disposition && disposition.includes("filename=")){
            filename = disposition.split("filename=")[1]
        }

        a.href = URL.createObjectURL(blob)

        a.download = filename

        a.click()

    }catch(e){
        setError("Export failed")
    }

})

async function renderStandings(){

    const res = await fetch('/api/standings')

    const data = await res.json()

    const rows = data
        .sort((a,b)=> (b.total||0)-(a.total||0))
        .map(r=>`

<tr>
<td>${r.name}</td>
<td>${r.scores?.["100m"] ?? ''}</td>
<td>${r.scores?.["longJump"] ?? ''}</td>
<td>${r.scores?.["shotPut"] ?? ''}</td>
<td>${r.scores?.["highJump"] ?? ''}</td>
<td>${r.scores?.["400m"] ?? ''}</td>
<td>${r.scores?.["110mH"] ?? ''}</td>
<td>${r.scores?.["discus"] ?? ''}</td>
<td>${r.scores?.["poleVault"] ?? ''}</td>
<td>${r.scores?.["javelin"] ?? ''}</td>
<td>${r.scores?.["1500m"] ?? ''}</td>
<td>${r.total ?? 0}</td>
</tr>

`).join("")

    el('standings').innerHTML = rows

}

renderStandings()