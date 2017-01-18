let express     = require('express');
let router      = express.Router();

let Session     = require('../../models/sessions');
let Users       = require('../../models/users');
let sendError   = require('../../common_libs/errors_format');

