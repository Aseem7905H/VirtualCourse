import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function getCurrentUser() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/user/getcurrentuser`, { withCredentials: true });
       dispatch(setUserData(response.data))
      } catch (error) {
        console.error("Error fetching user:", error);
        dispatch(setUserData(null));
      }
    };

    fetchUser();
  }, []);
}

export default getCurrentUser;