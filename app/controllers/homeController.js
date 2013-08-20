exports.index = function (req, res) {
    switch (req.params.format) {
        case 'json':
            break;
        default:
            break;
    }
    res.render('index', {
        user: req.user,
        title: "CRM"
    });
};