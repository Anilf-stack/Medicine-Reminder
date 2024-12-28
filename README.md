# Medication Reminder App

## Overview
The Medication Reminder App is a comprehensive solution for managing medication schedules, user authentication, and acknowledgment logs. It is designed with a scalable and secure architecture, leveraging modern technologies such as Node.js, MySQL, and Ionic React with TypeScript.

---

## Features

### Backend
1. **User Authentication**
   - User registration and login with secure password hashing (bcrypt) and JWT-based authentication.
   - Role-based access control for patients and super admins.

2. **Medicine Management**
   - CRUD operations for managing medicine schedules, including name, dosage, and recurring times.

3. **Acknowledgment Logs**
   - Logging of patient acknowledgment for taking medicines.
   - Super admins can filter logs by user ID or date range.

4. **Secure Middleware**
   - Token-based route protection.
   - Role-based access for specific endpoints.

### Frontend
1. **User Interface**
   - Intuitive and responsive design built with Ionic React.
   - CSS styling for customization and consistency.

2. **Features**
   - Authentication pages for login and registration.
   - Dashboards for patients and admins to view and manage data.
   - Medicine list and acknowledgment logs with filtering options.

3. **API Integration**
   - Axios integration for seamless communication with the backend.

4. **Dark Mode Support**
   - Built-in support for dark mode.

---

## Technology Stack

### Backend
- **Framework**: Node.js with Express.js
- **Database**: MySQL
- **Authentication**: JWT
- **Security**: bcrypt for password hashing

### Frontend
- **Framework**: Ionic React
- **Language**: TypeScript
- **Styling**: CSS

---

## Database Schema

### Users Table
| Column       | Type           | Description                             |
|--------------|----------------|-----------------------------------------|
| `id`         | INT (PK)       | Auto-incrementing user ID.              |
| `name`       | VARCHAR(100)   | Name of the user.                       |
| `email`      | VARCHAR(100)   | Unique email address.                   |
| `password`   | VARCHAR(255)   | Hashed password.                        |
| `role`       | ENUM           | Role (`patient`, `super_admin`). Default: `patient`. |
| `created_at` | TIMESTAMP      | Account creation timestamp.             |

### Medicine Table
| Column           | Type           | Description                             |
|------------------|----------------|-----------------------------------------|
| `id`             | INT (PK)       | Auto-incrementing medicine ID.          |
| `user_id`        | INT (FK)       | References `Users(id)`.                 |
| `name`           | VARCHAR(100)   | Name of the medicine.                   |
| `dosage`         | VARCHAR(50)    | Dosage instructions.                    |
| `schedule_time`  | TIME           | Scheduled time for the medicine.        |

### AcknowledgmentLogs Table
| Column           | Type           | Description                             |
|------------------|----------------|-----------------------------------------|
| `id`             | INT (PK)       | Auto-incrementing log ID.               |
| `user_id`        | INT (FK)       | References `Users(id)`.                 |
| `medicine_id`    | INT (FK)       | References `Medicine(id)`.              |
| `status`         | ENUM           | Status (`Taken`, `Missed`). Default: `Taken`. |
| `timestamp`      | DATETIME       | Log timestamp.                          |

---

## API Endpoints

### Authentication
- **POST** `/auth/register` - Register a new user.
- **POST** `/auth/login` - Login and receive a JWT token.

### Medicine Management
- **POST** `/medicine` - Add a new medicine schedule.
- **GET** `/medicine` - Retrieve medicines for the logged-in user.
- **PUT** `/medicine/:id` - Update a specific medicine.
- **DELETE** `/medicine/:id` - Delete a medicine by ID.

### Acknowledgment Logs
- **GET** `/logs` - Retrieve logs (Super Admin only).
- **POST** `/logs` - Log medicine acknowledgment.

---

## Installation and Setup

### Prerequisites
1. Install [Node.js](https://nodejs.org/).
2. Install [MySQL](https://www.mysql.com/).
3. Install [Ionic CLI](https://ionicframework.com/docs/cli/installation) (optional but recommended).

```bash
npm install -g @ionic/cli
```

### Backend Setup

1. Clone the repository and navigate to the backend folder.
   ```bash
   git clone https://github.com/your-repo/medication-reminder.git
   cd medication-reminder/backend
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory with the following content:
   ```env
   DB_HOST=127.0.0.1
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=medication_reminder
   DB_PORT=3306
   PORT=5000
   JWT_SECRET=your-jwt-secret
   ```
4. Set up the database schema:
   ```sql
   CREATE TABLE Users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       email VARCHAR(100) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       role ENUM('patient', 'super_admin') DEFAULT 'patient',
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE Medicine (
       id INT AUTO_INCREMENT PRIMARY KEY,
       user_id INT NOT NULL,
       name VARCHAR(100) NOT NULL,
       dosage VARCHAR(50),
       schedule_time TIME,
       FOREIGN KEY (user_id) REFERENCES Users(id)
   );

   CREATE TABLE AcknowledgmentLogs (
       id INT AUTO_INCREMENT PRIMARY KEY,
       user_id INT NOT NULL,
       medicine_id INT NOT NULL,
       status ENUM('Taken', 'Missed') DEFAULT 'Taken',
       timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (user_id) REFERENCES Users(id),
       FOREIGN KEY (medicine_id) REFERENCES Medicine(id)
   );
   ```
5. Start the backend server.
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend folder.
   ```bash
   cd ../frontend
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Update `api.ts` with your backend URL:
   ```typescript
   const API = axios.create({
       baseURL: 'http://localhost:5000',
   });
   ```
4. Start the Ionic development server.
   ```bash
   ionic serve
   ```
5. Access the app at `http://localhost:8100`.

---

## Future Improvements

1. Add rate-limiting to prevent abuse.
2. Enhance logging and error handling.
3. Implement automated testing for both backend and frontend.
4. Add support for push notifications to remind users of scheduled medicines.

---

## License
This project is licensed under the [MIT License](LICENSE).

