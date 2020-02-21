const express = require('express');
const restricted = require('../auth/restricted-middleware');
const userModel = require('./users-model');

const router = express.Router();

// get all users
router.get('/', restricted, (req, res) => {
  userModel
    .find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

// // get other users within from same department as the user
// router.get('/department', department(), async (req, res, next) => {
//   try {
//     const { department } = req.user;
//     const users = await userModel.findByDepartment(department);
//     if (users.length > 0) {
//       res.status(200).json(users);
//     } else {
//       res.status(401).json({
//         message: 'There are no users currently listed in that department'
//       });
//     }
//   } catch (err) {
//     next(err);
//   }
// });

// // custom middleware to check if user is in the correct department
// function department() {
//   return function(req, res, next) {
//     if (req.user && req.user.department) {
//       next();
//     } else {
//       res.status(403).json({
//         message: 'Must be in a department to access student list'
//       });
//     }
//   };
// }

module.exports = router;
