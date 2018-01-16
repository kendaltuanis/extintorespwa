import * as express from 'express';
import { List } from './list';
const router = express.Router();


router.route("/list/:user") // Encuentra la lista según el usuario (Esta es la que se ve en la tabla)
  .get((req, res) => {
    List.find({ 'user': req.params.user }, 'name flastname slastname company phones address services', function (err, list) {
      res.json(list);
    })
  })


router.route("/list/details/:user") // Encuentra la lista según el usuario (Esta es la que se usará para facturar. Porque trae los demás datos necesarios)
  .get((req, res) => {
    List.find({ 'user': req.params.user }, 'name flastname slastname identification company taxname phones address services', function (err, list) {
      res.json(list);
    })
  })

router.route("/list/")
  .post((req, res) => {
    //Guardar los datos dentro de la db
    const personalData = new List({
      name: req.body.name,
      flastname: req.body.flastname,
      slastname: req.body.slastname,
      identification: req.body.identification,
      company: req.body.company,
      taxname: req.body.taxname,
      address:req.body.address,
      phones: req.body.phones,
      services:req.body.services,
      user: req.body.user
    });

    personalData.save().then((doc) => res.json(doc));
  });


export const RouterApiUsersList = router;