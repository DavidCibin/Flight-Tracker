const Flight = require('../models/flight');
const Destination = require('../models/destination')

module.exports = {
  index,
  indexSort,
  new: newFlight,
  create,
  show,
  delFlight,
  createTicket,
  delTicket,
  delTicket,
  addDest,
  delDest,
  sortDepart
}

function index(req, res) {
  Flight.find({}, (err, flights) => {
    if (err) console.log(err)
    const now = new Date().toISOString();
    flights.forEach(flight => {
      if (flight.departs.toISOString() < now) flight.past = true;
    })
    res.render('flights/index', {
      title: "All Flights",
      flights
    })
  })
}

function newFlight(req, res) {
  const newFlight = new Flight();
  const dt = newFlight.departs;
  const departsDate = dt.toISOString().slice(0, 16);
  res.render('flights/new', {
    title: 'Add Flight',
    departsDate
  })
}

function create(req, res) {
  const flight = new Flight(req.body);
  flight.save(function (err) {
    if (err) {
      console.log(err)
      return res.render('flights/new', {
        title: "Add Flight"
      })
    }
    console.log(flight)
    res.redirect('/flights');
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
    .populate('destinations').exec(function (err, flight) {
      if (err) console.log(err);
      Destination.find({ _id: { $nin: flight.destinations } },
        (err, destinations) => {
          if (err) console.log(err);
          res.render('flights/show', {
            title: "Flight Details",
            flight,
            destinations
          })
        })
    })
}

function delFlight(req, res) {
  Flight.deleteOne({ _id: req.params.id }, function (err) {
    if (err) console.log(err)
    res.redirect('/flights');
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    flight.tickets.push(req.body)
    flight.save(function (err) {
      if (err) console.log(err);
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function delTicket(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    flight.tickets.id(req.params.tid).remove()
    flight.save(function (err) {
      if (err) console.log(err);
      res.redirect(`/flights/${flight._id}`);
    })
  })
}

function addDest(req, res) {
  Flight.findById(req.params.id)
    .then(flight => {
      flight.destinations.push(req.body.airportId);
      flight.save(err => {
        if (err) console.log(err);
        res.redirect(`/flights/${flight._id}`);
      })
    })
}

function delDest(req, res) {
  Flight.findById(req.params.id)
    .then(flight => {
      const destIndex = flight.destinations.findIndex(d =>
        d.toString() == req.params.did)
      flight.destinations.splice(destIndex, 1)
      flight.save(err => {
        if (err) console.log(err);
        res.redirect(`/flights/${flight._id}`);
      })
    })
}

function sortDepart(req, res) {
  Flight.find({}).sort({ departs: 'asc' })
    .then(flights => {
      const now = new Date().toISOString();
      flights.forEach(flight => {
        if (flight.departs.toISOString() < now) flight.past = true;
      })
      res.render('flights/index', {
        title: "All Flights",
        flights
      })
    })
    .catch(err => console.log(err))
}

function indexSort(req, res) {
  Flight.find({}).sort({ departs: 'asc' })
    .then(flights => {
      const now = new Date().toISOString();
      flights.forEach(flight => {
        if (flight.departs.toISOString() < now) flight.past = true;
      })
      res.render('flights/index', {
        title: "All Flights",
        flights
      })
    })
    .catch(err => console.log(err))
}