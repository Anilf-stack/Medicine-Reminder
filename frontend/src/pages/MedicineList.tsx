import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonSpinner,
  IonButton,
  IonAlert,
  IonToast,
  IonButtons,
  IonBackButton,  // Import IonBackButton
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import API from '../services/api';

const MedicineList: React.FC = () => {
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedMedicineId, setSelectedMedicineId] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await API.get('/medicine');
        setMedicines(response.data);
      } catch (error) {
        console.error('Failed to fetch medicines:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const handleEdit = (medicine: any) => {
    history.push({
      pathname: '/add-medicine',
      state: { medicine },
    });
  };

  const handleDelete = async () => {
    if (selectedMedicineId !== null) {
      try {
        await API.delete(`/medicine/${selectedMedicineId}`);
        setMedicines(medicines.filter((medicine) => medicine.id !== selectedMedicineId));
        setShowToast(true); // Show success toast
      } catch (error) {
        console.error('Failed to delete medicine:', error);
        alert('Failed to delete medicine. Please try again.');
      } finally {
        setShowAlert(false);
      }
    }
  };

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonBackButton /> {/* Add the back button here */}
            </IonButtons>
            <IonTitle>Medicines</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <IonSpinner name="crescent" />
        </IonContent>
      </IonPage>
    );
  }

  if (!medicines.length) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonBackButton /> {/* Add the back button here */}
            </IonButtons>
            <IonTitle>Medicines</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" style={{ textAlign: 'center' }}>
          <p>No medicines found.</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton /> {/* Add the back button here */}
          </IonButtons>
          <IonTitle>Medicines</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={{ backgroundColor: '#f5f5f5' }}>
        {medicines.map((medicine) => (
          <IonCard key={medicine.id}>
            <IonCardHeader>
              <IonCardTitle>{medicine.name}</IonCardTitle>
              <IonCardSubtitle>{medicine.dosage}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <p>
                <strong>Scheduled at:</strong> {medicine.schedule_time}
              </p>
              <IonButton expand="block" color="secondary" onClick={() => handleEdit(medicine)}>
                Edit
              </IonButton>
              <IonButton
                expand="block"
                color="danger"
                style={{ marginTop: '10px' }}
                onClick={() => {
                  setSelectedMedicineId(medicine.id);
                  setShowAlert(true);
                }}
              >
                Delete
              </IonButton>
            </IonCardContent>
          </IonCard>
        ))}

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Confirm Delete"
          message="Are you sure you want to delete this medicine?"
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => setShowAlert(false),
            },
            {
              text: 'Delete',
              handler: handleDelete,
            },
          ]}
        />

        <IonToast
          isOpen={showToast}
          message="Medicine deleted successfully!"
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default MedicineList;
