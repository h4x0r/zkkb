import React from 'react'
import ReactDOM from 'react-dom/client'
import '../../index.css'

function SidepanelApp() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Chatham Sidepanel</h1>
      <p className="text-muted-foreground">Extension setup complete</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('sidepanel-root')!).render(
  <React.StrictMode>
    <SidepanelApp />
  </React.StrictMode>
)
