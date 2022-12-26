import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import { httpRequest } from '~/utils';

const cookies = new Cookies();

export const ProfileContext = React.createContext();

const ProfileProvider = ({ children }) => {
    const [patientInfoProfile, setPatientInfoProfile] = useState();
    const [avatarResult, setAvatarResult] = useState();
    const userInfo = cookies.get('userAccess').split(',');

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            if (userInfo[5] === 'Bệnh nhân') {
                const {
                    data: { patientInfo }
                } = await httpRequest.get(`/profile/patient/info/${userInfo[0]}`, { cancelToken: cancelToken.token });
                setPatientInfoProfile(patientInfo);
                setAvatarResult(patientInfo.avatar);
            } else {
                const {
                    data: { patientInfo }
                } = await httpRequest.get(`/profile/consultant/info/${userInfo[0]}`, {
                    cancelToken: cancelToken.token
                });
                setPatientInfoProfile(patientInfo);
                setAvatarResult(patientInfo.avatar);
            }
        };
        fetchAPI();

        return () => {
            cancelToken.cancel();
        };
        //eslint-disable-next-line
    }, [avatarResult]);

    const passValues = { patientInfoProfile, setPatientInfoProfile, avatarResult, setAvatarResult };

    return (
        <>{patientInfoProfile && <ProfileContext.Provider value={passValues}>{children}</ProfileContext.Provider>}</>
    );
};

export default ProfileProvider;
