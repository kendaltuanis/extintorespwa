import * as express from 'express';
import { Services } from './services';
const router = express.Router();


router.route("/service/:type/:service") // Encuentra los servicios según el tipo y el producto/servicio
  .get((req, res) => {
    Services.find({ 'type': req.params.type, 'service': req.params.service }, 'service type prices', function (err, list) {
      res.json(list);
    })
  })


router.route("/service/:type/") // Encuentra los servicios por medio del tipo
  .get((req, res) => {
    Services.find({ 'type': req.params.type }, 'service type prices', function (err, list) {
      res.json(list);
    })
  })

router.route("/service")
  .post((req, res) => {
    //Guardar los datos dentro de la db
    const serviceData = new Services({
      service: req.body.service,
      type: req.body.type,
      prices: req.body.prices
    });

    serviceData.save().then((doc) => res.json(doc));
  });


export const RouterApiServices = router;