import React, { useState } from 'react';
import axios from 'axios';

const SimDeactivation = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    // Hard-coded API URL
    const API_URL = 'https://sim-6iwp.onrender.com';

    const handleDeactivate = async () => {
        try {
            const response = await axios.get(`${API_URL}/phone/${phoneNumber}`);
            if (response.data) {
                const simResponse = await axios.post(`${API_URL}/deactivate`, { simNumber: response.data.simNumber });
                setMessage(`SIM deactivated successfully: ${simResponse.data.simNumber}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.response ? error.response.data.error : error.message}`);
        }
    };

    return (
        <div>
            <h2>Deactivate SIM</h2>
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Phone Number"
            />
            <button onClick={handleDeactivate}>Deactivate SIM</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SimDeactivation;
