import { Routes, Route, Navigate } from 'react-router-dom'
import { PublicRoute } from './components/PublicRoute'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Layout } from './components/Layout'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { UsersPage } from './pages/UsersPage'

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<ErrorBoundary><Layout /></ErrorBoundary>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
