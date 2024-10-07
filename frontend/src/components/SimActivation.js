import React, { useState } from 'react';
import axios from 'axios';

const SimActivation = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [simDetails, setSimDetails] = useState(null);
    
    // Hard-coded API URL
    const API_URL = 'https://sim-6iwp.onrender.com/api/sims';

    const handleActivate = async () => {
        if (!phoneNumber) {
            setMessage('Phone number is required.');
            return; // Exit early if phone number is not provided
        }

        try {
            // Check if the SIM exists by phone number
            const response = await axios.get(`${API_URL}/phone/${phoneNumber}`);
            if (response.data) {
                // If it exists, activate the SIM
                const simResponse = await axios.post(`${API_URL}/activate`, { simNumber: response.data.simNumber });
                setMessage(`SIM activated successfully: ${simResponse.data.simNumber}`);
                fetchSimDetails(phoneNumber);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // If not found, create a new SIM and activate it
                const newSim = {
                    simNumber: generateSimNumber(),
                    phoneNumber: phoneNumber,
                    status: 'active',
                    activationDate: new Date(),
                };
                try {
                    const createResponse = await axios.post(`${API_URL}`, newSim);
                    setMessage(`New SIM created and activated: ${createResponse.data.simNumber}`);
                    fetchSimDetails(phoneNumber);
                } catch (createError) {
                    setMessage(`Error creating SIM: ${createError.response.data.error}`);
                }
            } else {
                setMessage(`Error: ${error.response ? error.response.data.error : error.message}`);
            }
        }
    };

    const fetchSimDetails = async (phoneNumber) => {
        try {
            const response = await axios.get(`${API_URL}/phone/${phoneNumber}`);
            setSimDetails(response.data);
        } catch (error) {
            setSimDetails(null);
            setMessage(`Error fetching SIM details: ${error.response ? error.response.data.error : error.message}`);
        }
    };

    const generateSimNumber = () => {
        return 'SIM-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    return (
        <div>
            <h2>Activate SIM</h2>
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Phone Number"
            />
            <button onClick={handleActivate}>Activate SIM</button>
            {message && <p>{message}</p>}
            {simDetails && (
                <div>
                    <h3>SIM Details</h3>
                    <p>SIM Number: {simDetails.simNumber}</p>
                    <p>Phone Number: {simDetails.phoneNumber}</p>
                    <p>Status: {simDetails.status}</p>
                    <p>Activation Date: {simDetails.activationDate ? new Date(simDetails.activationDate).toLocaleString() : 'N/A'}</p>
                </div>
            )}
        </div>
    );
};

export default SimActivation;
