const mongoose = require("mongoose");
const slugify  = require("slugify");
const validator  = require("validator");



const biddingSchema = new mongoose.Schema({
    bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
  });
  


const nftSchema = new mongoose.Schema({


    tokenId:{type:String , required:[true, "NFT Id should provided"],  unique: true, index:true},
    tokenURL:{type:String , require:[true, "NFT url Should provided"]},
    metadata: {
        name:{
            type:String,
            required: [true, "NFT Must Have a name"],
            trim: true,
            unique: true,
            maxlength : [40 , "nft must have 40 character"],
            minlength : [4 , "nft must have 4 character"],
            validate : [validator.isAlpha , "nft name must only contain Chracter"]
        },
        description:{
            type: String,
            trim: true,
            required:[true , "Must Provid the description "]
        },
        image: { type: String },
      },
   slug : String,

   category: {
    type: String,
    required: [true, "must have provided"],
    enum:{
        values : ["Sport","Art","Music","Digital","Time"],
        message : "Difficulty is either: Sport , Art , Music , Digital , Time ",
    },
},

ratingsAverage: [{
    star: Number,
    postedby : { type : mongoose.Schema.Types.ObjectId  , ref : "User"}
  
}],

ratingsQuantity: {
    type : String,
    default: 0
},

price: {
    type: Number,
    required: [true, "NFT Must Provie Price"],
},
fileSize:{
    type: String,
    trim: true,
},
properties:{
    type: String,
    trim: true,
},
royalties:{
    type: String,
    trim: true,
},
website:{
    type: String,
    trim: true,
},

secratNFT:{
    type:Boolean,
    default: false,
},

listedNFT:{
    type:Boolean,
    default: true,
},
biddingDuration:{},
creator:{ type: mongoose.Schema.Types.ObjectId, ref: 'User'},
views:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
likes:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],

seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

ownershipHistory: [{
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  transaction: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
  date: { type: Date, default: Date.now }
}],


currentHighestBid: biddingSchema,

bids:[biddingSchema],

startTime: { type: Date},
endTime: { type: Date},
 }, 
 
 {timestamps:true});

// nftSchema.virtual("durationWeeks").get(function(){
//     return this.duration / 7;
// })

// ------   MONGOOSE MIDLEWARE

//  ------------------------- PRE - HOOKS --------------------------------------------

// DOCUMENT MIDLEWARE : runs before .save() or .create()
nftSchema.pre("save", function(next){
    this.slug = slugify(this.metadata.name , {lower : true});
    next();
})



// nftSchema.pre("save", function(next){
//     console.log("document will sve ..... ")
//     next();
// })


//--- QUERY MIDDELWARE
//---------  "find" only for GET
// nftSchema.pre("find", function(next){
//     this.find({secratNFT: {$ne: true}})
//     next();
// })
//---------- "findOne" for GET , POST , PATCH , DELETE
// nftSchema.pre("findOne", function(next){
//     this.find({secratNFT: {$ne: true}})
//     next();
// })


//----    /^find/  for all  Global aproch in DataBase (SINGALE, GET , POST , PATCH , DELETE)
// hide information Based on "secratNFT" 
nftSchema.pre(/^find/, function(next){
    this.find({secratNFT: {$ne: true}});
    this.start = Date.now(); 
    next();
})

//  ------------------------- POST - HOOKS -----------------------------------------------------

nftSchema.post(/^find/, function(doc ,next){
    console.log(`Query took time => ${Date.now() - this.start} times`);
    next();
})

// ------   AGRIGATE MIDLEWARE
nftSchema.pre(("aggregate"), function(next){
    this.pipeline().unshift({$match: { secratNFT:{$ne : true}}})
    next();
})



const NFT = mongoose.model("NFT", nftSchema);

module.exports = NFT;