import { useEffect } from "react";
import { useState } from "react";
import ListCards from "./ListCards";



function HomeContent(){

    const initialItem = {
        name: "test_name",
        sellerAddress: "seller_address",
        ownerAddress: "onwer_address",
        price: "test_price",
        img: "http://www.w3.org/2000/svg",
        tokenID: "877x0392131231231"
    }
    const [listItem, setListItem] = useState([initialItem]);

   

    // async function loadNFT() {



    //     setListItem();
    // }

    // useEffect(() => {
    //     loadNFT();
    // }, []);

    return(
        <ListCards
            listItem={listItem}
            myNFT={false}
        />
    );

}
export default HomeContent;