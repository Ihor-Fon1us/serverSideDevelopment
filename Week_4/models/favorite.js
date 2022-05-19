const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
    postedBy: {
        required: true,
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
        
    },
    dishes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' } ] 
},
{
    timestamps : true
});


module.exports = mongoose.model('FavoriteSchema', FavoriteSchema);