const mongoose = require('mongoose');
const {Schema} = mongoose;

const webPageSchema = new Schema({
    url: String,
    text: String,
    blackListed: Boolean
});

webPageSchema.index({text: 'text'});

const WebPageModel = mongoose.model('WebPage', webPageSchema, 'web_site');

module.exports = WebPageModel;
