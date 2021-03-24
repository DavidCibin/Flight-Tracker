const Destination = require('../models/destination');

module.exports = {
    new: newDest,
    create,
    delete: deleteDest
}

function newDest(req, res) {
    Destination.find({}, (err, destinations) => {
        if (err) console.log(err)
        res.render('destinations/new', {
            title: "New Destination",
            destinations
        })
    })
}

function create(req, res) {
    Destination.find({}, function (err, destinations) {
        if (err) console.log(err)
        const destination = new Destination(req.body);
        destination.save(function (err) {
            if (err) {
                return res.render('destinations/new', {
                    title: "New Destination",
                    err,
                    destinations
                })
            }
            res.redirect('/destinations/new');
        })
    })
}

function deleteDest(req, res) {
    Destination.deleteOne({ _id: req.params.id }, function (err) {
        if (err) console.log(err)
        res.redirect('/destinations/new');
    })
}