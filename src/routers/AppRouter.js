import React, { lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useLocation } from '../Hooks'
const VacunaScreen = lazy(() => import('../screens/VacunaScreen'))
const TrabajadorScreen = lazy(() => import('../screens/TrabajadorScreen'))
const AnimalScreen = lazy(() => import('../screens/AnimalScreen'))
const AspiranteScreen = lazy(() => import('../screens/AspiranteScreen'))
const VisitaScreen = lazy(() => import('../screens/VisitaScreen'))
const SolicitudScreen = lazy(() => import('../screens/SolicitudScreen'))

export const AppRouter = () => {
  const { path } = useLocation()
  return (
    <Router>
      <Routes location={path}>
        <Route path="/vacuna" element={<VacunaScreen />} />
        <Route path="/vacuna/create" element={<VacunaScreen />} />
        <Route path="/trabajador" element={<TrabajadorScreen />} />
        <Route path="/trabajador/create" element={<TrabajadorScreen />} />
        <Route path="/animal" element={<AnimalScreen />} />
        <Route path="/animal/create" element={<AnimalScreen />} />
        <Route path="/aspirante" element={<AspiranteScreen />} />
        <Route path="/aspirante/create" element={<AspiranteScreen />} />
        <Route path="/visita" element={<VisitaScreen />} />
        <Route path="/visita/create" element={<VisitaScreen />} />
        <Route path="/solicitud" element={<SolicitudScreen />} />
        <Route path="/solicitud/create" element={<SolicitudScreen />} />
      </Routes>
    </Router>
  )
}
