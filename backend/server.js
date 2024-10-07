require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.error('MongoDB connection error:', err));


const simSchema = new mongoose.Schema({
    simNumber: { type: String, unique: true, required: true },
    phoneNumber: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    activationDate: { type: Date }
});

const Sim = mongoose.model('Sim', simSchema);


app.post('/api/sims', async (req, res) => {
    const { simNumber, phoneNumber } = req.body; 
    try {
        const existingSim = await Sim.findOne({ simNumber });
        if (existingSim) {
            return res.status(400).json({ error: 'SIM card already exists.' });
        }

        const newSim = new Sim({
            simNumber,
            phoneNumber,
            status: 'inactive', 
            activationDate: null 
        });

        await newSim.save();
        res.status(201).json(newSim);
    } catch (err) {
        console.error('Error creating SIM:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/sims/activate', async (req, res) => {
    const { simNumber } = req.body;
    try {
        const sim = await Sim.findOne({ simNumber });
        if (!sim) return res.status(404).json({ error: 'SIM card does not exist.' });
        if (sim.status === 'active') return res.status(400).json({ error: 'SIM card is already active.' });

        sim.status = 'active';
        sim.activationDate = new Date();
        await sim.save();
        res.json(sim);
    } catch (err) {
        console.error('Error activating SIM:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/sims/deactivate', async (req, res) => {
    const { simNumber } = req.body;
    try {
        const sim = await Sim.findOne({ simNumber });
        if (!sim) return res.status(404).json({ error: 'SIM card does not exist.' });
        if (sim.status === 'inactive') return res.status(400).json({ error: 'SIM card is already inactive.' });

        sim.status = 'inactive';
        sim.activationDate = null;
        await sim.save();
        res.json(sim);
    } catch (err) {
        console.error('Error deactivating SIM:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/sims', async (req, res) => {
    try {
        const sims = await Sim.find();
        res.json(sims);
    } catch (err) {
        console.error('Error fetching SIMs:', err);
        res.status(500).json({ error: 'Failed to fetch SIMs.' });
    }
});

app.get('/api/sims/phone/:phoneNumber', async (req, res) => {
    const { phoneNumber } = req.params;
    try {
        const sim = await Sim.findOne({ phoneNumber });
        if (!sim) return res.status(404).json({ error: 'SIM card does not exist.' });
        res.json(sim);
    } catch (err) {
        console.error('Error fetching SIM by phone number:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


app.use(express.static(path.join(__dirname, '../frontend/build')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});


app.listen(PORT, () => console.log(`Server running on ${process.env.BASE_URL}`));
