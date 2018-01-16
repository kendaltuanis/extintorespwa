import * as express from 'express';
import { Address } from './address';
const router = express.Router();


router.route("/address/:user")
  .get((req, res) => {
    Address.find({ 'user': req.params.user }, 'cp suburb details gps', function (err, address) {
      res.json(address);
    })
  })

router.route("/address")
  .get((req, res) => {
    //Trea a todos los datos dentro de la db
    Address.find({}).exec().then((doc) => res.json(doc));
  })

  .post((req, res) => {
    //Guardar los datos dentro de la db
    const address = new Address({
      cp: req.body.cp,
      suburb: req.body.suburb,
      details: req.body.details,
      gps: req.body.gps, // hay que ver
      user: req.body.user
    }); 
    address.save().then((doc) => res.json(doc));
  });

router.route("/address/gps/:user")
  .post((req, res) => {
    //Guardar una nueeva direccion gps dentro de la db --- ESTE es un subdocumento
    let userData = {};
    if (req.body.latitude) userData["latitude"] = req.body.latitude;
    if (req.body.longitude) userData["longitude"] = req.body.longitude;

    Address.update({ 'user': req.params.user }, { $push: { 'gps': userData } })
      .then(doc => res.json(doc));

  });

router.route("/address/:id")
.delete((req, res) => {
  Address.findByIdAndRemove(req.params.id)
    .then(() => res.json({ message: "Se eliminó con éxito" }));
});


export const RouterApiUserShippingAddress = router;