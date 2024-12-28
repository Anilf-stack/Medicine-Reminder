import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonHeader, IonToolbar, IonTitle, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Register.css'
import axios from 'axios'; // Importing axios for API requests

const Register: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<string>('patient'); // Default role is patient
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    // History for navigation
    const history = useHistory();

    const handleRegister = async () => {
        setIsLoading(true);
        setErrorMessage(''); // Clear previous error messages

        try {
            // Make API request to register the user
            const response = await axios.post('http://localhost:5000/auth/register', {
                name,
                email,
                password,
                role,
            });

            if (response.status === 201) {
                // Navigate to login page on successful registration
                history.push('/login');
            }
        } catch (error) {
            // Check if the error is an AxiosError
            if (axios.isAxiosError(error)) {
                // Extract and set error message from the Axios response
                setErrorMessage(error.response?.data?.error || 'Registration failed. Please try again.');
            } else {
                // Handle unexpected errors
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <IonPage className="register-page">

            <IonContent className="ion-padding register-container">
                <div className="register-card">
                    
                        <IonToolbar className="custom-toolbar">
                            <IonTitle className="custom-title">Create Account</IonTitle>
                        </IonToolbar>
                   

                    {/* Name Input */}
                    <IonItem className="input-item">
                        <IonLabel position="floating">Full Name</IonLabel>
                        <IonInput
                            value={name}
                            onIonChange={(e) => setName(e.detail.value!)}
                            required
                            className="input-field"
                        />
                    </IonItem>

                    {/* Email Input */}
                    <IonItem className="input-item">
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput
                            type="email"
                            value={email}
                            onIonChange={(e) => setEmail(e.detail.value!)}
                            required
                            className="input-field"
                        />
                    </IonItem>

                    {/* Password Input */}
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

                    {/* Role Dropdown */}
                    <IonItem className="input-item">
                        <IonSelect
                            value={role}
                            onIonChange={(e) => setRole(e.detail.value!)}
                            className="input-field"
                        >
                            <IonSelectOption value="patient">Patient</IonSelectOption>
                            <IonSelectOption value="admin">Admin</IonSelectOption>
                        </IonSelect>
                    </IonItem>

                    {/* Register Button */}
                    <IonButton
                        expand="block"
                        onClick={handleRegister}
                        disabled={isLoading}
                        className="register-button"
                    >
                        {isLoading ? "Registering..." : "Register"}
                    </IonButton>

                    {/* Error Message */}
                    {errorMessage && (
                        <p className="error-message">
                            {errorMessage}
                        </p>
                    )}

                    {/* Redirect to Login */}
                    <p className="login-redirect">
                        Already have an account?{' '}
                        <span
                            onClick={() => history.push('/login')}
                            className="login-link"
                        >
                            Log in
                        </span>
                    </p>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Register;
