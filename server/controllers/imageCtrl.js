var AWS = require('aws-sdk');
var Secret = require('../config/Secret');

// Hard amazon aws config
AWS.config.update({
    // accessKeyId: process.env.s3accessKeyId, //Keys.amazonS3.accessKeyId, 
    // secretAccessKey: process.env.s3secretAccessKey,//Keys.amazonS3.secretAccessKey,
    // region: process.env.s3region//Keys.amazonS3.region

    accessKeyId: Secret.amazonS3.accessKeyId,
    secretAccessKey: Secret.amazonS3.secretAccessKey,
    region: Secret.amazonS3.region


  });

var s3 = new AWS.S3();

var exports = module.exports = {};


exports.saveCourseImage = function (req, res, next) {

  // console.log(req.body);


  var buf = new Buffer(req.body.imageValue.replace(/^data:image\/\w+;base64,/, ""), 'base64');

  // bucketName var below crates a "folder" for each user
  var bucketName = 'kronolearn/coursePics'/* + req.body.userEmail*/;
  var params = {
    Bucket: bucketName
    , Key: req.body.imageName
    , Body: buf
    , ContentType: 'image/' + req.body.imageExtension
    , ACL: 'public-read'
  };

  s3.upload(params, function (err, data) {
    console.log(err, data);
    if (err) return res.status(500).send(err);
    console.log("Amazon S3 FINAL RESULT: ", data);
    
    // TODO: save data to mongo

    req.imageUrl = data;
    next();

    // res.json(data);
  });

};

exports.saveUserAvatar = function (req, res) {
  buf = new Buffer(req.body.imageBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');

  // bucketName var below crates a "folder" for each user
  var bucketName = 'kronolearn/userAvatars'/* + req.body.userEmail*/;
  var params = {
    Bucket: bucketName
    , Key: req.body.imageName
    , Body: buf
    , ContentType: 'image/' + req.body.imageExtension
    , ACL: 'public-read'
  };

  s3.upload(params, function (err, data) {
    console.log(err, data);
    if (err) return res.status(500).send(err);
    console.log("Amazon S3 FINAL RESULT: ", data);
    // TODO: save data to mongo
    res.json(data);
  });
};

exports.saveTopicImage = function (req, res) {
  buf = new Buffer(req.body.imageBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');

  // bucketName var below crates a "folder" for each user
  var bucketName = 'kronolearn/topicPics'/* + req.body.userEmail*/;
  var params = {
    Bucket: bucketName
    , Key: req.body.imageName
    , Body: buf
    , ContentType: 'image/' + req.body.imageExtension
    , ACL: 'public-read'
  };

  s3.upload(params, function (err, data) {
    console.log(err, data);
    if (err) return res.status(500).send(err);
    console.log("Amazon S3 FINAL RESULT: ", data);
    // TODO: save data to mongo
    res.json(data);
  });
};