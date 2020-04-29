//const express = require('express');

//const router = express.Router();

//const BlogPost = require('../models/blogPost');


//router.get('/', (req, res) => {

//    BlogPost.find({})
//        .then((data) => {
//            console.log('Data: ', data);
//            res.json(data);
//        })
//        .catch((error) => {
//            console.log('error: ', error);
//        });
//});



//router.post('/save', (req, res) => {
//    const data = req.body;

//    const newBlogPost = new BlogPost(data);

//    newBlogPost.save((error) => {
//        if (error) {
//            res.status(500).json({ msg: 'Sorry, internal server errors' });
//            return;
//        }

//        return res.json({
//            msg: 'Your data has been saved!!!!!!'
//        });
//    });
//});
//router.delete('/save/:id', (req, res) => {
//    newBlogPost.findOneAndDelete({ _id: req.params.id })
//        .then(() => {
//            res.json({ status: 'Task Deleted!' })
//        })
//        .catch(err => {
//            res.send('error: ' + err)
//        })
//})





//module.exports = router;


const express = require('express');
const app = express();
const BlogPost = require('../models/blogPost');

app.get('/tasks',  (req, res)=> {
    BlogPost.find()
        .then(tasks => {
            res.json(tasks)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

//app.get('/task/:id', function (req, res, next) {
//    Task.findOne({
//        where: {
//            id: req.params.id
//        }
//    })
//        .then(task => {
//            if (task) {
//                res.json(task)
//            } else {
//                res.send('Task does not exist')
//            }
//        })
//        .catch(err => {
//            res.send('error: ' + err)
//        })
//})

app.post('/task',  (req, res)=> {
    if (!req.body.task_name) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        BlogPost.create(req.body)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.json('error: ' + err)
            })
    }
})

app.delete('/task/:id', (req, res) => {
    BlogPost.findOneAndDelete({ _id: req.params.id })
        .then(() => {
            res.json({ status: 'Task Deleted!' })
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

app.put('/task/:id',  (req, res)=> {
    if (!req.body.task_name) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        BlogPost.findOneAndUpdate(
            { _id: req.params.id },
            { task_name: req.body.task_name }
        )
            .then(() => {
                res.json({ status: 'Task Updated!' })
            })
            .catch(err => {
                res.send('error: ' + err)
            })
    }
})


module.exports = app
