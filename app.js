require('dotenv').config();
const express      = require('express');
const path         = require('path');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');

const app   = express();

const ULID = require('ulid')
var fs = require('fs')
for (let i = 1; i < 1117; i++) {
  let ulidStr = ULID.ulid();
let sqlStr = "UPDATE public.original_inventory SET ulid_id='" + ulidStr + "' WHERE pk_id=" + i + ";\r\n";
  fs.appendFile('update.sql', sqlStr, function (err) {
    if (err) {
      console.log("append failed");
    } else {
      console.log(sqlStr);
    }
  })
  fs.appendFile('ulid-list.txt', ulidStr + "\r\n", function (err) {
    if (err) {
      console.log("append failed");
    } else {
      console.log(sqlStr);
    }
  })
}


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', express.static('public'));

app.get('/message', function (req, res) {
  res.send(process.env.MESSAGE);
});

var server = app.listen(process.env.PORT || 3033, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});