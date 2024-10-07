
import React, { useState } from 'react';
import axios from 'axios';

const SimDetails = () => {
    const [simNumber, setSimNumber] = useState('');
    const [simData, setSimData] = useState(null);
    const [error, setError] = useState('');

    const handleFetchDetails = async () => {
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/sims';
        try {
            const response = await axios.get(`${API_URL}/phone/${simNumber}`);
            setSimData(response.data);
            setError('');
        } catch (err) {
            setSimData(null);
            setError(`Error: ${err.response ? err.response.data.error : err.message}`);
        }
    };

    return (
        <div>
            <h2>SIM Details</h2>
            <input
                type="text"
                value={simNumber}
                onChange={(e) => setSimNumber(e.target.value)}
                placeholder="Enter SIM Number"
            />
            <button onClick={handleFetchDetails}>Fetch Details</button>

            {error && <p>{error}</p>}
            {simData && (
                <div>
                    <h3>SIM Details:</h3>
                    <p><strong>SIM Number:</strong> {simData.simNumber}</p>
                    <p><strong>Phone Number:</strong> {simData.phoneNumber}</p>
                    <p><strong>Status:</strong> {simData.status}</p>
                    <p><strong>Activation Date:</strong> {simData.activationDate ? new Date(simData.activationDate).toLocaleString() : 'N/A'}</p>
                </div>
            )}
        </div>
    );
};

export default SimDetails;
