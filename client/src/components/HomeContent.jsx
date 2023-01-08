// import { useEffect } from "react";
import { useState } from "react";
import ListCards from "./ListCards";



function HomeContent() {

    const initialItem = {
        name: "test_name",
        sellerAddress: "seller_address",
        ownerAddress: "onwer_address",
        price: 1000,
        img: "http://www.w3.org/2000/svg",
        tokenID: "877x0392131231231"
    }
    const [listItem, setListItem] = useState([initialItem, initialItem, initialItem]);



    return (
        <h1 style={{"padding":"100px"}}>Home Page</h1>
    );

}
export default HomeContent;