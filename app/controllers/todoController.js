var mongoose = require('mongoose'),
    Todo = mongoose.model('Todo'),
    utils    = require( 'connect' ).utils,
    rootFolder = '/todo';

/*
 * GET home page.
 */

exports.index = function(req, res){
    Todo.find({user_id:req.cookies.user_id}).sort('-update_at').exec(function(err,todos,count){
        res.render('todo/index', {
            title: 'Express Todo Example',
            todos: todos
        });
    });
};

exports.create = function(req,res){
    new Todo({
        user_id:req.cookies.user_id,
        content: req.body.content,
        update_at: Date.now()
    }).save(function (err, todo, count){
            res.redirect(rootFolder);
        });
};


exports.destroy = function(req,res){
    Todo.findById(req.params.id, function(err, todo){
        if(todo.user_id != req.cookies.user_id){
            return utils.forbidden(res);
        }
        todo.remove(function(err, todo){
            res.redirect(rootFolder);
        });
    });
};

exports.edit = function(req,res){
    Todo.find({user_id:req.cookies.user_id}).sort( '-updated_at').exec( function(err, todos){
        res.render('todo/edit', {
            title: 'Express Todo Example',
            todos: todos,
            current: req.params.id
        });
    });
};

// redirect to index when finish
exports.update = function ( req, res ){
    Todo.findById( req.params.id, function ( err, todo ){
        todo.content    = req.body.content;
        todo.updated_at = Date.now();
        todo.save( function ( err, todo, count ){
            res.redirect(rootFolder );
        });
    });
};

