import * as express from 'express';
import { Order } from './order';
const router = express.Router();



router.route("/order/:user")
  .get((req, res) => {
    Order.find({ 'user': req.params.user }, 'status services', function (err, result) {
      res.json(result);
    })
  })

  .post((req, res) => {
    //Guardar los datos dentro de la db
    const orderData = new Order({
      status: req.body.status,
      services: req.body.services,
      user: req.body.user
    });

    orderData.save().then((doc) => res.json(doc));
  });



export const RouterApiUserOrder = router;