import React, { useState, useEffect, useMemo } from 'react'
import Home from './01 - Dashboard/Home'
import { MemberDetails } from './03 - People Page/MembersDetail'
import { Settings } from './05 - Post Settings/Settings'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MemberContext } from './MemberContext'
import PersistentDrawerLeft from './00 - Features/Navbar'
import { DataSources } from './04 - Data Sources/DataSources'
import IndividualMember from './03 - People Page/InvidualMember'
import ForgotPass from './00 - Features/ForgotPass'
import ChangePass from './00 - Features/ChangePass'
import SignIn from './06 - Sign-In Page/SignIn'
import SignUp from './06 - Sign-In Page/SignUp'
import { useCookies } from 'react-cookie'
import { Footer } from './00 - Features/Footer'
import { Weather } from './02 - Weather Page/Weather'
import { Calendar } from './01 - Dashboard/Calendar'
import { ThemeProvider, createTheme } from '@mui/material/'
import CssBaseline from '@mui/material/CssBaseline'
//import { Navbar2 } from './Components/Navbar2';

const App = () => {
  const [data, setData] = useState([])
  const [member, setMember] = useState([])
  const [usersArray, setUsersArray] = useState([])
  const [triggerFetch, setTriggerFetch] = useState(false)
  const [toggleAlert, setToggleAlert] = useState(false) //for alerts
  const [allWeapons, setAllWeapons] = useState([])
  const [allFlights, setAllFlights] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies([
    'auth',
    'user',
    'color_mode'
  ])
  const [userAccount, setUserAccount] = useState(null)
  const [page, setPage] = useState(0)
  const [darkMode, setDarkMode] = useState('light')
  const [rows, setRows] = useState([])

  //const MemberContext = React.createContext();
  // const API = 'https://api.cyberhelm.com';
  // const authDomain = 'cyberhelm.com';
  // const userDomain = 'cyberhelm.com';
  const API = 'http://localhost:8080'
  const authDomain = 'localhost'
  const userDomain = 'localhost'

  useMemo(() => {
    if (cookies.user) {
      setUserAccount(cookies.user)
    }
    if (cookies.color_mode) {
      setDarkMode(cookies.color_mode)
    }
  }, [cookies])

  useEffect(() => {
    fetch(`${API}/users`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err))
  }, [API, triggerFetch, userAccount])

  useEffect(() => {
    fetch(`${API}/allweapons`, {
      method: 'GET',
      credentials: 'include',
      redirect: 'follow'
    })
      .then(res => res.json())
      .then(data => setAllWeapons(data))
      .catch(err => console.log(err))
  }, [API, userAccount])

  useEffect(() => {
    fetch(`${API}/flight`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setAllFlights(data))
      .catch(err => console.log(err))
  }, [API, userAccount])

  const theme = createTheme({
    palette: {
      primary: {
        main: '#212121'
      },
      secondary: {
        main: '#BD5334'
      },
      info: {
        main: '#6D7AE5',
        light: '#8f95c3'
      },
      background: {
        default: darkMode === 'light' ? '#FAFAFF' : '#303030'
      },
      mode: darkMode
    }
  })

  const obj = {
    data,
    setData,
    member,
    setMember,
    API,
    usersArray,
    setUsersArray,
    triggerFetch,
    setTriggerFetch,
    allWeapons,
    toggleAlert,
    setToggleAlert,
    cookies,
    setCookie,
    removeCookie,
    userAccount,
    setUserAccount,
    allFlights,
    page,
    setPage,
    darkMode,
    setDarkMode,
    authDomain,
    userDomain,
    rows,
    setRows
  }

  return (
    <MemberContext.Provider value={obj}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          {userAccount !== null ? (
            <>
              <PersistentDrawerLeft />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/date/:urlDate' element={<Home />} />
                <Route path='/sfmembers' element={<MemberDetails />} />
                <Route path='/changepass' element={<ChangePass />} />
                <Route
                  path='/sfmembers/:memberId'
                  element={<IndividualMember />}
                />
                {/* <Route path='/login' element={<SignIn />} /> */}
                <Route path='/calendar' element={<Calendar />} />
                <Route path='/weather' element={<Weather />} />
                <Route path='*' element={<Home />} />
                {userAccount.admin ? (
                  <>
                    {/* <Route path='/login' element={<SignIn />} /> */}
                    <Route path='/data' element={<DataSources />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='/changepass/:email' element={<ChangePass />} />
                  </>
                ) : null}
              </Routes>
              <Footer />
            </>
          ) : (
            <Routes>
              <Route path='/login' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/forgot' element={<ForgotPass />} />
              <Route path='*' element={<SignIn />} />
            </Routes>
          )}
        </Router>
      </ThemeProvider>
    </MemberContext.Provider>
  )
}

export default App
