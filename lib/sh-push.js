const FCM = require('fcm-node');
var TelegramBot = require("node-telegram-bot-api");

const apiKey = "API_KEY";
var deviceIDs = [];
const fcm = new FCM(apiKey);

const telegrammAPI = "TELEGRAM_API_KEY";
const telegrammChatID = "TELEGRAM_CHAT_ID";

exports.send = send;

function send(titleTxt, messageTxt, imageUrl, next) {
  var currentdate = new Date();
  // For todays date;
  Date.prototype.today = function () {
    return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "." + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "." + this.getFullYear();
  }

  // For the time now
  Date.prototype.timeNow = function () {
    return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes();
  }

  var newDate = new Date();
  var datetime = newDate.today() + " " + newDate.timeNow();


  const bot = new TelegramBot(telegrammAPI);
  if (imageUrl) {
    bot.sendPhoto(telegrammChatID, imageUrl, { caption: titleTxt + " " + messageTxt });
  } else {
    bot.sendMessage(telegrammChatID, titleTxt + " " + messageTxt);
  }

  const message = {
    registration_ids: deviceIDs,

    data: {
      title: titleTxt,
      message: datetime + ' ' + messageTxt,
      image: 'http://192.168.0.120:6080/door/photo/latest.jpg',
      actions: [
        { icon: "emailGuests", title: "Open", callback: "emailGuests", foreground: false },
        { icon: "snooze", title: "Cancel", callback: "snooze", foreground: false },
      ],
      style: 'inbox',
      summaryText: 'We got %n% guests',
      "ledColor": [0, 255, 0, 0],
      "vibrationPattern": [2000, 1000, 500, 500, 500, 1000],
      "visibility": 1
    }
  };
}
