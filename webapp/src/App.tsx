import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MessagePanel from './components/MessagePanel';
import ProtectedRoute from './components/ProtectedRoute';
import './css/App.css';
import './css/Message.css';
import Budgets from './pages/Budgets';
import Expenses from './pages/Expenses';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import { colorSchemeType, lightColorScheme } from './utilities/themeUtil';

function App() {

  return (
    <main className="App" style={mapGlobalTheme(lightColorScheme) as React.CSSProperties}>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={
            <ProtectedRoute route={'/'} redirectRoute={'/login'}>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/home' element={
            <ProtectedRoute route={'/'} redirectRoute={'/login'}>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/profile' element={
            <ProtectedRoute route={'/'} redirectRoute={'/login'}>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path='/budgets' element={
            <ProtectedRoute route={'/'} redirectRoute={'/login'}>
              <Budgets />
            </ProtectedRoute>
          } />
          <Route path='/expenses' element={
            <ProtectedRoute route={'/'} redirectRoute={'/login'}>
              <Expenses />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
      <MessagePanel />
    </main>
  );
}

function mapGlobalTheme(theme: colorSchemeType) {
  return {
    '--err-bg': theme.message.errBg,
    '--err-font': theme.message.errFont,
    '--warn-bg': theme.message.warnBg,
    '--warn-font': theme.message.warnFont,
    '--suc-bg': theme.message.sucBg,
    '--suc-font': theme.message.sucFont,
    '--pr-col': theme.ui.primary,
    '--sec-col': theme.ui.secondary,
    '--bg-col': theme.ui.background,
    '--bg-col-rgb': theme.ui.backgroundRGB,
    '--font-pr': theme.ui.fontPrimary,
    '--font-sec': theme.ui.fontSecondary,
    '--font-pr-lt': theme.ui.fontPrimaryLight,
    '--link-col': theme.ui.link,
    '--shadow-col': theme.ui.shadow,
  }
}

export default App;
