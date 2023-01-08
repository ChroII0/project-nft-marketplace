// import { useEffect } from "react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { getBoxs, getMyNFTs, getOpenBoxPrice, openBox } from "../util/interact";
import ListCards from "./ListCards";
import ListBoxs from "./ListBoxs";
import { formatRes } from "../util/func";
import { canOpenBox } from "../util/interact";


function MyNFT() {

    const initialItem = {
        _tokenName: "test_name",
        _tokenId: 1,
        _tokenImg: "http://www.w3.org/2000/svg",
        _seller: "seller_address",
        _owner: "onwer_address",
        _price: 1000,
        _isSelling: true,
        _tokenURIDetail: []
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
        if (canOpen)
        {
            await openBox(id, ethers.utils.formatUnits(openBoxFee, "wei"));
        }
    }

    return (
        <>
            <ListCards
                listItem={listNFTs}
                myNFT={true}
                title={"My NFTs"}
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