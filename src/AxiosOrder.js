import React from 'react';
import axios from 'axios';

const instance=axios.create({

    baseURL: 'https://react-burger-builder-8938f-default-rtdb.firebaseio.com/'
});

export default instance ;