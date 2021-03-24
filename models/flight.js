const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    seat: {
        type: String,
        match: /[A-F]\d{1,2}/
    },
    price: {
        type: Number,
        min: 0
    }
}, {
    timestamps: true
})

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United']
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN'
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date, default: function () {
            const dt = new Date();
            return dt.setFullYear(dt.getFullYear() + 1)
        }
    },
    tickets: [ticketSchema],
    destinations: [{ type: Schema.Types.ObjectId, ref: 'Destination' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);
