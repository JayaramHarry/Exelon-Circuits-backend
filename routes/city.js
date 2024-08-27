const express = require('express');
const router = express.Router();
const City = require('../models/City'); // Assuming the City model is in models/City.js

// Add City
router.post('/', async (req, res) => {
    console.log('Request Body:', req.body);  // Log the request body

    try {
        const { name, population, country, latitude, longitude } = req.body;

        // Check if the city already exists
        const existingCity = await City.findOne({ name });
        if (existingCity) {
            return res.status(400).json({ error: 'City with this name already exists' });
        }

        // Create a new city instance
        const newCity = new City({
            name,
            population,
            country,
            latitude,
            longitude
        });

        // Save the new city to the database
        const savedCity = await newCity.save();

        // Respond with the saved city details
        res.status(201).json({ message: 'City added successfully', city: savedCity });
    } catch (error) {
        console.error('Error adding city:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// PUT route to update an existing city
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, population, country, latitude, longitude } = req.body;

    try {
        // Find and update the city by ID
        const updatedCity = await City.findByIdAndUpdate(id, {
            name,
            population,
            country,
            latitude,
            longitude
        }, { new: true });

        if (!updatedCity) {
            return res.status(404).json({ error: 'City not found' });
        }

        res.status(200).json({ message: 'City updated successfully', city: updatedCity });
    } catch (error) {
        console.error('Error updating city:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// DELETE route to delete a city
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCity = await City.findByIdAndDelete(id);

        if (!deletedCity) {
            return res.status(404).json({ error: 'City not found' });
        }

        res.status(200).json({ message: 'City deleted successfully' });
    } catch (error) {
        console.error('Error deleting city:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// GET route to retrieve cities with various query options
router.get('/', async (req, res) => {
    const { page = 1, limit = 10, filter = '{}', sort = 'name', search = '', projection = '' } = req.query;

    try {
        const filterObj = JSON.parse(filter);
        const searchRegex = new RegExp(search, 'i'); // Case-insensitive search

        // Build query
        const query = {
            ...filterObj,
            name: search ? { $regex: searchRegex } : { $exists: true }
        };

        // Find cities with pagination, sorting, and projection
        const cities = await City.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort(sort)
            .select(projection);

        // Count total cities for pagination info
        const total = await City.countDocuments(query);

        res.status(200).json({
            page,
            limit,
            total,
            cities
        });
    } catch (error) {
        console.error('Error retrieving cities:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
