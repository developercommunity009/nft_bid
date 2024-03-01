// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarkitplace is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Counters.Counter private _ItemsSold;

    uint256 listingPrice = 1000 wei;


    address payable owner;
    address[] private  bidKeys;

    mapping(uint256 => MarketItem) private idMarketItem;

    struct Bid {
        address payable bidder;
        uint256 amount;
    }

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
        bool refunded;
        uint256 biddingStartTime;
        uint256 biddingDuration;
        mapping(address => Bid) bids;
    }

    struct MarketItemInfo {
        uint256 tokenId;
        address seller;
        address owner;
        uint256 price;
        bool sold;
    }

    event isMarkitItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    event NftSold(
        uint256 indexed tokenId,
        address indexed buyer,
        uint256 amount
    );

    constructor() ERC721("NFT Metaverse Token", "MYNFT") {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "only owner of the Markitplace allowed Call this function!"
        );
        _;
    }

    // Function to update listing price
    function updateListingPrice(uint256 _listingprice)
        public
        payable
        onlyOwner
    {
        listingPrice = _listingprice;
    }

    // Function to get listing price
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    // Function to create NFT token
    function createToken(string memory tokenURI, uint256 price)
        public
        payable
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        createMarketItem(newTokenId, price);
        return newTokenId;
    }

    // Function to create market item
    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be greater than 0");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        idMarketItem[tokenId].tokenId = tokenId;
        idMarketItem[tokenId].seller = payable(msg.sender);
        idMarketItem[tokenId].owner = payable(address(this));
        idMarketItem[tokenId].price = price;
        idMarketItem[tokenId].sold = false;

        _transfer(msg.sender, address(this), tokenId);

        emit isMarkitItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    function reSellToken(uint256 tokenId, uint256 price) public payable {
        require(
            idMarketItem[tokenId].owner == msg.sender,
            "Only Item Owner allow"
        );
        require(msg.value == listingPrice, "Price must be equal to ListPrice!");

        idMarketItem[tokenId].sold = false;
        idMarketItem[tokenId].price = price;
        idMarketItem[tokenId].seller = payable(msg.sender);
        idMarketItem[tokenId].owner = payable(address(this));

        _ItemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }
    function reSellNftByBidding(
        uint256 tokenId,
        uint256 price,
        uint256 biddingDuration
    ) public payable {
        require(
            ownerOf(tokenId) == msg.sender,
            "You are not the owner of this NFT"
        );
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        
        // Update existing market item or create a new one if not listed previously
        if (idMarketItem[tokenId].tokenId != 0) {
            idMarketItem[tokenId].tokenId = tokenId;
            idMarketItem[tokenId].seller = payable(msg.sender);
        }
        
        idMarketItem[tokenId].owner = payable(address(this));
        idMarketItem[tokenId].price = price;
        idMarketItem[tokenId].sold = false;
        idMarketItem[tokenId].biddingStartTime = block.timestamp;
        idMarketItem[tokenId].biddingDuration = biddingDuration;
        
        // Transfer the NFT to the contract address
        transferFrom(msg.sender, address(this), tokenId);
        
        emit isMarkitItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    // FUNCTION CREATE MARKIT SALE

    function createMarkitSale(uint256 tokenId) public payable {
        uint256 price = idMarketItem[tokenId].price;

        require(
            msg.value == price,
            "please sumbit the asking Price in Order to Purches!"
        );

        // iseue in below
        idMarketItem[tokenId].owner = payable(msg.sender);
        idMarketItem[tokenId].sold = true;

        _ItemsSold.increment();
        _transfer(address(this), msg.sender, tokenId);

        payable(owner).transfer(listingPrice);
        payable(idMarketItem[tokenId].seller).transfer(msg.value);
    }

    function sellNftByBidding(
        string memory tokenURI,
        uint256 initialPrice,
        uint256 biddingDuration
    ) public payable {
        require(
            msg.value >= listingPrice,
            "Insufficient funds to cover listing price"
        );

        // Mint the NFT
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId); // Mint the NFT to the contract itself
        _setTokenURI(newTokenId, tokenURI);


        // Create market item
        idMarketItem[newTokenId].tokenId = newTokenId;
        idMarketItem[newTokenId].seller = payable(msg.sender);
        idMarketItem[newTokenId].owner = payable(address(this)); // Owner is set to contract address
        idMarketItem[newTokenId].price = initialPrice;
        idMarketItem[newTokenId].sold = false;
        idMarketItem[newTokenId].biddingStartTime = block.timestamp;
        idMarketItem[newTokenId].biddingDuration = biddingDuration;

        // Transfer the NFT to the contract address
        _transfer(msg.sender, address(this), newTokenId);

        // Transfer the listing price to the contract owner
        owner.transfer(listingPrice);

        emit isMarkitItemCreated(
            newTokenId,
            msg.sender,
            address(this),
            initialPrice,
            false
        );
    }

    // Function to buy NFT with bidding
    function buyNftByBidding(uint256 tokenId) external payable {
        MarketItem storage marketItem = idMarketItem[tokenId];
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        require(msg.value > 0, "Bid amount must be greater than 0");
        require(
            block.timestamp <
                marketItem.biddingStartTime + marketItem.biddingDuration,
            "Bidding period has ended"
        );
        require(
            msg.value > marketItem.price,
            "Bid must be higher than current price"
        );

        Bid storage existingBid = marketItem.bids[msg.sender];
        require(
            msg.value > existingBid.amount,
            "There is already a higher bid"
        );

        if (existingBid.amount > 0) {
            existingBid.bidder.transfer(existingBid.amount); // Refund the previous bidder
        }

        marketItem.bids[msg.sender] = Bid(payable(msg.sender), msg.value);
        marketItem.price = msg.value;

        // Add the bidder's address to the bidKeys array if it's not already there
        if (existingBid.amount > 0) {
            bidKeys.push(msg.sender);
        }
    }

    // Function to finalize the bidding process and transfer the NFT to the highest bidder
    function finalizeBidding(uint256 tokenId) external {
        MarketItem storage marketItem = idMarketItem[tokenId];
        require(
            block.timestamp >=
                marketItem.biddingStartTime + marketItem.biddingDuration,
            "Bidding period has not ended"
        );

        address payable highestBidder;
        uint256 highestBidAmount = 0;

        // Find the highest bid
        for (uint256 i = 0; i < bidKeys.length; i++) {
            address bidderAddress = bidKeys[i];
            Bid storage bid = marketItem.bids[bidderAddress];

            if (bid.amount > highestBidAmount) {
                highestBidAmount = bid.amount;
                highestBidder = bid.bidder;
            }
        }

        require(highestBidAmount > 0, "No bids were placed");

        // Transfer the NFT to the highest bidder
         _transfer(address(this), highestBidder , tokenId);
        marketItem.owner = highestBidder;
        marketItem.sold = true;

        // Transfer the bid amount to the owner of the NFT
        payable(marketItem.seller).transfer(highestBidAmount);

        // Emit event for NFT sale
        emit NftSold(tokenId, highestBidder, highestBidAmount);
    }

    // Function to refund the bid amount

    function refundBid(uint256 tokenId) external {
        MarketItem storage marketItem = idMarketItem[tokenId];
        require(
            block.timestamp >=
                marketItem.biddingStartTime + marketItem.biddingDuration,
            "Bidding period has not ended"
        );
        require(!marketItem.refunded, "Refunds have already been processed");

        address highestBidder = address(0);
        uint256 highestBidAmount = 0;

        // Find the highest bid
        for (uint256 i = 0; i < bidKeys.length; i++) {
            address bidder = bidKeys[i];
            Bid storage bid = marketItem.bids[bidder];

            if (bid.amount > highestBidAmount) {
                highestBidAmount = bid.amount;
                highestBidder = bidder;
            }
        }

        // Iterate over the bids mapping and refund each bidder (excluding the highest bidder)

        for (uint256 i = 0; i < bidKeys.length; i++) {
            address bidder = bidKeys[i];
            if (bidder != highestBidder) {
                Bid storage existingBid = marketItem.bids[bidder];
                uint256 amount = existingBid.amount;
                if (amount > 0) {
                    delete marketItem.bids[bidder];
                    payable(bidder).transfer(amount); // Refund the bidder
                }
            }
        }

        marketItem.refunded = true; // Set refunded flag to true
    }

    // Function to get unsold NFT data
    function fetchMarkitItem() public view returns (MarketItemInfo[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unSoldItemCount = _tokenIds.current() - _ItemsSold.current();
        uint256 currentIndex = 0;

        MarketItemInfo[] memory items = new MarketItemInfo[](unSoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idMarketItem[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = MarketItemInfo({
                    tokenId: currentItem.tokenId,
                    seller: currentItem.seller,
                    owner: currentItem.owner,
                    price: currentItem.price,
                    sold: currentItem.sold
                });
                currentIndex += 1;
            }
        }
        return items;
    }

    // Function to fetch NFTs owned by the caller
    function fetchMyNFT() public view returns (MarketItemInfo[] memory) {
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        // Count the number of items owned by the caller
        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        // Create an array to store the items owned by the caller
        MarketItemInfo[] memory items = new MarketItemInfo[](itemCount);

        // Populate the items array with the items owned by the caller
        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = MarketItemInfo({
                    tokenId: currentItem.tokenId,
                    seller: currentItem.seller,
                    owner: currentItem.owner,
                    price: currentItem.price,
                    sold: currentItem.sold
                });
                currentIndex += 1;
            }
        }

        return items;
    }

    // Function to fetch NFTs listed by the caller
    function fetchItemsListed() public view returns (MarketItemInfo[] memory) {
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        // Count the number of items listed by the caller
        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        // Create an array to store the items listed by the caller
        MarketItemInfo[] memory items = new MarketItemInfo[](itemCount);

        // Populate the items array with the items listed by the caller
        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = MarketItemInfo({
                    tokenId: currentItem.tokenId,
                    seller: currentItem.seller,
                    owner: currentItem.owner,
                    price: currentItem.price,
                    sold: currentItem.sold
                });
                currentIndex += 1;
            }
        }

        return items;
    }
}
