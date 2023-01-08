// import { useEffect } from "react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { doRequestOffChain, doRequestOnChain, getBoxs, getMyNFTs, getOffChainPrice, getOnChainPrice, getOpenBoxPrice, openBox } from "../util/interact";
import ListCards from "./ListCards";
import ListBoxs from "./ListBoxs";
import { formatRes } from "../util/func";
import { canOpenBox } from "../util/interact";
import { getListingPrice } from "../util/interact";
import { sellNFT } from "../util/interact";
import { isOnChain } from "../util/interact";


function MyNFT() {

    const initialItem = {
        _tokenName: "test_name",
        _tokenId: 1,
        _tokenImg: "http://www.w3.org/2000/svg",
        _seller: "seller_address",
        _owner: "onwer_address",
        _price: 1000,
        _isSelling: false,
        _tokenURIDetail: [
            {
                tokenId: 0,
                agentId: 0,
                isOnchain: 1,
                baseRarity: 0,
                rarity: 0,
                level: 0,
                damage: 0,
                hp: 0,
                evasion: 0,
                armor: 0,
                combo: 0,
                precision: 0,
                accuracy: 0,
                counter: 0,
                reversal: 0,
                lock: 0,
                disarm: 0,
                speed: 0

            }
        ]
    }
    const [listNFTs, setListNFTs] = useState([initialItem]);
    const [listBoxs, setListBoxs] = useState([]);


    useEffect(() => {
        async function fetchMyBoxs() {
            const res = await getBoxs();
            setListBoxs(formatRes(res));
        }
        fetchMyBoxs();
    }, []);

    useEffect(() => {
        async function fetchMyNFTs() {
            const res = await getMyNFTs();
            setListNFTs(formatRes(res));
        }
        fetchMyNFTs();
    }, []);
    const clickOpen = async (id, targetBox) => {
        const openBoxFee = await getOpenBoxPrice();
        const canOpen = await canOpenBox(targetBox);
        if (canOpen) {
            await openBox(id, ethers.utils.formatUnits(openBoxFee, "wei"));
        }
        else{
            alert("can not open box!");
        }
    }
    const clickSellNFT = async (id, expectPrice) =>{
        const ListingPriceRes = await getListingPrice();
        const ListingPrice = ethers.utils.formatUnits(ListingPriceRes,"wei");
        const newExpectPrice = expectPrice*1000000000;
        await sellNFT(id,newExpectPrice, ListingPrice);

    }
    console.log(listNFTs);
    const clickOnOrOffChain = async (id) =>{
        const isOnchain = await isOnChain(id);
        if (isOnchain)
        {
            const priceOffChain = await getOffChainPrice();
            await doRequestOffChain(id, priceOffChain)
        }
        else
        {
            const priceOnChain = await getOnChainPrice();
            await doRequestOnChain(id, priceOnChain);

        }
    }
    return (
        <>
            <ListCards
                listItem={listNFTs}
                myNFT={true}
                title={"My NFTs"}
                sellNFT={clickSellNFT}
                onOrOffChain={clickOnOrOffChain}
            />
            <ListBoxs
                listItem={listBoxs}
                myNFT={true}
                title={"My Boxs"}
                clickOpen={clickOpen}
            />
        </>

    );

}
export default MyNFT;