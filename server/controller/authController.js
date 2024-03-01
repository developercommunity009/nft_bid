
const crypto = require("crypto");  // crypto is rendomly installed
const User = require("../Model/userModel");
const NFT = require("../Model/nftModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");
const { promisify } = require("util");
const sendEmail = require("../Utils/email");
const { isWhitelisted } = require("validator");



// CREATING TOKENA
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY, });
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookiesOtions = {
        expires: new Date(
            Date.now() + process.env.COOKIES_EXPIRY_DATE * 24 * 60 * 60 * 1000 // we give te Date miliSeconds
        ),
        // secure:true,
        httpOnly: true,
    }

    // if(process.env.NODE_ENV == "production") cookiesOtions.secure = true;
    res.cookie("jwt", token, cookiesOtions);
    user.password = undefined;

    res.status(statusCode).json({
        token,
        user
    })
}


//  SINGUP
exports.singup = catchAsync(async (req, res) => {
    const newUser = await User.create(req.body);

    // const newUser = await User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     confrimPassword: req.body.confrimPassword,
    // });

    createSendToken(newUser, 200, res);
})


//  LOGIN
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(402).json({
            Error: "Please Provid Proper Email and password"
        });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect email and password", 401))
    }
    createSendToken(user, 201, res);
})
// GoogleUser
exports.googleLogin = catchAsync(async (req, res, next) => {
    const { email, name } = req.body;
    if (!email || !name) {
        res.status(402).json({
            Error: "Please Provid Proper Email and password"
        });
    }

    const user = await User.findOne({ email });
    if (user) {
        return createSendToken(user, 201, res);
        // return next(new AppError("Incorrect email and password", 401))
    }
    const newUser = new User({
        email,
        name
    });

    const googleUser = await newUser.save();

    createSendToken(googleUser, 201, res);
})

//PROTECTON DATA
exports.protect = catchAsync(async (req, res, next) => {
    // CHECK TOKEN
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new AppError("You are not Logged In in to get Access! ", 403));
    }

    // Validate Token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // // user Eixst
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError("the User Belonging to this token no longer Exist ", 405))
    }

    // // // change password
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError("User Resently chang the password", 401));
    }

    // // // USER WILL HAVE THE PRODUCTVE DATA
    req.user = currentUser;
    next();
})


exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("You have not access to delete NFT", 403))
        }
        next();
    }
}


// ----------  CHANGING PASSWORD   -------------------------------

// ---- FORGET PASSWORD
exports.forGetPassword = catchAsync(async (req, res, next) => {

    // Get the user based on given Email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError("there is NO User with this Email ID ", 404));
    }
    
    // Create a rendom Token
    const resetToken = user.createPasswordRestToken();
    await user.save({ validateBeforeSave: false });
    
    // Send Email back to User
    // "protocol" works on all envirments
    // const resetURL = `${req.protocol}://${req.get("host")}/api/v1/auth/resetpassword/${resetToken}`;
    const resetURL = `Hi ,Pleace follow this link to reset Your Password . This link is valid till 5 minutes from now . <a href=http://localhost:3000/resetpassword/${resetToken}>Click Here</a>`
    
   
    try {
        await sendEmail({
            email: user.email,
            subject: "Your Password Reset Token",
            message: "Forgot Your Password ? Submit The PATCH Request with your new Password & confrimPassword to : Below",
            html: resetURL
        })


        res.status(200).json("token send to your email address");


    } catch (error) {
        user.passwordRestToken = undefined;
        user.passwordRestExpries = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new AppError("there was no error sending the email , try Again later", 502))
    }

})

// ---- RESET PASSWORD  
exports.reSetPassword = catchAsync(async (req, res, next) => {

    // Get user based on the token
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
        passwordRestToken: hashedToken,
        passwordRestExpries: { $gt: Date.now() }
    })
    // If token has not expried , and there is user , set the new password
    if (!user) {
        return next(new AppError("Token is invalid or is Expire", 404))
    }

    // Update changedpassword for the user

    user.password = req.body.password;
    user.confrimPassword = req.body.confrimPassword;
    user.passwordRestToken = undefined;
    user.passwordRestExpries = undefined;
    await user.save();

    res.status(200).json("password reset success");
    // Log the user in , send JWT
    // createSendToken(user , 200 , res);
})

// ----------  UPDATING PASSWORD   -------------------------------
exports.updatingPassword = catchAsync(async (req, res, next) => {

    // Get user from collection of data
    const user = await User.findById(req.user._id).select("+password");
    // Check if the Posted current password is correct
    if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
        return next(new AppError("Your current Password is Wrong ", 402));
    }
    // if So< Update The Password
    user.password = req.body.password;
    user.confrimPassword = req.body.confrimPassword;
    await user.save();
    // Log user after password change
    createSendToken(user, 203, res);
})
//    ------- whislist -----------
exports.whislist = catchAsync(async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { nftId } = req.body;
        
        // Retrieve the user
        const user = await User.findById(_id);
        const nft = await NFT.findById(nftId);
      
        if (!user) {
            return next(new AppError("User Does not Exist in D.B ", 402));
        }
        if (!nft) {
            return next(new AppError("NFT Does not Exist in D.B ", 404));
        }
    

        // Check if the user is already following the NFT
        const isWhishList = user.whislist.some(prodId => prodId.equals(nftId));
        const isLikes = nft.likes.some(userId => userId.equals(_id));
        if(isWhishList && isLikes){
            user.whislist.pull(nftId);
            nft.likes.pull(_id);
        } else {
            user.whislist.push(nftId);
            nft.likes.push(_id);
        }
        
        await user.save();
        await nft.save();
        

        res.status(200).json({ message: `${isWhishList ? 'removeWhislist' : 'addWhislist'} NFT` , user  ,nft });
    } catch (error) {
        return next(new AppError("Internal Server Error", 502))
    }





})


//    ------- get  whislist -----------
exports.getWhislist = catchAsync(async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return next(new AppError("User Does not Exist in D.B ", 402));
        }
        res.status(200).json({ "whislist Qnty": user.whislist.length, "wishlists": user.populate("whislist") });

    } catch (error) {
        return next(new AppError("Internal Server Error", 502))
    }
})

//-------- following --------------

exports.following = catchAsync(async (req, res, next) => {
  
    
    try {
        const { userId } = req.body;
        const { _id } = req.user;
        
        // Retrieve the user
        const user = await User.findById(_id);
        const follow = await User.findById(userId);
        if (!user) {
            return next(new AppError("User Does not Exist in D.B ", 402));
        }
        if (!follow) {
            return next(new AppError("User Does not Exist in D.B ", 404));
        }
    

        // Check if the user is already following the NFT
        const isFollowing = user.following.some(followingId => followingId.equals(userId));
        const isFollower = follow.followors.some(followerId => followerId.equals(_id));
        // Toggle follow status
        if (isFollowing && isFollower){
            user.following.pull(userId);
            follow.followors.pull(_id);
        } else {
            user.following.push(userId);
            follow.followors.push(_id);
        }

        await user.save();
        await follow.save();


        res.status(200).json({ message: `${isFollowing ? 'unfollowed' : 'followed'}`, user  ,follow });
    } catch (error) {
        return next(new AppError("Internal Server Error", 502))
    }

})

//  ---------- get followers  ----

exports.getFollowers = catchAsync(async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return next(new AppError("User Does not Exist in D.B ", 402));
        }
        res.status(200).json({ "follwers Qnty": user.following.length, "follwers": user.populate("following") });

    } catch (error) {
        return next(new AppError("Internal Server Error", 502))
    }
})