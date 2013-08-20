var utils    = require( 'connect' ).utils;

    exports.current_user = function(req, res, next){
    if(!req.cookies.user_id){
        res.cookie('user_id', utils.uid(32));
    }

    next();
};