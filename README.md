# MallEz

MallEz is a web application designed to simplify parking management in shopping malls. It provides features for user authentication, profile management, and vehicle registration.

## Features

- User Authentication (Email/Password, Google, Apple)
- User Profile Management
- Vehicle Registration and Management
- Responsive Design
- Password Strength Estimation
- Toast Notifications

## Technologies Used

- Frontend: React.js, React Router, Framer Motion, Tailwind CSS
- Backend: Firebase (Authentication, Firestore)
- Development: Vite, ESLint, Prettier

## Project Structure

```
mallez/
├── public/
│ └── index.html
├── src/
│ ├── components/
│ │ ├── ForgotPassword.jsx
│ │ ├── Navbar.jsx
│ │ ├── ProfileComponent.jsx
│ │ ├── ProtectedRoute.jsx
│ │ └── Footer.jsx
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Login.jsx
│ │ ├── SignUp.jsx
│ │ ├── Profile.jsx
│ │ ├── AboutUs.jsx
│ │ ├── Malls.jsx
│ │ └── IndividualMall.jsx
│ ├── firebase/
│ │ ├── auth.js
│ │ └── firebaseConfig.js
│ ├── styles/
│ │ └── index.css
│ ├── utils/
│ │ └── helpers.js
│ ├── App.jsx
│ ├── firebaseOperations.js
│ ├── index.js
│ └── animation.js
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## Setup and Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/mallez.git
   ```

2. Install dependencies:

   ```
   cd mallez
   npm install
   ```

3. Set up Firebase:

   - Create a Firebase project
   - Enable Authentication and Firestore
   - Add Firebase configuration to `.env`:
     ```
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```

4. Start the development server:
   ```
   npm run dev
   ```

## Usage

1. Open `http://localhost:3000` in your browser
2. Sign up or log in
3. Update profile information and manage vehicle numbers

## Deployment

1. Build the project:

   ```
   npm run build
   ```

2. Deploy to Firebase Hosting:
   ```
   npm install -g firebase-tools
   firebase login
   firebase init
   firebase deploy
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
