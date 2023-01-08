import { useEffect, useState } from "react";
import { getMKPListedNFTs } from "../util/interact";
import ListCards from "./ListCards";


function MarKetPlace() {
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
    const [listItem, setListItem] = useState([initialItem]);

    useEffect(() => {
        async function fetchMKP() {
            const res = await getMKPListedNFTs();
            console.log(res);
        }
        fetchMKP();
    }, []);
    // const clickBuy = async (boxType) => {
    //     // console.log(boxType, ethers.utils.formatUnits(listItem[boxType-1]._price, "wei"));
    //     await purchaseBox(boxType, ethers.utils.formatUnits(listItem[boxType-1]._price, "wei"));
    // };
    return(
        <ListCards
            listItem={listItem}
            myNFT={false}
        />
    );

}
export default MarKetPlace;