import React, { useState, useEffect, useMemo } from 'react';
import Home from './Components/Home.js';
import { MemberDetails } from './Components/MembersDetail.js';
import { Settings } from './Components/Settings.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MemberContext } from './Components/MemberContext.js';
import PersistentDrawerLeft from './Components/Navbar.jsx';
import { DataSources } from './Components/DataSources.js';
import IndividualMember from './Components/InvidualMember.js';
import SignIn from './Components/SignIn.jsx';
import SignUp from './Components/SignUp';
import { useCookies } from 'react-cookie';
import { Footer } from './Components/Footer.jsx';

const App = () => {
  const [data, setData] = useState([]);
  const [member, setMember] = useState([]);
  const [usersArray, setUsersArray] = useState([]);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [toggleAlert, setToggleAlert] = useState(false); //for alerts
  const [allWeapons, setAllWeapons] = useState([]);
  const [allFlights, setAllFlights] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['auth', 'user']);
  const [userAccount, setUserAccount] = useState(null);

  const API = 'http://localhost:8080';
  // const API = 'https://api.cyberhelm.com';

  useMemo(() => {
    if (cookies.user) {
      setUserAccount(cookies.user);
      // console.log('cookies ', cookies);
    }
  }, [cookies]);

  useEffect(() => {
    fetch(`${API}/users`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, [API, triggerFetch]);

  useEffect(() => {
    fetch(`${API}/allweapons`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => setAllWeapons(data))
      .catch(err => console.log(err));
  }, [API]);

  useEffect(() => {
    fetch(`${API}/flight`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => setAllFlights(data))
      .catch(err => console.log(err));
  }, [API]);

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
  };

  return (
    <MemberContext.Provider value={obj}>
      <Router>
        {userAccount !== null ? (
          <>
            <PersistentDrawerLeft />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/data' element={<DataSources />} />
              <Route path='/sfmembers' element={<MemberDetails />} />
              <Route
                path='/sfmembers/:memberId'
                element={<IndividualMember />}
              />
              <Route path='/settings' element={<Settings />} />
              <Route path='*' element={<Home />} />
            </Routes>
            <Footer />
          </>
        ) : (
          <Routes>
            <Route path='/login' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='*' element={<SignIn />} />
          </Routes>
        )}
      </Router>
    </MemberContext.Provider>
  );
};

export default App;
