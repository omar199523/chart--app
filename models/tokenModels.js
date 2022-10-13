const mongoose = require('mongoose');

const tokensSchema = mongoose.Schema({
    network:{
        type:String,
        requiresd:[true,'Please add network value']
    },
    name:{
        type:String,
        requiresd:[true,'Please add name value']
    },
    symbol:{
        type:String,
        requiresd:[true,'Please add symbol value']
    },
    timestamp:{
        type:String,
        requiresd:[true,'Please add timestamp value']
    },
    sellTradeCount:{
        type:String,
        requiresd:[true,'Please add sellTradeCount value']
    },
    address:{
        type:String,
        requiresd:[true,'Please add address value']
    },
    data:{
        type:Object,
        requiresd:[true,'Please add data value']
    }
},{
    timestamps:true
});

module.exports = mongoose.model('Tokens',tokensSchema);