const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    provider: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    pricePerMonth: {
        type: Number,
        required: true,
    },

    mealType: {
        type: String,
        enum: ['veg', 'non-veg', 'both'],
        default: 'veg',
    },

    rating: {
        type: Number,
        default: 0,
    },

    totalReviews: {
        type: Number,
        default: 0,
    },

    address: {
        type: String,
        required: true,
    },

    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        },
    },

    images: [String],
    reviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Review'
        }
    ]

}, { timestamps: true });

serviceSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Service', serviceSchema);