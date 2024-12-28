import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import './theme/global.css';

/* Import Pages */
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dasboard';
import AddMedicine from './pages/AddMedicine';
import MedicineList from './pages/MedicineList';
import Logs from './pages/Logs';

/* Import PrivateRoute */
import PrivateRoute from './routes/PrivateRoute';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Ionic Dark Mode */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Authentication Routes */}
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />

        {/* Private Routes */}
        <PrivateRoute path="/admin-dashboard" component={AdminDashboard} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/add-medicine" component={AddMedicine} />
        <PrivateRoute path="/medicine-list" component={MedicineList} />
        <PrivateRoute path="/logs" component={Logs} />

        {/* Default Redirect */}
        <Redirect from="/" to="/login" exact />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
