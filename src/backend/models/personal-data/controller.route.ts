import * as express from 'express';
import { Personal, Phone } from './personal-data';
const router = express.Router();

/*          DATOS PERSONALES          */

router.route("/personal/:user")
  .get((req, res) => {
    Personal.find({ 'user': req.params.user }, 'name flastname slastname identification company taxname phones').then((doc) => res.json(doc));
  })

router.route("/personal/data/:user")
  .put((req, res) => {   // Edita los datos que le son enviados mediante su id
    let userData = {};
    if (req.body.name) userData["name"] = req.body.name;
    if (req.body.flastname) userData["flastname"] = req.body.flastname;
    if (req.body.slastname) userData["slastname"] = req.body.slastname;
    if (req.body.identification) userData["identification"] = req.body.identification;
    if (req.body.company) userData["company"] = req.body.company;
    if (req.body.taxname) userData["taxname"] = req.body.taxname;

    Personal.update({ 'user': req.params.user }, userData, { new: true })
      .then(doc => res.json(doc));

  });

router.route("/personal")
  .get((req, res) => {
    //Trea a todos los datos personales dentro de la db
    Personal.find({}).exec().then((doc) => res.json(doc));
  })

  .post((req, res) => {
    //Guardar los datos dentro de la db
    const personalData = new Personal({
      name: req.body.name,
      flastname: req.body.flastname,
      slastname: req.body.slastname,
      identification: req.body.identification,
      company: req.body.company,
      taxname: req.body.taxname,
      user: req.body.user
    });

    personalData.save(function (err, model) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      return res.json(model);
    });
  });

/*         TELÉFONOS          */

router.route("/personal/phone")
  .get((req, res) => {
    //Trea a todos los datos personales dentro de la db
    Personal.find({}).exec().then((doc) => res.json(doc));
  })

router.route("/personal/phone/:user")
  .post((req, res) => {
    //Guardar nuevo teléfono dentro de la db --- ESTE es un subdocumento
    let userData = {};
    if (req.body.countrycode) userData["countrycode"] = req.body.countrycode;
    if (req.body.phone) userData["phone"] = req.body.phone;
    if (req.body.extension) userData["extension"] = req.body.extension;

    Personal.update({ 'user': req.params.user }, { $push: { 'phones': userData } })
      .then(doc => res.json(doc));

  });

router.route("/personal/:user/:phone")
  .delete((req, res) => {
    // Eliminar un telefono enviando el id de usuario y además el teléfonoq que se quiere eliminar
    Personal.update({ 'user': req.params.user },
      { $pull: { 'phones': { phone: req.params.phone } } }, function (err, model) {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        return res.json(model);
      });


  });



export const RouterApiUserPersonalData = router;