import * as express from 'express';
import { Billing } from './billing';
const router = express.Router();


router.route("/billing/:user") // Esto obtiene todo por usuario
  .get((req, res) => {
    Billing.find({ 'user': req.params.user }, 'userData phones services discount invoicepayment notification date type total credittime isfinished invoicenumber', function (err, report) {
      res.json(report);
    })
  })
/* Sin uso por ahora (Se necesita arreglar)
router.route("/billing/:user/:date") // Esto obtiene todo por usuario y por fecha
  .get((req, res) => {
    Billing.find({ 'user': req.params.user, 'date': req.params.date }, 'date userData phones services discount invoicetype paymenttype notification', function (err, report) {
      res.json(report);
    })
  })


router.route("/billing/header/:user") // Detalles de usuario (Sin uso, por ahora)
  .get((req, res) => {
    Billing.find({ 'user': req.params.user }, 'userData phones notification', function (err, report) {
      res.json(report);
    })
  })

router.route("/billing/services/:user") // Detalles de servicio (Sin uso, por ahora)
  .get((req, res) => {
    Billing.find({ 'user': req.params.user }, 'services discount invoicetype paymenttype', function (err, report) {
      res.json(report);
    })
  })

router.route("/billing/important/:user") // Lo que normalmente se ve más junto (Sin uso, por ahora)
  .get((req, res) => {
    Billing.find({ 'user': req.params.user }, 'userData phone services invoicenumber', function (err, report) {
      res.json(report);
    })
  })
*/
/*       FACTURA NORMAL                 */
router.route("/billing/report/:user/:date") // Lo que se ve cuando un colaborador va a hacer un reporte
  .get((req, res) => {
    Billing.find({ 'user': req.params.user, 'invoices.date': req.params.date }, 'invoices.invoicenumber invoices.services', function (err, report) {
      res.json(report);
    })
  })
  function handleError(error) {
    console.error(`Error ${error}\n${error.stack}`);
  }
  

router.route("/billing")
  .post((req, res) => {
    //Guardar los datos dentro de la db
    const billing = new Billing({
      userData: req.body.userData,
      phones: req.body.phones,
      invoices: req.body.invoices,
      user: req.body.user
    });

    billing.save((error3, result) => {
      if (error3) {
        return handleError(error3);
      }

      res.json(result);
    });

  });

/*       ABONO A FACTURA                */
router.route("/billing/abono/:user/:invoice") // Aquí se abona por el usuario y el número de factura
  .post((req, res) => {
    //Guardar un nuevo abono a hacia una factura dentro de la db --- ESTE es un subdocumento
    let invoicePaymentData = {};
    if (req.body.type) invoicePaymentData["type"] = req.body.type;
    if (req.body.amount) invoicePaymentData["amount"] = req.body.amount;
    if (req.body.voucher) invoicePaymentData["voucher"] = req.body.voucher;
    if (req.body.date) invoicePaymentData["date"] = req.body.date;

    Billing.update({ 'user': req.params.user , 'invoices.invoicenumber': req.params.invoice }, { $push: { 'invoices.$.invoicepayment': invoicePaymentData } },(error3, result) => {
      if (error3) {
        return handleError(error3);
      }

      res.json(result);
    });
  });
router.route("/billing/abono/:user/:invoice") // Se obtienen solo los pagos de abonos por el id de usuario y el número de factura
  .get((req, res) => {
    Billing.find({ 'user': req.params.user, 'invoices.invoicenumber': req.params.invoice }, 'invoices.invoicepayment', function (err, report) {
      res.json(report);
    })
  })

router.route("/billing/abono/details/:user/:invoice") // Se obtienen los abonos con más detalle de la factura de crédito por el id de usuario y el número de factura
  .get((req, res) => {
    Billing.find({  'user': req.params.user, 'invoices.invoicenumber': req.params.invoice  }, 'invoices.credittime invoices.isfinished invoices.invoicepayment', function (err, report) {
      res.json(report);
    })
  })

export const RouterApiUserBilling = router;