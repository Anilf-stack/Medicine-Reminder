import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSpinner,
} from '@ionic/react';
import API from '../services/api';

// Define the type for a log item
interface Log {
  id: number;
  medicine_id: number;
  status: string;
}

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]); // Explicitly set the type for logs
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await API.get<{ logs: Log[] }>('/logs'); // Type response to match API structure
      setLogs(response.data.logs || []);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const logAcknowledgment = async (medicine_id: number, status: string) => { // Explicitly type the parameters
    try {
      const response = await API.post('/logs', { medicine_id, status });
      console.log('Acknowledgment logged successfully:', response.data);
      alert('Acknowledgment logged successfully!');
      fetchLogs(); // Refresh logs after acknowledgment
    } catch (error) {
      console.error('Error logging acknowledgment:', error);
      alert('Failed to log acknowledgment. Please try again.');
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Acknowledgment Logs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <IonSpinner name="crescent" />
          </div>
        ) : logs.length > 0 ? (
          <IonList>
            {logs.map((log) => (
              <IonCard key={log.id}>
                <IonCardHeader>
                  <IonCardTitle>Log ID: {log.id}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem lines="none">
                    <IonLabel>
                      <h3>Medicine ID</h3>
                      <p>{log.medicine_id}</p>
                    </IonLabel>
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel>
                      <h3>Status</h3>
                      <p>{log.status}</p>
                    </IonLabel>
                  </IonItem>
                  <IonButton
                    color="secondary"
                    onClick={() => logAcknowledgment(log.medicine_id, 'Acknowledged')}
                  >
                    Acknowledge Log
                  </IonButton>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>No acknowledgment logs found.</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Logs;
