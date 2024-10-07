import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SimActivation from './components/SimActivation';
import SimDeactivation from './components/SimDeactivation';
import SimDetails from './components/SimDetails';
import './App.css'; 

function App() {
    return (
        <Router>
            <div className="App">
                <h1>SIM Card Management</h1>
                <div className="button-container">
                    <Link to="/activate">
                        <button>Activate SIM</button>
                    </Link>
                    <Link to="/deactivate">
                        <button>Deactivate SIM</button>
                    </Link>
                    <Link to="/details">
                        <button>SIM Details</button>
                    </Link>
                </div>
                <Routes>
                    <Route path="/activate" element={<SimActivation />} />
                    <Route path="/deactivate" element={<SimDeactivation />} />
                    <Route path="/details" element={<SimDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
