// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

enum RentalType {
    DurationOnly,
    CountOnly
}

struct Authorizer {
    address nftHolder;
    address claimAddress;
}
// TODO: initial price; list start time, and list end time

struct NFT {
    string chainId;
    address NFTAddress;
    string tokenId;
}

struct AuthorizedNFT {
    NFT nft;
    RentalType rentalType;
    Authorizer authorizer;
    uint256 listStartTime;
    uint256 listEndTime;
    uint256 currentPrice;
    uint256 lastActive; // last active timestamp
}

struct Term {
    uint256 authorizedStartTime;
    uint256 authorizedEndTime;
    uint256 count;
}

struct AuthorizeCertificate {
  AuthorizedNFT authorizedNFT;
  Term term;
  address renter;
  uint256 price;
  bytes32 signature;
}

struct AuthorizeRecord {
    uint256 totalAuthorizedCount;
    uint256 totalTransactionRevenue;
}

struct NFTipOverall {
    AuthorizedNFT authorizedNFT; 
    AuthorizeRecord authorizeRecord;
}