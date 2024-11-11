const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const dbURI = process.env.MONGO_URI || 'your_mongodb_connection_string';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

const sectionSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const Section = mongoose.model('Section', sectionSchema);

app.get('/api/sections', async (req, res) => {
    try {
        const sections = await Section.find();
        res.status(200).json(sections);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sections', error });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
