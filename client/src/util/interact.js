import { ethers } from "ethers";
import { addressSaturnBox, addressSaturnMKP, abiSaturnBox, abiSaturnMKP } from './contract.js'


export const connectWallet = async () => {
    if (window.ethereum) {
        const res = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (res[0]) {
            return true;
        }
    } else {
        alert("pls install metamask extension!!")
    }
};

export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
        const res = await window.ethereum.request({ method: 'eth_accounts' });
        const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [res[0], 'latest']
        });
        return {
            address: res[0],
            balance: ethers.utils.formatEther(balance)
        }
    } else {
        alert("pls install metamask extension!!")
    }
};

// Contract SaturnBox
export const getCatalog = async () => {
    /* Response:
        array of [_boxType,_img,_price,_commonWeight,_rareWeight,_eliteWeight,_epicWeight,_legendaryWeight,_mythicalWeight]
        - _boxType: int
        - _img: string (url image of the Box)
        - _price: int
        - _commonWeight: int (exam: if you buy this box you will have ( 30% <=> {_commonWeight}% )chance to get common Agent)
        - _rareWeight: the same as _commonWeight
        - _eliteWeight: the same as _commonWeight
        - _epicWeight: the same as _commonWeight
        - _legendaryWeight: the same as _commonWeight
        - _mythicalWeight: the same as _commonWeight
    */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addressSaturnBox, abiSaturnBox, signer);
    let catalogs = contract.getCatalog();
    return catalogs;
};

export const getOpenBoxPrice = async () => {
    /* Response:
        price: int
        -> this is the price that you have to pay when you want to open a Box
    */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addressSaturnBox, abiSaturnBox, signer);
    let openBoxPrice = contract.getOpenBoxPrice();
    return openBoxPrice;
};

export const purchaseBox = async (boxType, price) => {
    /* args
        - boxType: int - box type you want to buy
        - price: int - the price that admin requested
     */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const contract = new ethers.Contract(addressSaturnBox, abiSaturnBox, signer);
    await contract.purchaseBox(boxType, { value: price });
    // Listen event to show UX
    listenDoPurchaseBox({ addressExpect: address });
};

export const getBoxs = async () => {
    /* Response:
        array of [_id,_targetBLock,_price,_box_type,_is_opened,_owner_by,_imgURI]
        - _id: int- this is the tokenId (boxId) of the Box 
        - _targetBLock: int - block number that you can open
        - _price: price of the box
        - _box_type: int (1,2,3)
        - _is_opened: bool 
        - _owner_by: string - address of the owner
        - _imgURI: string url img of the box
    */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addressSaturnBox, abiSaturnBox, signer);
    let myBoxs = contract.getMyBox();
    return myBoxs
};

export const openBox = async (boxId, openBoxFee) => {
    /* args
        - boxId: int - tokenId you want to open
        - openBoxFee: int - the fee you have to pay for admin when requesting this (can get by function "getOpenBoxPrice")
     */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const contract = new ethers.Contract(addressSaturnBox, abiSaturnBox, signer);
    await contract.openBox(boxId, { value: openBoxFee, gasLimit: 35000000 });
    // Listen event to show UX
    listenMintToken({ addressExpect: address });
};



// Contract SaturnMKP

export const getListingPrice = async () => {
    /* Response:
        price: int
        -> this is the price that you have to pay when you want to list an NFT to marketplace
    */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addressSaturnMKP, abiSaturnMKP, signer);
    let listingPrice = contract.getListingPrice();
    return listingPrice;
};

export const getWithdrawPrice = async () => {
    /* Response:
        price: int
        -> this is the price that you have to pay when you want to list an NFT to marketplace
    */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addressSaturnMKP, abiSaturnMKP, signer);
    let withdrawPrice = contract.getWithdrawPrice();
    return withdrawPrice;
};

export const getOnChainPrice = async () => {
    /* Response:
        price: int
        -> this is the price that you have to pay when you want to put your NFT onchain
    */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addressSaturnMKP, abiSaturnMKP, signer);
    let onChainPrice = contract.getOnChainPrice();
    return onChainPrice;
};
export const doRequestOnChain = async (nftId, onChainFee) => {
    /* args
        - nftId: int - tokenId you want to put on chain
        - onChainFee: int - the fee you have to pay for admin when requesting this (can get by function "getOnChainPrice")
     */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const contract = new ethers.Contract(addressSaturnMKP, abiSaturnMKP, signer);
    await contract.doRequestOnChain(nftId, { value: onChainFee });
    // Listen event to show UX
    listenToOnChain({ addressExpect: address });
};

export const getOffChainPrice = async () => {
    /* Response:
        price: int
        -> this is the price that you have to pay when you want to put your NFT offchain
    */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addressSaturnMKP, abiSaturnMKP, signer);
    let offChainPrice = contract.getOffChainPrice();
    return offChainPrice;
};

export const isOnChain = async (nftId) => {
    /* args
        - nftId: int - tokenId you want to check
    */
    /* Response:
        true/false: bool
        -> to check if your NFT is on the chain or not
    */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addressSaturnMKP, abiSaturnMKP, signer);
    let _isOnChain = contract.isOnChain(nftId);
    return _isOnChain;
};


export const sellNFT = async (nftId, expectPrice, listingPrice) => {
    /* args
        - nftId: int - tokenId you want to list on marketplace
        - expectPrice: int - the price that you want to sell
        - listingPrice: int - the fee you have to pay for admin when requesting this (can get by function "getListingPrice")
    */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const contract = new ethers.Contract(addressSaturnMKP, abiSaturnMKP, signer);
    await contract.sellNFT(nftId, expectPrice, { value: listingPrice });
    // Listen event to show UX
    listenDoSellNFT({ addressExpect: address });
};

export const purchaseNFT = async (nftId, NFTPrice) => {
    /* args 
        - nftId: int - tokenId you want to buy
        - NFTPrice: int - the price that the seller requested
    */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const contract = new ethers.Contract(addressSaturnMKP, abiSaturnMKP, signer);
    await contract.purchaseNFT(nftId, { value: NFTPrice });
    // Listen event to show UX
    listenDoPurchaseNFT({ addressExpect: address });
};

export const withdrawNFT = async (nftId, withdrawFee) => {
    /* args 
        - nftId: int - tokenId you want to buy
        - withdrawFee: int - the price that the admin request
    */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const contract = new ethers.Contract(addressSaturnMKP, abiSaturnMKP, signer);
    await contract.withdrawNFT(nftId, { value: withdrawFee });
    // Listen event to show UX
    listenDoWithdrawNFT({ addressExpect: address });
};

export const doRequestOffChain = async (nftId, offChainFee) => {
    /* args
        - nftId: int - tokenId you want to put off chain
        - offChainFee: int - the fee you have to pay for admin when requesting this (can get by function "getOffChainPrice")
     */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const contract = new ethers.Contract(addressSaturnMKP, abiSaturnMKP, signer);
    await contract.offChain(nftId, { value: offChainFee })
    // Listen event to show UX
    listenToOffChain({ addressExpect: address });
};

export const getMyNFTs = async () => {
    /* Response:
        array of [_tokenURIDetail,_tokenId,_seller,_owner,_price,_isSelling,_tokenImg,_tokenName]
        - _tokenURIDetail: is an array, the struct is 
                    - tokenId: int  - this is nftId
                    - agentId: int - this is type of Agent
                    - isOnchain: int 1 or 0, 1 is true and 0 is false
                    - baseRarity: int 0:common, 1:rare, 2:elite, 3:epic, 4:legendary, 5:mythical
                    - rarity: int - is baseRarity but in the future this will be change to higher level of rarity lik epic, legendary or or something else
                    - level: int - maximum: 500
                    - damage: int - maximum: 1000
                    - hp: int - maximum: 4000
                    - evasion: int - maximum: 4000
                    - armor: int - maximum: 1000
                    - combo: int - maximum: 1000
                    - precision: int - maximum: 4000
                    - accuracy: int - maximum: 4000
                    - counter: int - maximum: 1000
                    - reversal: int - maximum: 1000
                    - lock: int - maximum: 1000
                    - disarm: int - maximum: 1000
                    - speed: int - maximum: 1000
        - _tokenId: int  - this is nftId
        - _seller: string - this is the address of the seller who own this token and want to sell it
        - _owner: string - this is the address of the owner (in case of selling, the owner is the contract)
        - _price: int price of token the seller is requesting
        - _isSelling: bool - is listing on marketplace or not
        - _tokenImg: string - url image of token (Agent)
        - _tokenName: string - name of token (Agent)
    */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addressSaturnMKP, abiSaturnMKP, signer);
    let myNFTs = contract.getMyItems();
    return myNFTs;
};


export const getMyListedNFTs = async () => {
    /* Response:
        array of [_tokenURIDetail,_tokenId,_seller,_owner,_price,_isSelling,_tokenImg,_tokenName]
        - _tokenURIDetail: is an array, the struct is 
                    - tokenId: int  - this is nftId
                    - agentId: int - this is type of Agent
                    - isOnchain: int 1 or 0, 1 is true and 0 is false
                    - baseRarity: int 0:common, 1:rare, 2:elite, 3:epic, 4:legendary, 5:mythical
                    - rarity: int - is baseRarity but in the future this will be change to higher level of rarity lik epic, legendary or or something else
                    - level: int - maximum: 500
                    - damage: int - maximum: 1000
                    - hp: int - maximum: 4000
                    - evasion: int - maximum: 4000
                    - armor: int - maximum: 1000
                    - combo: int - maximum: 1000
                    - precision: int - maximum: 4000
                    - accuracy: int - maximum: 4000
                    - counter: int - maximum: 1000
                    - reversal: int - maximum: 1000
                    - lock: int - maximum: 1000
                    - disarm: int - maximum: 1000
                    - speed: int - maximum: 1000
        - _tokenId: int  - this is nftId
        - _seller: string - this is the address of the seller who own this token and want to sell it
        - _owner: string - this is the address of the owner (in case of selling, the owner is the contract)
        - _price: int price of token the seller is requesting
        - _isSelling: bool - is listing on marketplace or not
        - _tokenImg: string - url image of token (Agent)
        - _tokenName: string - name of token (Agent)
    */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addressSaturnMKP, abiSaturnMKP, signer);
    let myListedNFTs = contract.getMyListedItems();
    return myListedNFTs;
};


export const getMKPListedNFTs = async () => {
    /* Response:
        array of [_tokenURIDetail,_tokenId,_seller,_owner,_price,_isSelling,_tokenImg,_tokenName]
        - _tokenURIDetail: is an array, the struct is 
                    - tokenId: int  - this is nftId
                    - agentId: int - this is type of Agent
                    - isOnchain: int 1 or 0, 1 is true and 0 is false
                    - baseRarity: int 0:common, 1:rare, 2:elite, 3:epic, 4:legendary, 5:mythical
                    - rarity: int - is baseRarity but in the future this will be change to higher level of rarity lik epic, legendary or or something else
                    - level: int - maximum: 500
                    - damage: int - maximum: 1000
                    - hp: int - maximum: 4000
                    - evasion: int - maximum: 4000
                    - armor: int - maximum: 1000
                    - combo: int - maximum: 1000
                    - precision: int - maximum: 4000
                    - accuracy: int - maximum: 4000
                    - counter: int - maximum: 1000
                    - reversal: int - maximum: 1000
                    - lock: int - maximum: 1000
                    - disarm: int - maximum: 1000
                    - speed: int - maximum: 1000
        - _tokenId: int  - this is nftId
        - _seller: string - this is the address of the seller who own this token and want to sell it
        - _owner: string - this is the address of the owner (in case of selling, the owner is the contract)
        - _price: int price of token the seller is requesting
        - _isSelling: bool - is listing on marketplace or not
        - _tokenImg: string - url image of token (Agent)
        - _tokenName: string - name of token (Agent)
    */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    const contract = new ethers.Contract(addressSaturnMKP, abiSaturnMKP, provider);
    let mkpListedNFTs = contract.getListedItems();
    return mkpListedNFTs;
};

export const getNFTDetailByTokenId = async (tokenId) => {
    /* args
        - tokenId: int - tokenId you want to get detail
    */
    /* Response:
        an object (_tokenURIDetail,_tokenId,_seller,_owner,_price,_isSelling,_tokenImg,_tokenName])
        - _tokenURIDetail: is an array, the struct is 
                    - tokenId: int  - this is nftId
                    - agentId: int - this is type of Agent
                    - isOnchain: int 1 or 0, 1 is true and 0 is false
                    - baseRarity: int 0:common, 1:rare, 2:elite, 3:epic, 4:legendary, 5:mythical
                    - rarity: int - is baseRarity but in the future this will be change to higher level of rarity lik epic, legendary or or something else
                    - level: int - maximum: 500
                    - damage: int - maximum: 1000
                    - hp: int - maximum: 4000
                    - evasion: int - maximum: 4000
                    - armor: int - maximum: 1000
                    - combo: int - maximum: 1000
                    - precision: int - maximum: 4000
                    - accuracy: int - maximum: 4000
                    - counter: int - maximum: 1000
                    - reversal: int - maximum: 1000
                    - lock: int - maximum: 1000
                    - disarm: int - maximum: 1000
                    - speed: int - maximum: 1000
        - _tokenId: int  - this is nftId
        - _seller: string - this is the address of the seller who own this token and want to sell it
        - _owner: string - this is the address of the owner (in case of selling, the owner is the contract)
        - _price: int price of token the seller is requesting
        - _isSelling: bool - is listing on marketplace or not
        - _tokenImg: string - url image of token (Agent)
        - _tokenName: string - name of token (Agent)
    */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addressSaturnMKP, abiSaturnMKP, signer);
    let nftDetail = contract.getItemByTokenId(tokenId);
    return nftDetail;
};

export const getNFTDetailByTokenIds = async (tokenIds) => {
    /* args
        - tokenIds: array of int - list of tokenId you want to get detail
    */
    /* Response:
        array of [_tokenURIDetail,_tokenId,_seller,_owner,_price,_isSelling,_tokenImg,_tokenName]
        - _tokenURIDetail: is an array, the struct is 
                    - tokenId: int  - this is nftId
                    - agentId: int - this is type of Agent
                    - isOnchain: int 1 or 0, 1 is true and 0 is false
                    - baseRarity: int 0:common, 1:rare, 2:elite, 3:epic, 4:legendary, 5:mythical
                    - rarity: int - is baseRarity but in the future this will be change to higher level of rarity lik epic, legendary or or something else
                    - level: int - maximum: 500
                    - damage: int - maximum: 1000
                    - hp: int - maximum: 4000
                    - evasion: int - maximum: 4000
                    - armor: int - maximum: 1000
                    - combo: int - maximum: 1000
                    - precision: int - maximum: 4000
                    - accuracy: int - maximum: 4000
                    - counter: int - maximum: 1000
                    - reversal: int - maximum: 1000
                    - lock: int - maximum: 1000
                    - disarm: int - maximum: 1000
                    - speed: int - maximum: 1000
        - _tokenId: int  - this is nftId
        - _seller: string - this is the address of the seller who own this token and want to sell it
        - _owner: string - this is the address of the owner (in case of selling, the owner is the contract)
        - _price: int price of token the seller is requesting
        - _isSelling: bool - is listing on marketplace or not
        - _tokenImg: string - url image of token (Agent)
        - _tokenName: string - name of token (Agent)
    */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addressSaturnMKP, abiSaturnMKP, signer);
    let nftsDetail = contract.getItemByTokenIds(tokenIds);
    return nftsDetail;
};



////////////////////////////////  LISTEN EVENT ////////////////////////////////////////
//SaturnMKP
export const listenRequestOnChain = async ({ addressExpect = null }) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(addressSaturnMKP, abiSaturnMKP, provider);
    contract.on("requestOnChain", (requester, tokenId) => {
        if (addressExpect != null && requester == addressExpect) {
            // TODO: handle event
            console.log("Event requestOnChain");
            console.log(requester);
            console.log(tokenId);
        }
        else {
            // TODO: handle event
            console.log("Event requestOnChain");
            console.log(requester);
            console.log(tokenId);
        }
    })
}

export const listenToOffChain = async ({ addressExpect = null }) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(addressSaturnMKP, abiSaturnMKP, provider);
    contract.on("toOffChain", (requester, tokenId) => {
        if (addressExpect != null && requester == addressExpect) {
            // TODO: handle event
            console.log("Event toOffChain");
            console.log(requester);
            console.log(tokenId);
        }
        else {
            // TODO: handle event
            console.log("Event toOffChain");
            console.log(requester);
            console.log(tokenId);
        }
    })
}

export const listenToOnChain = async ({ addressExpect = null }) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(addressSaturnMKP, abiSaturnMKP, provider);
    contract.on("toOnChain", (requester, tokenId) => {
        if (addressExpect != null && requester == addressExpect) {
            // TODO: handle event
            console.log("Event toOnChain");
            console.log(requester);
            console.log(tokenId);
        }
        else {
            // TODO: handle event
            console.log("Event toOnChain");
            console.log(requester);
            console.log(tokenId);
        }
    })
}

export const listenDoSellNFT = async ({ addressExpect = null }) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(addressSaturnMKP, abiSaturnMKP, provider);
    contract.on("doSellNFT", (requester, tokenId, price) => {
        if (addressExpect != null && requester == addressExpect) {
            // TODO: handle event
            console.log("Event doSellNFT");
            console.log(requester);
            console.log(tokenId);
            console.log(price);
        }
        else {
            // TODO: handle event
            console.log("Event doSellNFT");
            console.log(requester);
            console.log(tokenId);
            console.log(price);
        }
    })
}

export const listenDoPurchaseNFT = async ({ addressExpect = null }) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(addressSaturnMKP, abiSaturnMKP, provider);
    contract.on("doPurchaseNFT", (requester, tokenId) => {
        if (addressExpect != null && requester == addressExpect) {
            // TODO: handle event
            console.log("Event doPurchaseNFT");
            console.log(requester);
            console.log(tokenId);
        }
        else {
            // TODO: handle event
            console.log("Event doPurchaseNFT");
            console.log(requester);
            console.log(tokenId);
        }
    })
}

export const listenDoWithdrawNFT = async ({ addressExpect = null }) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(addressSaturnMKP, abiSaturnMKP, provider);
    contract.on("doWithdrawNFT", (requester, tokenId) => {
        if (addressExpect != null && requester == addressExpect) {
            // TODO: handle event
            console.log("Event doWithdrawNFT");
            console.log(requester);
            console.log(tokenId);
        }
        else {
            // TODO: handle event
            console.log("Event doWithdrawNFT");
            console.log(requester);
            console.log(tokenId);
        }
    })
}

export const listenMintToken = async ({ addressExpect = null }) => {
    /* Response:
        an object (_tokenURIDetail,_tokenId,_seller,_owner,_price,_isSelling,_tokenImg,_tokenName])
        - _tokenURIDetail: is an array, the struct is 
                    - tokenId: int  - this is nftId
                    - agentId: int - this is type of Agent
                    - isOnchain: int 1 or 0, 1 is true and 0 is false
                    - baseRarity: int 0:common, 1:rare, 2:elite, 3:epic, 4:legendary, 5:mythical
                    - rarity: int - is baseRarity but in the future this will be change to higher level of rarity lik epic, legendary or or something else
                    - level: int - maximum: 500
                    - damage: int - maximum: 1000
                    - hp: int - maximum: 4000
                    - evasion: int - maximum: 4000
                    - armor: int - maximum: 1000
                    - combo: int - maximum: 1000
                    - precision: int - maximum: 4000
                    - accuracy: int - maximum: 4000
                    - counter: int - maximum: 1000
                    - reversal: int - maximum: 1000
                    - lock: int - maximum: 1000
                    - disarm: int - maximum: 1000
                    - speed: int - maximum: 1000
        - _tokenId: int  - this is nftId
        - _seller: string - this is the address of the seller who own this token and want to sell it
        - _owner: string - this is the address of the owner (in case of selling, the owner is the contract)
        - _price: int price of token the seller is requesting
        - _isSelling: bool - is listing on marketplace or not
        - _tokenImg: string - url image of token (Agent)
        - _tokenName: string - name of token (Agent)
    */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(addressSaturnMKP, abiSaturnMKP, provider);
    contract.on("mintToken", (requester, tokenDetail) => {
        if (addressExpect != null && requester == addressExpect) {
            // TODO: handle event
            console.log("Event mintToken");
            console.log(requester);
            console.log(tokenDetail);
        }
        else {
            // TODO: handle event
            console.log("Event mintToken");
            console.log(requester);
            console.log(tokenDetail);
        }
    })
}


//SaturnBox
export const listenDoPurchaseBox = async ({ addressExpect = null }) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(addressSaturnBox, abiSaturnBox, provider);
    contract.on("doPurchaseBox", (requester, tokenId, typeBox) => {
        if (addressExpect != null && requester == addressExpect) {
            // TODO: handle event
            console.log("Event doPurchaseBox");
            console.log(requester);
            console.log(tokenId);
            console.log(typeBox);
        }
        else {
            // TODO: handle event
            console.log("Event doPurchaseBox");
            console.log(requester);
            console.log(tokenId);
            console.log(typeBox);
        }
    })
}


//////// HELPER FUNCTIONS //////////////////////////////////


export const canOpenBox = async (targetBlock) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const blockNumber = await provider.getBlockNumber();
    if (targetBlock < blockNumber) {
        return true;
    }
    return false;
}