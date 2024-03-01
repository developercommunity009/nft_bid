const express = require("express");
const nftsController = require("../controller/nftController");
const router = express.Router();
const authController = require("../controller/authController");

// TOP 5 NFTs BY PRICE
router.route('/top-5-nfts')
.get(nftsController.alainsTopNFTs , nftsController.getAllNfts);

// STATUS ROUTE
router.route("/nft-status")
.get(nftsController.getNftsSatus);

router.route("/bids/:id")
.post(authController.protect   , nftsController.bayNftsByBid);


router.route("/finalizebid/:id")
.put(authController.protect   , nftsController.finalizeAuction);


router.route("/resellbybid/:id")
.post(authController.protect   , nftsController.rellSellNFTByBid);

// GET MONTLY PLAN
router.route("/monthly-plane/:year")
.get(nftsController.getMonthlyPlan);

// RATING
router.route("/rating")
.put(authController.protect , nftsController.rating);


// BuyNFT
router.route("/buynft/:id")
.post( authController.protect , nftsController.reSaleNfts)
.put(authController.protect, nftsController.bayNfts);


router.route("/view")
.put(authController.protect , nftsController.viewedNFT);

// ROUTER NFT
router.route("/")
.get(authController.protect , nftsController.getAllNfts)
.post( authController.protect ,  nftsController.createNfts);

router.route("/totalnfts").get(nftsController.getTotalNfts);
router.route("/totalnftsdb").get(nftsController.getTotalNftsDb);
router.route("/usernfts").get(authController.protect , nftsController.getUserNftsDb);
router.route("/userdelistednfts").get(authController.protect , nftsController.getUserDeListed);

router.route("/:id")
.get( authController.protect , nftsController.getSingalNfts)
.patch(nftsController.updateNfts)
.delete(authController.protect , authController.restrictTo("admin" , "guide"), nftsController.deleteNfts);


module.exports = router;