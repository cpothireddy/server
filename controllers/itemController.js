var mongoose = require('mongoose'),
Item = mongoose.model('Item');

exports.create = function (req, res) {
    var theItem = new Item(req.body);
    console.log("chandra",JSON.stringify(theItem));
    theItem.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.send(theItem);
        }
    });
};

exports.all = function (req, res) {
    Item.find({}).exec(function (err, items) {
        if (err) {
            res.failure(err)
        } else {
            res.json(items);
        }
    })
}