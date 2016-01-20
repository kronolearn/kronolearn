var User = require('../models/User');
var Course = require('../models/Course');

module.exports = {

    getUserAndCourses: function (req, res) {
        console.log('getting to get user andc ourses back end');
        if (req.session.passport.user) {
            var userId = req.session.passport.user._id;
            User.findById(userId)
                .populate('coursesEnrolledIn')
                .populate('coursesAdminFor')
                // populate all cards-- array of card objects, and object ID is nested object card proprety
                .populate('cards.card')


            .exec(function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    User.populate(data, {
                        path: 'coursesEnrolledIn.topics',
                        model: 'Topic'
                    }, function () {
                        // res.send(data);

                        User.populate(data, {
                            path: 'coursesAdminFor.topics',
                            model: 'Topic'
                        }, function () {
                            res.send(data);
                        });






                    });

                };
            });

            //    .exec(function(err, data) {
            //        if(err) {
            //            res.status(500).send(err);
            //        }
            //        else{
            //         User.populate(data, {
            //             path: 'coursesAdminFor.topics', 
            //             model: 'Topic'
            //         }, function(){
            //             res.send(data);
            //         });
            //         }
            //    }); 



        }


    },


    getCardsToReview: function (req, res) {
        var userId = req.session.passport.user._id;
        User.findById(userId)
            .populate('coursesEnrolledIn')
            .populate('coursesAdminFor')
            .populate('cards.card')

        .exec(function (err, user) {
            if (err) return res.status(500).send(err);
            else {
                var cardsToReviewArray = [];
                var today = new Date();
                console.log(user.cards);
                for (var i = 0; i < user.cards.length; i++) {
                    //console.log("next review...", user.cards[i].dateNextReview.getTime());
                    //console.log("today is...", today.getTime());
                    if ((user.cards[i].dateNextReview).getTime() < (today).getTime()) {
                        cardsToReviewArray.push(user.cards[i]);
                    }
                }

                console.log("Cards to Review Array Final: ", cardsToReviewArray.length);
                return res.send(cardsToReviewArray);
            }
        })
    },

    enrollInCourse: function (req, res) {
        var courseId = req.query.courseId;
        var userId = req.query.userId;


        // first put userId into courses list of students
        Course.findById(courseId)
            .exec(function (err, course) {
                course.students.push(userId);
                course.save();
            });

        // then find User and add course to enrolled courses
        User.findById(userId)
            .exec(function (err, user) {
                user.coursesEnrolledIn.push(courseId);
                user.save();
            });

    }, // end of enroll in course

    leaveCourse: function (req, res) {
        var courseId = req.query.courseId;
        var userId = req.query.userId;

        // first remove student Id from course students
        Course.findById(courseId)
            .exec(function (err, course) {
                for (var i = 0; i < course.students.length; i++) {
                    // need to convert mongoose object ID to string, otherwise different types
                    var studentId = course.students[i].toString();
                    if (studentId === userId) {
                        course.students.splice(i, 1);
                        break;
                    }
                }
                course.save();
            });

        // then, remove course Id from student's list of enrolled courses
        User.findById(userId)
            .exec(function (err, user) {
                for (var k = 0; k < user.coursesEnrolledIn.length; k++) {
                    var course_id = user.coursesEnrolledIn[k].toString();
                    if (course_id === courseId) {
                        user.coursesEnrolledIn.splice(k, 1);
                        break;
                    }
                }
                user.save();
            })
    }, // end of leave course









    getUsers: function (req, res) {
        User.find().then(function (response) {
            res.send(response);
        });
    },

    addUser: function (req, res) {
        new User(req.body).save(function (err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(data);
            }
        });
    },

    getById: function (req, res) {
        User.findById(req.params.id, req.body, function (err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(data);
            }
        });
    },

    removeUser: function (req, res) {
        User.findByIdAndRemove(req.params.id, function (err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(data);
            }
        });
    },

    updateUser: function (req, res) {
        User.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(data);
            }
        });
    },

    updateUserAvatar: function (req, res) {

        User.findById(req.body.user._id)
            .exec(function (err, user) {
                user.avatar = req.imageUrl;

                user.save(function (err, user) {
                    res.send(user);
                })
            })


    },

    addUserCard: function (req, res) {
        var userId = req.body._id;
        var query = {
            _id: userId
        };
        console.log(req.body.cardObj);
        User.findOneAndUpdate(query, {
            $push: {
                cards: req.body.cardObj
            }
        }, {
            upsert: true,
            new: true
        }, function (err, doc) {
            if (err) return res.status(500).send(err);
            else {
                return res.send(doc);
            }
        });
    },

    updateUserCard: function (req, res) {
        var userId = req.body._id;
        //var cardIndex = req.body.reviewObj.cardIndex;
        var cardId = req.body.reviewObj.cardID;
        console.log("THIS IS CARD ID:", cardId);

        var newReview = req.body.reviewObj.newReview;

        User.findById(userId)
            .exec(function (err, user) {
                if (err) return res.status(500).send(err);
                else {
                    var correctIndex = null;
                    for (var i = 0; i < user.cards.length; i++) {
                        console.log("users.cards ID", user.cards[i]._id);
                        console.log("cardId = ", cardId);
                        if (user.cards[i].card == cardId) {
                            correctIndex = i;
                        }
                    }

                    user.cards[correctIndex].reviews.push(newReview);
                    user.cards[correctIndex].dateNextReview = req.body.reviewObj.dateNextReview;
                    user.save();

                    /*
                    user.cards[cardIndex].reviews.push(newReview);
                    user.cards[cardIndex].dateNextReview = req.body.reviewObj.dateNextReview;
                    user.save(); */
                    return res.send(user);
                }
            })
    },

    /*
        User.findOneAndUpdate(query, {$push: {cards[0].reviews: req.body.newReview}, dateNextReview: req.body.reviewObj.dateNextReview}, {upsert:true, new:true}, function(err, doc) {
            if (err) return res.status(500).send(err);
            else {
                return res.send(doc);
            }
        });
        
    },
    
    cards: [] */


    isAuth: function (req, res, next) {
        if (req) {
            if (req.session) {
                if (req.session.passport) {
                    if (req.session.passport.user) {
                        return res.send(req.session.passport.user);
                    }
                    return res.send('no user logged in');
                } else {
                    return res.send('no req.session.passport')
                }
            } else {
                return res.send('no req.session');
            }
        } else {
            return res.send('no req');
        }
    },


    auth: function (req, res) {
        res.send(req.user);
    }
};