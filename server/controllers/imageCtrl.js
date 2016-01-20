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

  // req.body is a course, so looks like
  //  {
  //    name: 
  //    description: 
  //    imageObj: {
  //       imageName: 
  //       imageExtension: 
  //       imageValue:  (big string that is actual data)
  //    
  //    }
  // }


  // console.log(req.body);

  // users aren't required to add image when creating course, so possible
  // not included
  if(req.body.imageObj){

    var imageObj = req.body.imageObj;


    var buf = new Buffer(imageObj.imageValue.replace(/^data:image\/\w+;base64,/, ""), 'base64');

    // bucketName is amazon where data is stored
    var bucketName = 'kronolearn/coursePics';
    var params = {
      Bucket: bucketName
      , Key: imageObj.imageName
      , Body: buf
      , ContentType: 'image/' + imageObj.imageExtension
      , ACL: 'public-read'
    };

    s3.upload(params, function (err, data) {
      console.log(err, data);
      if (err) return res.status(500).send(err);
      console.log("Amazon S3 FINAL RESULT: ", data);

      // TODO: save data to mongo

      // final URL amazon returns 
      req.imageUrl = data.Location;
      next();

    });
  } // end of if statement


  // if no image, just continue to add course
  else{
    next();
  }
};










exports.saveUserAvatar = function (req, res, next) {
  // console.log(req.body);
  var imageObj = req.body.imageObj;
  console.log(imageObj.imageName);
  // console.log(imageObj)

  var buf = new Buffer(imageObj.imageValue.replace(/^data:image\/\w+;base64,/, ""), 'base64');

  // // bucketName var below crates a "folder" for each user
  var bucketName = 'kronolearn/userAvatars'/* + req.body.userEmail*/;
  var params = {
    Bucket: bucketName
    , Key: imageObj.imageName
    , Body: buf
    , ContentType: 'image/' + imageObj.imageExtension
    , ACL: 'public-read'
  };

  s3.upload(params, function (err, data) {
    console.log(err, data);
    if (err) return res.status(500).send(err);
    // console.log("Amazon S3 FINAL RESULT: ", data);

    req.imageUrl = data.Location;
    console.log(data.Location);
    next();
  });



};









exports.saveTopicImage = function (req, res, next) {
  var newTopic = req.body;
  var imageObj = newTopic.imageObj;

  // if imageObj exists, then do amazon s3 stuff, otherwise go to next function
  // (adding topic)
  imageObj ? amazonS3() : next()



  function amazonS3(){
    var buf = new Buffer(imageObj.imageValue.replace(/^data:image\/\w+;base64,/, ""), 'base64');



    var bucketName = 'kronolearn/topicPics';
    var params = {
      Bucket: bucketName
      , Key: imageObj.imageName
      , Body: buf
      , ContentType: 'image/' + imageObj.imageExtension
      , ACL: 'public-read'
    };

    s3.upload(params, function (err, data) {
      console.log(err, data);
      if (err) return res.status(500).send(err);
    // console.log("Amazon S3 FINAL RESULT: ", data);

    req.imageUrl = data.Location;
    console.log(data.Location);
    next();
  });
  }





  // buf = new Buffer(req.body.imageBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');

  // // bucketName var below crates a "folder" for each user
  // var bucketName = 'kronolearn/topicPics'/* + req.body.userEmail*/;
  // var params = {
  //   Bucket: bucketName
  //   , Key: req.body.imageName
  //   , Body: buf
  //   , ContentType: 'image/' + req.body.imageExtension
  //   , ACL: 'public-read'
  // };

  // s3.upload(params, function (err, data) {
  //   console.log(err, data);
  //   if (err) return res.status(500).send(err);
  //   console.log("Amazon S3 FINAL RESULT: ", data);
  //   // TODO: save data to mongo
  //   res.json(data);
  // });


};












