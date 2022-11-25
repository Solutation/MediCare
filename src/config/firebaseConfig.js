import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyAJyPSpkkF0YXoJ1IILwJwrY4RWsmE-CCk',
    authDomain: 'medicare-d0b4b.firebaseapp.com',
    projectId: 'medicare-d0b4b',
    storageBucket: 'medicare-d0b4b.appspot.com',
    messagingSenderId: '1061200657164',
    appId: '1:1061200657164:web:09284c637e9f79bee6a729'
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
