const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.get('/', (req, res, next) => {
  res.status(200).send({
    title: 'MailerAPI',
    version: '1.0.0'
  });
});
router.post('/send', emailController.sendEmail);
router.get('/inbox', emailController.inbox);

module.exports = router;