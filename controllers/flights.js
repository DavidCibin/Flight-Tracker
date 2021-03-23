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
  Flight.find({}, function (err, flights) {
    res.render('flights/index', {
      flights,
      title: "All Flights",
    })
  })
}

function newFlight (req, res) {
  const newFlight = new Flight();
  const dt = newFlight.departs;
  const departsDate = dt.toISOString().slice(0, 16);
  res.render('flights/new', {
    title: 'Add Flight',
    departsDate
  })
}


// function create(req, res) {
//   // Needed to "fix" date formatting to prevent day off by 1
//   // This is due to the <input type="date"> returning the date
//   // string in this format:  "YYYY-MM-DD"
//   // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
//   const s = req.body.born;
//   req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
//   Performer.create(req.body, function(err, performer) {
//     console.log(performer)
//     res.redirect('/performers/new')
//   })
// }


// const s = req.body.born;
// req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
// Performer.create(req.body, function(err, performer) {
//   console.log(performer)
//   res.redirect('/performers/new')

// This is the testing one
// function create(req, res) {
//   console.log('date & time', req.body.departs)
//   const flight = new Flight(req.body.departs);
//   // Obtain the default date
//   const dt = newFlight.departs;
//   // Format the date for the value attribute of the input
//   const departsDate = dt.toISOString().slice(0, 16);
//   flight.save(function (err) {
//     if (err) {
//       console.log(err)
//       return res.render('flights/new', {
//         departsDate,
//         title: "Add Flight"
//       })
//     }
//     console.log(flight)
//     res.redirect('/flights');
//   })
// }

// This is the working one
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
  Flight.findById(req.params.id, function (flight) {
    flight.destinations.push(req.body.airportId);
    flight.save(function (err) {
      if (err) console.log(err);
      res.redirect(`/flights/${flight._id}`);
    })
  })
}

function delDest(req, res) {
  Flight.findById(req.params.id, function (flight) {
    const destIndex = flight.destinations.findIndex(destIdx =>
      destIdx.toString() == req.params.did)
    flight.destinations.splice(destIndex, 1)
    flight.save(function (err) {
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
  Flight.find({}).sort({departs: 'asc'})
      .then( flights => {
          const now = new Date().toISOString();
          flights.forEach( flight => {
              if (flight.departs.toISOString() < now) flight.past = true;
          })
          res.render('flights/index', {
              title: "All Flights",
              flights })
      })
      .catch(err => console.log(err))
}