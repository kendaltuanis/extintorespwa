import * as express from 'express';
import { Report } from './report';
const router = express.Router();


router.route("/report/user/:user")
  .get((req, res) => {
    Report.find({ 'user': req.params.user }, 'gasoline mileage details gps date expense', function (err, report) {
      res.json(report);
    })
  })

router.route("/report/date/:date")
  .get((req, res) => {
    Report.find({ 'date': req.params.date }, 'gasoline mileage details gps expense user', function (err, report) {
      res.json(report);
    })
  })

router.route("/report/both/:date/:user")
  .get((req, res) => {
    Report.find({ 'date': req.params.date, 'user': req.params.user }, 'gasoline mileage details date gps expense', function (err, report) {
      res.json(report);
    })
  })

router.route("/report")
  .get((req, res) => {
    //Trea a todos los datos dentro de la db
    Report.find({}).exec().then((doc) => res.json(doc));
  })

  .post((req, res) => {
    //Guardar los datos dentro de la db
    const report = new Report({
      gasoline: req.body.gasoline,
      mileage: req.body.mileage,
      details: req.body.details,
  //  date: req.body.date, -- Este se agregar por default
      user: req.body.user
    });
    report.save().then((doc) => res.json(doc));
  });

router.route("/report/expense/:id")
  .post((req, res) => {
    //Guardar un nuevo gasto dentro de la db --- ESTE es un subdocumento
    let expenseData = {};
    if (req.body.expense) expenseData["expense"] = req.body.expense;
    if (req.body.detail) expenseData["detail"] = req.body.detail;

    Report.update({ '_id': req.params.id }, { $push: { 'expense': expenseData } })
      .then(doc => res.json(doc));

  });

router.route("/report/:id")
  .delete((req, res) => {
    Report.findByIdAndRemove(req.params.id)
      .then(() => res.json({ message: "Se eliminó con éxito" }));
  });


export const RouterApiUserReport = router;