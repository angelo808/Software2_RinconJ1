import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import ACalendar from './components/Calendar/ACalendar';
import { UserProvider } from './context/UserContext';

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Header />
                <main>
                    <Routes>
                        <Route path="/calendario" element={<ACalendar />} />
                        <Route path="/" element={<Navigate to="/calendario" />} />
                    </Routes>
                </main>
            </Router>
        </UserProvider>
    );
};

export default App;
