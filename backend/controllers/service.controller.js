const Service = require('../models/service.model');

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

        const services = await Service.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },   // service name
                { address: { $regex: query, $options: 'i' } } // location
            ]
        })
        .populate('provider', 'name phonePrimary');

        res.json(services);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getServiceById = async (req, res) => {
    try {
        const { id } = req.params;

        const service = await Service.findById(id)
            .populate('provider', 'name phonePrimary email')
            .populate({
                path: 'reviews',
                populate: {
                    path: 'user',
                    select: 'name'
                }
            });

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.json(service);

    } catch (err) {
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