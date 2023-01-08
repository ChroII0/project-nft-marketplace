// import { useEffect } from "react";
import { useEffect, useState } from "react";
import { getBoxs } from "../util/interact";
import ListCards from "./ListCards";



function MyNFT(){

    const initialItem = {
        name: "test_name",
        sellerAddress: "seller_address",
        ownerAddress: "onwer_address",
        price: 1000,
        img: "http://www.w3.org/2000/svg",
        tokenID: "877x0392131231231"
    }
    const [listItem, setListItem] = useState([initialItem]);
   
    useEffect(() => {
        async function fetchMyBoxs() {
            const res = await getBoxs();
            console.log(res);
        }
        fetchMyBoxs();
    }, []);
    
    // async function loadNFT() {



    //     setListItem();
    // }

    // useEffect(() => {
    //     loadNFT();
    // }, []);

    return(
        <ListCards
            listItem={listItem}
            myNFT={true}
        />
    );

}
export default MyNFT;