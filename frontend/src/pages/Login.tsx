import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonItem, IonLabel, IonToast, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { person } from 'ionicons/icons'; // User icon import
import { jwtDecode } from 'jwt-decode';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      const token = response.data.token;

      // Save token to localStorage
      localStorage.setItem('token', token);

      // Decode the token to get user role
      const decodedToken: any = jwtDecode(token);
      const userRole = decodedToken.role;

      // Redirect based on user role
      if (userRole === 'patient') {
        history.push('/dashboard');
      } else if (userRole === 'admin') {
        history.push('/admin-dashboard');
      } else {
        setErrorMessage('Unauthorized role. Please contact support.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.error || 'Login failed. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setShowToast(true);
    }
  };

  const navigateToRegister = () => {
    history.push('/register');
  };

  return (
    <IonPage className="centered-page">
      <IonContent className="ion-padding login-container">
        <div className="login-card">
          <h2 className="login-title">
            <IonIcon icon={person} style={{ marginRight: '10px', fontSize: '24px', color: '#3498db' }} />
            Login Here
          </h2>

          <IonItem className="input-item">
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              required
              className="input-field"
            />
          </IonItem>

          <IonItem className="input-item">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              required
              className="input-field"
            />
          </IonItem>

          <IonButton expand="block" onClick={handleLogin} className="login-button">
            Login
          </IonButton>

          <p className="register-redirect">
            Don't have an account?{' '}
            <span
              onClick={() => history.push('/register')}
              className="register-link"
            >
              Register
            </span>
          </p>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={errorMessage || 'Logged in successfully.'}
            duration={2000}
            color={errorMessage ? 'danger' : 'success'}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
