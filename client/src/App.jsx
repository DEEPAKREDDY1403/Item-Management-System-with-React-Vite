// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ItemProvider } from './context/ItemContext';
import Navbar from './components/Navbar';
import AddItem from './pages/AddItem';
import ViewItems from './pages/ViewItems';

function App() {
    return (
        <ItemProvider>
            <Router>
                <Navbar />
                <main className="bg-gray-100 min-h-screen">
                    <Routes>
                        <Route path="/" element={<Navigate to="/view-items" />} />
                        <Route path="/view-items" element={<ViewItems />} />
                        <Route path="/add-item" element={<AddItem />} />
                    </Routes>
                </main>
            </Router>
        </ItemProvider>
    );
}

export default App;