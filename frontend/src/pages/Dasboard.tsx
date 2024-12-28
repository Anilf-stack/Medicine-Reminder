import React from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { addCircleOutline, listOutline, clipboardOutline, logOutOutline } from 'ionicons/icons';
import './Dashboard.css'; 

const Dashboard: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Remove the token from localStorage to log the user out
    localStorage.removeItem('token');
    // Redirect to login or home page
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Patient Dashboard</IonTitle>
          <IonButton
            slot="end"
            onClick={handleLogout}
            color="danger"
            fill="solid"
            className="logout-button" 
          >
            <IonIcon icon={logOutOutline} />
            Logout
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            {/* Add Medicine */}
            <IonCol size="12" sizeMd="4">
              <IonCard
                button
                onClick={() => history.push('/add-medicine')}
                className="dashboard-card"
              >
                <IonCardHeader>
                  <IonCardSubtitle>Add New</IonCardSubtitle>
                  <IonCardTitle>
                    <IonIcon icon={addCircleOutline} size="large" /> Add Medicine
                  </IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>

            {/* View Medicines */}
            <IonCol size="12" sizeMd="4">
              <IonCard
                button
                onClick={() => history.push('/medicine-list')}
                className="dashboard-card"
              >
                <IonCardHeader>
                  <IonCardSubtitle>View All</IonCardSubtitle>
                  <IonCardTitle>
                    <IonIcon icon={listOutline} size="large" /> View Medicines
                  </IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>

            {/* Acknowledgment Logs */}
            <IonCol size="12" sizeMd="4">
              <IonCard
                button
                onClick={() => history.push('/logs')}
                className="dashboard-card"
              >
                <IonCardHeader>
                  <IonCardSubtitle>Track Logs</IonCardSubtitle>
                  <IonCardTitle>
                    <IonIcon icon={clipboardOutline} size="large" /> Acknowledgment Logs
                  </IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
