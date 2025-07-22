import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import amplifyOutputs from './amplify_outputs.json';
import type { JSX } from 'react';
import './index.css';
Amplify.configure(amplifyOutputs);

import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import Notes from './pages/notes';


//function Profile() {
//  return <h2>Profile</h2>;
//}

function MainApp() {
  const { user, signOut } = useAuthenticator(context => [context.user]);

  return (
    <Router>
      <div>
        <header
          style={{
            padding: '1rem',
            backgroundColor: '#282c34',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <nav
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            <Link style={linkStyle} to="/dashboard">Dashboard</Link>
            <Link style={linkStyle} to="/profile">Profile</Link>
            <Link style={linkStyle} to="/notes">Notes</Link>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <p style={{ margin: 0 }}>Welcome, {user?.userId}!</p>
            <button
              style={{
                backgroundColor: '#61dafb',
                border: 'none',
                borderRadius: '4px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
              onClick={signOut}
            >
              Sign out
            </button>
          </div>
        </header>

        <main style={{ padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const linkStyle: React.CSSProperties = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: 'bold',
};



function App(): JSX.Element {
  return (
    <Authenticator>
      <MainApp />
    </Authenticator>
  );
}

export default App;
