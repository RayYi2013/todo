var mongooes = require('mongoose'),
    Schema = mongooes.Schema,
    Todo = new Schema({
        user_id: String,
        content: String,
        update_at: Date
    });

mongooes.model('Todo', Todo);
mongooes.connect('mongodb://localhost/express-todo');
