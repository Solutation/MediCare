import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import { httpRequest } from '~/utils';

const cookies = new Cookies();

export const ProfileContext = React.createContext();

const ProfileProvider = ({ children }) => {
    const [patientInfoProfile, setPatientInfoProfile] = useState();
    const userInfo = cookies.get('userAccess').split(',');

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            const {
                data: { patientInfo }
            } = await httpRequest.get(`/profile/patient/info/${userInfo[0]}`, { cancelToken: cancelToken.token });
            setPatientInfoProfile(patientInfo);
        };
        fetchAPI();

        return () => {
            cancelToken.cancel();
        };
        //eslint-disable-next-line
    }, []);

    const passValues = { patientInfoProfile, setPatientInfoProfile };

    return (
        <>{patientInfoProfile && <ProfileContext.Provider value={passValues}>{children}</ProfileContext.Provider>}</>
    );
};

export default ProfileProvider;
