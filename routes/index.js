const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nanoid = require('nanoid');
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res) {
  const token = jwt.sign(
      {
        sub: `${process.env.WK_API_KEY}:${process.env.WK_USER_ID}`,
        jti: nanoid()
      },
      process.env.WK_JWT_PRIVATE_KEY,
      {algorithm: 'RS256'}
  );

  const host = process.env.WK_HOST;

  res.render('index', { token, host, id: process.env.WK_CONNECTION_ID });
});

module.exports = router;
