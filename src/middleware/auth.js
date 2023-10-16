
require("dotenv").config();

const {userService} = require('./src/services')
const jwt = require("jsonwebtoken");

const { throwError } = require("../utils");

const {AUTH_TOKEN_SALT} = process.env
