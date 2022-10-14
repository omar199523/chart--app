const asyncHandler = require('express-async-handler');
const Tokens = require('../models/tokenModels.js')
//@desc Get Token
//@route GET /api/tokens
//@access public
const getTokens =asyncHandler(async (req,res)=>{
    const allToken =await Tokens.find()
    res.status(200).json(allToken);
}) 


//@desc Get Token
//@route GET /api/tokens
//@access public
const getTokenChart =asyncHandler(async (req,res)=>{
    const token =await Tokens.findById(req.params.id);
    res.status(200).json(token);
})


//@desc set Token
//@route POST /api/Token
//@access Private
const setToken =asyncHandler(async (req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error("please add a text field");

    }
    const token = await Tokens.create({
        text:req.body.text,
    })
    res.status(200).json(goal);
})

//@desc delete Token
//@route DELETE /api/Token
//@access Private
const deleteToken =asyncHandler(async(req,res)=>{
    const goal = Tokens.find({});

    if(!goal){
        res.status(400)
        throw new Error("Goal not found")
    }
    const deleteGoal = await Tokens.findByIdAndDelete(req.params.id);
    // or
    // await goal.remove();
    res.status(200).json({massage: `delete goal ${req.params.id}`})

})

//@desc update Token
//@route PUT /api/Token
//@access Private
const updateToken =asyncHandler(async(req,res)=>{
    const token =await Tokens.findById(req.params.id);

    if(!goal){
        res.status(400);
        throw new Error("Token not found")
    }
    const updateToken = await Tokens.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json({massage:`Update Tokens ${req.params.id}`})
})


module.exports ={
    getTokens,
    setToken,
    deleteToken,
    updateToken,
    getTokenChart 

}