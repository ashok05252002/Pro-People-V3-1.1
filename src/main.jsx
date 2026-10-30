import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import Placeholder from './pages/Placeholder'
import Login from './pages/Login'
import Premium from './pages/Premium'
import { flatRoutes } from './data/nav'
import { pages, extraPages } from './pages'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route index element={<Navigate to="/login" replace />} />
        <Route element={<Layout />}>
          {flatRoutes().map((r) => {
            const Page = pages[r.path]
            return <Route key={r.path} path={r.path} element={Page ? <Page /> : <Placeholder route={r} />} />
          })}
          {Object.entries(extraPages).map(([path, Page]) => <Route key={path} path={path} element={<Page />} />)}
          <Route path="/premium/:key" element={<Premium />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
