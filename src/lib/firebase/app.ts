import { PUBLIC_FIREBASE_API_KEY } from '$env/static/public';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: PUBLIC_FIREBASE_API_KEY,
	authDomain: 'jobfinder-app-cfedf.firebaseapp.com',
	projectId: 'jobfinder-app-cfedf',
	storageBucket: 'jobfinder-app-cfedf.appspot.com',
	messagingSenderId: '292728990857',
	appId: '1:292728990857:web:e11b1d69f2bf199960aa58'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
