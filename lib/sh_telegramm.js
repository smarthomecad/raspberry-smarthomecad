var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const axios = require('axios')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

app.post('/new-message', function (req, res) {
  const { message } = req.body


  if (!message || message.text.toLowerCase().indexOf('marco') < 0) {
    return res.end()
  }

  axios.post('https://api.telegram.org/botID/sendMessage', {
    chat_id: message.chat.id,
    text: ''
  })
    .then(response => {
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      console.log('Error :', err)
      res.end('Error :' + err)
    })

});

// Finally, start our server
app.listen(3000, function () {
  console.log('Telegram app listening on port 3000!');
});
