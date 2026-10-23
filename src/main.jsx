import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import Placeholder from './pages/Placeholder'
import { flatRoutes } from './data/nav'
import { pages } from './pages'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          {flatRoutes().map((r) => {
            const Page = pages[r.path]
            return <Route key={r.path} path={r.path} element={Page ? <Page /> : <Placeholder route={r} />} />
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
