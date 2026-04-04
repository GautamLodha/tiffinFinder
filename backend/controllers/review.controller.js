const Review = require('../models/review.model');
const Service = require('../models/service.model');

exports.createReview = async (req, res) => {
    try {
        const { serviceId } = req.params;
        const { rating, comment } = req.body;

        // create review
        const review = await Review.create({
            user: req.user.userId,
            service: serviceId,
            rating,
            comment
        });

        // add review to service
        const service = await Service.findById(serviceId);

        service.reviews.push(review._id);

        // 🔥 recalculate rating
        const reviews = await Review.find({ service: serviceId });

        const avgRating =
            reviews.reduce((acc, item) => acc + item.rating, 0) /
            reviews.length;

        service.rating = avgRating;
        service.totalReviews = reviews.length;

        await service.save();

        res.status(201).json({
            message: "Review added",
            review
        });

    } catch (err) {
        // ❗ duplicate review case
        if (err.code === 11000) {
            return res.status(400).json({
                message: "You already reviewed this service"
            });
        }

        console.log(err);
        res.status(500).json({ message: err.message });
    }
};