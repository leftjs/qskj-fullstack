/**
 * Created by zhangjiasheng on 7/23/16.
 */
var express = require('express');
var router = express.Router();
import {uploadMultiple, uploadMiddleware} from '../utils/ossUtils'
import product from '../models/product'
import {validateBodyNull} from '../utils'
import _ from 'lodash'





module.exports = router;