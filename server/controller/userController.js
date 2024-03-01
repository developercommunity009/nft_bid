const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");
const APIFeatures = require("../Utils/apiFeatures");
dotenv.config({ path: "../config.env" });
const contactEmail = require("../Utils/contactMail");
const userEmail = require("../Utils/userMail");



const filterObj = (obj, ...allowFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowFields.includes(el)) {
            newObj[el] = obj[el]
        };
    })
    return newObj;
}


exports.updateMe = catchAsync(async (req, res, next) => {

    // Create Error While user updating password
    if (req.body.password || req.body.confrimPassword) {
        return next(new AppError("this route Not for password Update please use /updatingpassword", 400));
    }
    
    // Update User Data
    // user can Only Change name , email , photo , discription Not for all
    const filtereBody = filterObj(req.body, "name", "image" , "email" ,"website","facebook" , "twitter",
    "instagram", "discreption" , "wallet");
    const updateUser = await User.findByIdAndUpdate(req.user.id, filtereBody, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        status: "success",
        data: {
            updateUser
        },
    })
})

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
    res.status(202).json({
        statas: "success",
        message: "De-Active"
    })
})

exports.getAllUsers = catchAsync(async (req, res, next) => {

    const users = await User.find();

    res.status(200).json({
        status: "success",
        result: users.length,
        data: { users }
    })
    return next(new AppError("Internal Server Error", 500));
})




exports.createUsers = (req, res) => {
    res.status(501).json({
        status: "error",
        message: "Internal Server Error"
    })
}

exports.getSingalUser = catchAsync(async(req, res) => {
    const user = await User.findById(req.params.id).populate("whislist").populate("following").populate("followors");
      if(!user){
        return next(new AppError("User Doesn't Exist in DB", 500));
      }
    res.status(200).json(user);
})

exports.updateUsers = (req, res) => {
    res.status(502).json({
        status: "error",
        message: "Internal Server Error"
    })
}

exports.deleteUsers = (req, res) => {
    res.status(503).json({
        status: "error",
        message: "Internal Server Error"
    })
}


exports.createContactMail = catchAsync(async(req , res)=>{
    
    const { discreption ,email , name } = req.body;
    const user = await User.findOne({email});
    if(!user){
        return next(new AppError("Uset Dosn't Exist with This Email", 400));
    }

    // const resetURL = `Hi ,Pleace follow this link to reset Your Password . This link is valid till 5 minutes from now . <a href=http://localhost:3000/resetpassword/${resetToken}>Click Here</a>`

    try {
        await contactEmail({
            email: email,
            subject: `User ${name} Need SomeThings`,
            message: "This is Contatact Us Mail",
            html:discreption
        })

        res.status(200).json("message send successfly");


    } catch (error) {
        return next(new AppError("there was an error , try Again later", 502))
    }

})

exports.createUserMail = catchAsync(async(req , res)=>{

    const { discreption ,email , name } = req.body;
    const user = await User.findOne({email});
    if(!user){
        return next(new AppError("Uset Dosn't Exist with This Email", 400));
    }

    try {
        await userEmail({
            email: email,
            subject: `Hey  ${name} `,
            message: `${name} regarding your query` ,
            html:`we are here gor your help this is your query ${discreption} Our team Contant with you Thanks ${name} for reached Us`
        })

        res.status(200).json("message send successfly");


    } catch (error) {
        return next(new AppError("there was an error , try Again later", 502))
    }


})