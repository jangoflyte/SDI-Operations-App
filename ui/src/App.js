import React, { useState, useEffect } from 'react';
import Home from './Components/Home.js';
import { MemberDetails } from './Components/MembersDetail.js';
import { Settings } from './Components/Settings.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MemberContext } from './Components/MemberContext.js';
import PersistentDrawerLeft from './Components/Navbar.jsx';
import { DataSources } from './Components/DataSources.js';
import IndividualMember from './Components/InvidualMember.js';
import SignIn from './Components/SignIn.jsx';
// import SignUp from './Components/SignUp';
// import Home from './Components/Home';

const App = () => {
  const [data, setData] = useState([]);
  const [member, setMember] = useState([]);
  const [usersArray, setUsersArray] = useState([]);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [toggle, setToggle] = useState(false); //for alerts
  const [toggler, setToggler] = useState(false); //for alerts
  const [postAlert, setPostAlert] = useState(false);
  const [allWeapons, setAllWeapons] = useState([]);
  const API = 'http://localhost:8080';
  // const API = 'https://api.cyberhelm.com';

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
    toggle,
    setToggle,
    allWeapons,
    toggler,
    setToggler,
    postAlert, 
    setPostAlert
  };

  return (
    <MemberContext.Provider value={obj}>
      <Router>
        <PersistentDrawerLeft />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          {/* <Route path='/signup' element={<SignUp />} /> */}
          <Route path='/data' element={<DataSources />} />
          <Route path='/sfmembers' element={<MemberDetails />} />
          <Route path='/sfmembers/:memberId' element={<IndividualMember />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </Router>
    </MemberContext.Provider>
  );
};

export default App;
