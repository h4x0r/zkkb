import React from 'react'
import ReactDOM from 'react-dom/client'
import '../../index.css'

function FullpageApp() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Chatham</h1>
      <p className="text-muted-foreground">Extension setup complete</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('fullpage-root')!).render(
  <React.StrictMode>
    <FullpageApp />
  </React.StrictMode>
)
