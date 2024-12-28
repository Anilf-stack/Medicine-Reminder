// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import App from './App';

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <Router>
      <IonReactRouter>
        <App />
      </IonReactRouter>
    </Router>
  );
}
