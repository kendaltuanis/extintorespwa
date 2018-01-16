import * as express from 'express';
import { User, PersistedPassword } from './user';
const router = express.Router();
import * as crypto from 'crypto';

const PASSWORD_LENGTH = 256;
const SALT_LENGTH:any = 64;
const ITERATIONS = 10000;
const DIGEST = 'sha256';
const BYTE_TO_STRING_ENCODING = 'hex'; // this could be base64, for instance

router.route("/user/:id")
  .get((req, res) => {
    // Trae un usuario mediante su id
    User.findById(req.params.id)
      .then((doc) => res.json(doc));
  })
  .put((req, res) => {
    // Edita solamente la contraseña (Esto se puede reducir)
    let userData = {};
    if (req.body.password) userData["password"] = req.body.password;

    User.findByIdAndUpdate(req.params.id, userData, { new: true })
      .then(doc => res.json(doc));
  })
  .delete((req, res) => {
    // Eliminar un usuario con la id
    User.findByIdAndRemove(req.params.id)
      .then(() => res.json({ message: "Se eliminó con éxito" }));
  })

  function handleError(error) {
    console.error(`Error ${error}\n${error.stack}`);
  }
  

router.route("/user")
  .post((req, res) => {
    //Guarda un usuario dentro de la db
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    user.save(function (err, list) {
     if (err) {
        return handleError(err);
      }
    })
  });

  export async function verifyPassword(persistedPassword: PersistedPassword, passwordAttempt: string): Promise<boolean> {
    return new Promise<boolean>((accept, reject) => {
        crypto.pbkdf2(passwordAttempt, persistedPassword.salt, persistedPassword.iterations, PASSWORD_LENGTH, DIGEST, (error, hash) => {
            if (error) {
                reject(error);
            } else {
                accept(persistedPassword.hash === hash.toString(BYTE_TO_STRING_ENCODING));
            }
        });
    });
}
/* este no
router.route("/user/signin/:email/:password") // Se obtienen solo los pagos de abonos por el id de usuario y el número de factura
  .get((req, res) => {
  
    User.find({ 'email': req.params.email, 'password': req.params.password }, 'type', function (err, report) {
      res.json(report);
    })
  });
*/
  router.route("/user/signin/") // Se obtienen solo los pagos de abonos por el id de usuario y el número de factura
  .post((req, res) => {

   
    User.find({ 'email': req.body.email, 'password': req.body.password }, 'type', function (err, report) {
      res.json(report);
    })
  })


export const RouterApiUser = router;