const Flight = require('../models/flight');
// const Ticket = require('../models/ticket');

module.exports = {
  index,
  new: newFlight,
  create,

  // show,
  // delete: deleteOne,
  // showUpdate,
  // update
};

function index(req, res) {
  // Find all the flights
  Flight.find({}, function (err, flights) {
    // Render index view
    console.log('flights', flights)
    res.render('flights/index', {
      flights: flights,
      title: "All Flights",
    })
  })
}

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'New Flight'
  })
}


// function create(req, res) {
//   const flight = new Flight(req.body);
//   flight.save( err => {
//       if (err) {
//           console.log(err)
//           return res.render('flights/new', { title: "Add Flight" })
//       }
//       res.redirect('/flights');
//   })
// }




// const newFlight = new Flight();
// // Obtain the default date
// const dt = newFlight.departs;
// // Format the date for the value attribute of the input
// const departsDate = dt.toISOString().slice(0, 16);
// res.render('flights/new', {departsDate});
function create(req, res) {
  const flight = new Flight(req.body);
  flight.save(function (err) {
    if (err) {
      console.log(err)
      return res.render('flights/new', { title: "Add Flight" })
    }
    console.log(flight)
    res.redirect('/flights');
  })
}


