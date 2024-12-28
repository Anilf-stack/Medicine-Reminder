import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonIcon, IonButtons, IonBackButton } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { timeOutline, medicalOutline, medkitOutline } from 'ionicons/icons';
import APIService from '../services/api';

interface Medicine {
  id: number;
  name: string;
  dosage: string;
  schedule_time: string;
}

const AddMedicine: React.FC = () => {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [medicineId, setMedicineId] = useState<number | null>(null);
  const history = useHistory();

  // Retrieve the state passed from MedicineList page
  const location = useLocation<{ medicine?: Medicine }>();  // Type the location state

  useEffect(() => {
    const medicine = location.state?.medicine; // Access passed medicine object
    if (medicine) {
      setName(medicine.name);
      setDosage(medicine.dosage);
      setScheduleTime(medicine.schedule_time);
      setMedicineId(medicine.id);
      setIsEditing(true); // Mark as editing
    }
  }, [location.state]);  // Only run when location.state changes

  const handleSubmit = async () => {
    if (isEditing && medicineId) {
      // If editing, update the medicine
      try {
        await APIService.put(`/medicine/${medicineId}`, {
          name,
          dosage,
          schedule_time: scheduleTime,
        });
        alert('Medicine updated successfully!');
        history.push('/medicine-list'); // Navigate to the medicine list page
      } catch (error) {
        alert('Failed to update medicine: ' + (error instanceof Error ? error.message : 'Unknown error'));
      }
    } else {
      // If adding, create a new medicine
      try {
        await APIService.post('/medicine', { name, dosage, schedule_time: scheduleTime });
        alert('Medicine added successfully!');
      } catch (error) {
        alert('Failed to add medicine: ' + (error instanceof Error ? error.message : 'Unknown error'));
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton onClick={() => history.push('/dashboard')}>Back</IonButton>
          </IonButtons>
          <IonTitle>{isEditing ? 'Edit Medicine' : 'Add Medicine'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={{ backgroundColor: '#f5f5f5' }}>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{isEditing ? 'Edit Medicine Details' : 'Enter Medicine Details'}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {/* Medicine Name */}
            <IonItem>
              <IonIcon icon={medicalOutline} slot="start" />
              <IonLabel position="stacked">Medicine Name</IonLabel>
              <IonInput
                value={name}
                placeholder="Enter medicine name"
                onIonChange={(e) => setName(e.detail.value!)}
              />
            </IonItem>

            {/* Dosage */}
            <IonItem>
              <IonIcon icon={medkitOutline} slot="start" />
              <IonLabel position="stacked">Dosage</IonLabel>
              <IonInput
                value={dosage}
                placeholder="Enter dosage (e.g., 500mg)"
                onIonChange={(e) => setDosage(e.detail.value!)}
              />
            </IonItem>

            {/* Schedule Time */}
            <IonItem>
              <IonIcon icon={timeOutline} slot="start" />
              <IonLabel position="stacked">Schedule Time</IonLabel>
              <IonInput
                type="time"
                value={scheduleTime}
                placeholder="Select time"
                onIonChange={(e) => setScheduleTime(e.detail.value!)}
              />
            </IonItem>

            {/* Submit Button */}
            <IonButton
              expand="block"
              color="primary"
              onClick={handleSubmit}
              style={{ marginTop: '20px' }}
            >
              {isEditing ? 'Save Changes' : 'Add Medicine'}
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default AddMedicine;
