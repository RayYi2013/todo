var controllersPath = '../app/controllers/';

exports.initializeRoutes = function (app) {
    homeRoutes(app);
    todoRoutes(app);
}

function homeRoutes(app) {
    var homeController = require(controllersPath + 'homeController');
    app.get('/', homeController.index);
};

function todoRoutes(app) {
    var todoController = require(controllersPath + 'todoController');
    app.get('/todo', todoController.index);
    app.post('/todo/create', todoController.create);
    app.get('/todo/destroy/:id', todoController.destroy);
    app.get('/todo/edit/:id', todoController.edit);
    app.post('/todo/update/:id', todoController.update);
};

