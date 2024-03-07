var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemScehma = new Schema({
    name: String,
    quantity: String,
    date: String,
    price: String
});


mongoose.model('Item', ItemScehma);
