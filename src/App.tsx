import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import AppRoutes from './routes'
import { AuthProvider, useAuth } from '../contexts/AuthContext'

function App() {

  const context = useAuth()

  return <AuthProvider value={ context }>
    <AppRoutes/>
  </AuthProvider>
}

export default App
