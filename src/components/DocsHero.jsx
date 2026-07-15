import { useEffect, useState } from 'react'
import '../App.css'

const docs = [
  { id: '01_inicio_huegeo', file: '01_inicio_huegeo', title: 'Inicio', image: 'inicio_servidor.png' },
  { id: '02_licencias_huegeo.md', file: '02_licencias_huegeo.md', title: 'Licencias', image: '02_licencias.png' },
  { id: '03_instalacion_huegeo.md', file: '03_instalacion_huegeo.md', title: 'Instalación', image: '03_apt_upgrade.png.png' },
  { id: '04_permisos_huegeo.md', file: '04_permisos_huegeo.md', title: 'Permisos', image: '04_permisos_especiales.png.png' },
  { id: '05_paquetes_huegeo.md', file: '05_paquetes_huegeo.md', title: 'Paquetes', image: '05_apt_install.png.png' },
  { id: '06_nginx_huegeo.md', file: '06_nginx_huegeo.md', title: 'NGINX', image: '06_nginx_test.png' },
  { id: '07_prompts_huegeo.md', file: '07_prompts_huegeo.md', title: 'Prompts', image: 'captura_07.png' },
]

export default function DocsHero() {
  const [selected, setSelected] = useState(docs[0])
  const [content, setContent] = useState('')

  useEffect(() => {
    const path = `/docs_huegeo/${selected.file}`
    fetch(path)
      .then((r) => {
        if (!r.ok) throw new Error('No se pudo cargar')
        return r.text()
      })
      .then((txt) => {
        const cleaned = txt.replace(/\r/g, '')
        const excerpt = cleaned.slice(0, 700)
        setContent(excerpt + (cleaned.length > 700 ? '…' : ''))
      })
      .catch(() => setContent('No se pudo cargar el documento.'))
  }, [selected])

  return (
    <div className="docs-hero glass-container">
      <aside className="docs-list glass">
        <h3>Secciones</h3>
        <ul>
          {docs.map((d) => (
            <li key={d.id}>
              <button className={d.id === selected.id ? 'active' : ''} onClick={() => setSelected(d)}>
                {d.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="docs-content glass">
        <header className="hero-header">
          <div className="hero-text">
            <h1>{selected.title}</h1>
            <div className="doc-actions">
              <a className="view-btn" href={`/docs_huegeo/${selected.file}`} target="_blank" rel="noreferrer">Ver documento</a>
            </div>
          </div>
          <img src={`/img_huegeo/${selected.image}`} alt={selected.title} />
        </header>

        <section className="doc-body">
          <pre>{content}</pre>
        </section>
      </main>
    </div>
  )
}
