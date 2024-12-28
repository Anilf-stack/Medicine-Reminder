import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonSpinner,
  IonCardTitle,
  IonButtons,
} from '@ionic/react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import API from '../services/api';

interface Log {
  id: number;
  user_id: number;
  medicine_id: number;
  status: string;
  timestamp: string;
}

const SuperAdminDashboard: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [date, setDate] = useState('');
  const history = useHistory(); 

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (userId) params.userId = userId;
      if (date) params.date = date;

      const response = await API.get('/logs', { params });
      if (response.data.logs) {
        setLogs(response.data.logs);
      } else {
        setLogs([]);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
      alert('Failed to fetch logs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Implement logout logic here, e.g., clearing user session
    alert('Logout successful!');
    // Navigate to the login page
    history.push('/login');
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Super Admin Dashboard</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={handleLogout}
              style={{
                color: 'white',
                backgroundColor: 'red',
                borderRadius: '5px',
                padding: '5px 15px',
              }}
            >
              Logout
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={{ backgroundColor: '#f4f7fc' }}>
        {/* Filter Section */}
        <div style={{ marginBottom: '20px' }}>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Filter Logs</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonInput
                placeholder="User ID"
                value={userId}
                onIonChange={(e) => setUserId(e.detail.value!)}
                style={{ marginBottom: '15px' }}
                clearInput
              />
              <IonInput
                placeholder="Date (YYYY-MM-DD)"
                type="date"
                value={date}
                onIonChange={(e) => setDate(e.detail.value!)}
                style={{ marginBottom: '15px' }}
              />
              <IonButton expand="block" onClick={fetchLogs} color="secondary">
                Filter Logs
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <>
            {/* Logs Section */}
            {logs.length > 0 ? (
              <IonList>
                {logs.map((log) => (
                  <IonCard key={log.id} style={{ marginBottom: '20px' }}>
                    <IonCardHeader>
                      <IonCardTitle>Log ID: {log.id}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonItem lines="none">
                        <IonLabel>
                          <h3>Medicine ID</h3>
                          <p style={{ fontSize: '18px', color: '#0078d4' }}>{log.medicine_id}</p>
                        </IonLabel>
                      </IonItem>
                      <IonItem lines="none">
                        <IonLabel>
                          <h3>Status</h3>
                          <p
                            style={{
                              fontSize: '18px',
                              color: log.status === 'Acknowledged' ? '#28a745' : '#dc3545',
                            }}
                          >
                            {log.status}
                          </p>
                        </IonLabel>
                      </IonItem>
                      <IonItem lines="none">
                        <IonLabel>
                          <h3>Timestamp</h3>
                          <p style={{ fontSize: '18px', color: '#6c757d' }}>
                            {new Date(log.timestamp).toLocaleString()}
                          </p>
                        </IonLabel>
                      </IonItem>
                    </IonCardContent>
                  </IonCard>
                ))}
              </IonList>
            ) : (
              <p style={{ textAlign: 'center', marginTop: '20px' }}>No logs found.</p>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SuperAdminDashboard;
