
const NFT = require("../Model/nftModel");
const APIFeatures = require("../Utils/apiFeatures");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const { ObjectId } = require('mongodb');

exports.alainsTopNFTs = async (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = "-ratingsAverage";
    req.query.fields = "name , price ,  ratingsAverage, difficulty "
    next();
}

exports.getAllNfts = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(NFT.find().populate("creator").populate("likes"), req.query)
        .filter()
        .sortt()
        .limitFields()
        .pagination();

    const nfts = await features.query;
    res.status(200).json({
        status: "success",
        result: nfts.length,
        data: {
            nfts
        }
    })
})

exports.getTotalNfts = catchAsync(async (req, res, next) => {
    try {
        // Fetch all documents from the collection
        const allData = await NFT.find().populate("creator").populate("likes");
        // Return the fetched data as JSON response
        res.status(202).json({result: allData.length, allData});
    } catch (error) {
        next(new AppError("inter server Error", error, 500));
    }
})

exports.getTotalNftsDb = catchAsync(async (req, res, next) => {
    try {
        // Fetch all documents from the collection
        const allData = await NFT.find({listedNFT:true}).populate("creator").populate("likes");
        // Return the fetched data as JSON response
        res.status(202).json({result: allData.length, nfts: allData});
    } catch (error) {
        next(new AppError("inter server Error", error, 500));
    }
})

exports.getUserNftsDb = catchAsync(async (req, res, next) => {
    
    const {_id} = req.user;
    console.log(_id);
    if(!_id){
        return next(new AppError(`No User Eist with tht ${_id}`, 404));
    }
    try {
        // Fetch all documents from the collectionuserNfts
        const userNfts = await NFT.find({seller:_id}).populate("likes")
        if(!userNfts){
            return next(new AppError(`No Nft found with tht ${_id}`, 404));
        }
        // Return the fetched data as JSON respons
        res.status(202).json({result: userNfts.length,  nfts: userNfts});
    } catch (error) {
        next(new AppError("inter server Error", error, 500));
    }
})

exports.getUserDeListed = catchAsync(async (req, res, next) => {
    const {_id} = req.user;
    if(!_id){
        return next(new AppError(`No User Eist with tht ${_id}`, 404));
    }
    try {
        // Fetch all documents from the collectionuserNfts
        const userNfts = await NFT.find({seller:_id ,listedNFT:false})
        if(!userNfts){
            return next(new AppError(`No Nft found with tht ${_id}`, 404));
        }
        // Return the fetched data as JSON respons
        res.status(202).json({result: userNfts.length, nfts: userNfts});
    } catch (error) {
        next(new AppError("inter server Error", error, 500));
    }
})



exports.createNfts = catchAsync(async (req, res, next) => {
    const newNFT = await NFT.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            nft: newNFT
        }
    })
    next();
});

exports.reSaleNfts = catchAsync(async (req, res, next) => {

    const { price } = req.body;
    try {
        const newNFT = await NFT.findById(req.params.id);
        if (!newNFT) {
            throw new AppError(`No Nft found with that ${req.params.id}`, 404);
        }

        newNFT.price = price;
        newNFT.listedNFT = true;
        
        const updated = await newNFT.save();
        console.log(updated);
        
        res.status(201).json(updated);
    } catch (error) {
        res.status(500).json("Enternal Server Error  ",error)
        next(error);
    }
});

exports.getSingalNfts = catchAsync(async (req, res, next) => {
    const nft = await NFT.findById(req.params.id)
        .populate("likes")
        .populate("creator")
        .populate("currentOwner")
        .populate("ownershipHistory.owner")
        .populate("ownershipHistory.transaction")
        .populate("seller")
        .populate("bids.bidder");

    if (!nft) {
        next(new AppError('No Nft found with tht ID', 404));
    }
    res.status(200).json(nft)
})

exports.updateNfts = catchAsync(async (req, res, next) => {
    const nft = await NFT.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!nft) {
        return next(new AppError('No Nft found with tht ID', 404));
    }
    res.status(202).json({
        status: "success",
        data: {
            nft
        }
    })
})


exports.bayNfts = catchAsync(async (req, res, next) => {
    
    const { _id }=req.user;
    if(!_id){
        return next(new AppError(`No User Found `, 403));
    }
    
    const {ownerData} = req.body;
    if(!ownerData){
        return next(new AppError(`No Transaction Data Found `, 404));
    }
    
    const nft = await NFT.findByIdAndUpdate(
        req.params.id, 
        { seller: _id, listedNFT: false, $push: { ownershipHistory: ownerData } },
        { new: true } // To return the updated document
    );

    if (!nft) {
        return next(new AppError(`No Nft found with ${req.params.id}`, 404));
    }
    const updated = await nft.save();
    res.status(202).json(updated)
})



exports.bayNftsByBid = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    const { bidder, amount } = req.body;
    try {
        const nft = await NFT.findById(id);
        if (!nft) {
            return next(new AppError('NFT not found', 403));
        }
        if (amount <= nft.currentHighestBid?.amount || amount <= nft.startingPrice) {
            return next(new AppError('Bid amount must be higher than current highest bid or starting price', 404));
        }

        // Create a new bid object based on BidSchema
        const newBid = {
            bidder,
            amount,
            timestamp: Date.now() // You can also use `new Date()` to get the current date/time
        };

        // Update current highest bid if the new bid is higher
        if (!nft.currentHighestBid || amount > nft.currentHighestBid.amount) {
            nft.currentHighestBid = newBid;
        }

        // Add new bid to bids array
        nft.bids.push(newBid);

        await nft.save();
        res.status(200).json(nft);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

});


exports.finalizeAuction = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const {ownerData} = req.body;

    try {
        if(!ownerData){
            return next(new AppError(`No Transaction Data Found `, 404));
        }

        const nft = await NFT.findById(id);
        if (!nft) {
            return next(new AppError('NFT not found', 403));
        }

        if (nft.bids.length === 0) {
            return next(new AppError('No bids found for this NFT', 404));
        }

        // Get the highest bid
        const highestBid = nft.bids.reduce((prev, current) => (prev.amount > current.amount) ? prev : current);
        console.log(highestBid);

        nft.listedNFT = false;
        nft.seller = highestBid.bidder;
        nft.ownershipHistory.push(ownerData);
        nft.startTime = null; 
        nft.endTime = null ;
        nft.currentHighestBid = null;
        nft.bids = [];

        await nft.save();

        res.status(200).json(nft);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

exports.rellSellNFTByBid = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { price , endingTime} = req.body;
      console.log(price , endingTime);
    try {
        const newNFT = await NFT.findById(id);
        if (!newNFT) {
            return next(new AppError(`No Nft found with that ${req.params.id}`, 404));
        }
        if (!endingTime) {
            return next(new AppError(`Should be provide endTime`, 405));
        }
        if ( endingTime <= 0) {
            return next(new  AppError(`Invalid endTime format.`, 400));
        }

        newNFT.listedNFT = true;
        newNFT.price = price; 
        newNFT.startTime= new Date(Math.floor(Date.now() / 1000) * 1000)  ;
        newNFT.endTime= new Date(Date.now() + endingTime * 1000);
       
         await newNFT.save();
         console.log(newNFT);
        
        res.status(201).json(newNFT);
    } catch (error) {
        res.status(500).json("Enternal Server Error  ",error)
        next(error);
    }
});

exports.deleteNfts = catchAsync(async (req, res, next) => {
    const nft = await NFT.findByIdAndDelete(req.params.id);
    if (!nft) {
        return next(new AppError('No Nft found with tht ID', 404));
    }
    res.status(204).json({
        status: "success",
        data: null
    })
})


exports.viewedNFT = catchAsync(async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { nftId } = req.body;
        const nft = await NFT.findById(nftId);
        if (!nft) {
            return next(new AppError('No Nft found with tht ID', 404));
        }
        const isViewed = nft.views.some(userId => userId.equals(_id));
        if (isViewed) {
            // nft.views.pop(_id)
            return res.status(203).json("User Already Viwed This Nft")
        } else {
            nft.views.push(_id)
        }
        await nft.save();

        return res.status(201).json({ message: "Viewed", nft })

    } catch (error) {
        next(new AppError("inter server Error", error, 500));
    }

})

//  AGRIGATION PIPELINE 
exports.getNftsSatus = catchAsync(async (req, res, next) => {

    const status = await NFT.aggregate([
        {
            $match: { ratingsAverage: { $gte: 4.5 } },
        },
        {
            // We can grouping base of diffirent fields  this is Mathematics calculation
            $group:
            {
                _id: { "$toUpper": "$difficulty" },
                // _id: "$ratingsAverage", 
                // _id: "$ratingsAverage",
                numNFT: { $sum: 1 },
                numRatings: { $sum: "$ratingsQuantity" },
                avgRating: { $avg: "$ratingsAverage" },
                avgPrice: { $avg: "$price" },
                minPrise: { $min: "$price" },
                maxPrice: { $max: "$price" },

            },
        },
        {
            $sort: { avgRating: -1 }
        },

    ])

    res.status(202).json({
        status: "succcess",
        data: status
    })
})

// CALCULATE NUMBERS OF CREATE IN THE  MONTH OR MONYHLY PLAN
exports.getMonthlyPlan = catchAsync(async (req, res, next) => {

    const year = req.params.year * 1;
    const plan = await NFT.aggregate([
        {
            $unwind: "$startDates"
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                }
            }
        },
        {
            $group: {
                _id: { $month: "$startDates" },
                numNFTStarts: { $sum: 1 },
                nfts: { $push: "$name" }
            },
        },
        {
            $addFields: {
                month: "$_id"
            },
        },
        {
            $project: {
                _id: 0,
                // _id:1,
            }
        },
        {
            $sort: { numNFTStarts: 1 }
        },
        {
            $limit: 3
        },
    ])

    res.status(203).json({
        status: "success",
        // result:plan.length,
        data: plan
    })
})


exports.rating = catchAsync(async (req, res, next) => {
    const { _id } = req.user;
    const { star, nftId } = req.body;

    if (!star) {
        return next(new AppError('Add rating first', 404));
    }

    let _idAsObjectId = ObjectId(_id);
    try {
        const nft = await NFT.findById(nftId);

        let alreadyRated = nft.ratingsAverage.find(item => item.postedby && item.postedby.equals(_idAsObjectId));
        if (alreadyRated) {
            const updateRating = await NFT.updateOne(
                {
                    ratingsAverage: { $elemMatch: alreadyRated },
                },
                {
                    $set: { "ratingsAverage.$.star": star },
                },
                {
                    new: true,
                }
            );

        } else {
            const rateProduct = await NFT.findByIdAndUpdate(
                nftId,
                {
                    $push: {
                        ratingsAverage: {
                            star: star,
                            postedby: _id,
                        },
                    },
                }, { new: true, }
            );
        }


        // total rating 
        const getallRatings = await NFT.findById(nftId);
        let totalRating = getallRatings.ratingsAverage.length;

        let ratingSum = getallRatings.ratingsAverage
            .map(item => item.star) // Extract the star property from each item
            .filter(star => typeof star === 'number') // Filter out non-numeric values
            .reduce((prev, curr) => prev + curr, 0); // Sum up the numeric values

        let actualRating = ratingSum / totalRating;
        //  let actualRating = Math.round(ratingSum / totalRating);
        let finalRating = await NFT.findByIdAndUpdate(
            nftId,
            {
                ratingsQuantity: actualRating,
            }, { new: true }
        )
        res.json({ message: "nft rated" });

    } catch (error) {
        throw new Error(error);
    }
});
