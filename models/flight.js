const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        type: Date,
        default: function () {
            let oneYearFromNow = new Date();
            return oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        }
    },
    
    // nowFlying: Boolean,
    // destinations: [destinationsSchema]

})

// const destinationSchema = new Schema ({
//     airport: {
//         type: String,
//         enum: ["AUS", "DFW", "LAX", "SFO", "SEA"]
//     },
//     arrival: Date
// });


module.exports = mongoose.model('Flight', flightSchema);