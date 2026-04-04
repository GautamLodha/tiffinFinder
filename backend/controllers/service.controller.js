const Service = require('../models/service.model');
const mongoose = require('mongoose');
exports.getNearbyServices = async (req, res) => {
    try {
        const { lng, lat } = req.query;

        let services;

        // ✅ If location is provided → geo search
        if (lng && lat) {
            services = await Service.find({
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [parseFloat(lng), parseFloat(lat)]
                        },
                        $maxDistance: 20000 // 20 km
                    }
                }
            })
            .populate('provider', 'name phonePrimary')
            .limit(20);

        } else {
            // ❌ If no location → show all listings
            services = await Service.find()
                    .sort({ rating: -1 }) // ⭐ best first
                    .limit(20)
                    .populate('provider', 'name phonePrimary');
        }

        res.json({
            count: services.length,
            services
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};
exports.searchServices = async (req, res) => {
    try {
        const { query } = req.query;

        // ❗ if no query → return all (fallback)
        if (!query) {
            const services = await Service.find()
                .limit(20)
                .populate('provider', 'name phonePrimary');

            return res.json({ count: services.length, services });
        }

        const services = await Service.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },     // name search
                { address: { $regex: query, $options: 'i' } }   // location search
            ]
        })
        .populate('provider', 'name phonePrimary')
        .limit(20);

        res.json({
            count: services.length,
            services
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const { id } = req.params;

        // ❗ validate id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid service ID" });
        }

        const service = await Service.findById(id)
            .populate('provider', 'name phonePrimary email');

        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.json(service);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.getServicesByProvider = async (req, res) => {
    try {
        const { providerId } = req.params;

        // ❗ validate id
        if (!mongoose.Types.ObjectId.isValid(providerId)) {
            return res.status(400).json({ message: "Invalid provider ID" });
        }

        const services = await Service.find({ provider: providerId })
            .populate('provider', 'name phonePrimary email');

        if (services.length === 0) {
            return res.status(404).json({ message: "No services found for this provider" });
        }

        res.json({
            count: services.length,
            services
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.createService = async (req, res) => {
    try {
        const {
            title,
            description,
            pricePerMonth,
            mealType,
            address,
            lng,
            lat
        } = req.body;

        const service = await Service.create({
            provider: req.user.userId, // from JWT
            title,
            description,
            pricePerMonth,
            mealType,
            address,
            location: {
                type: "Point",
                coordinates: [lng, lat]
            }
        });

        res.status(201).json({
            message: "Service created successfully",
            service
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};