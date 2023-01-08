// import { useEffect } from "react";
import { useState } from "react";
import ListBoxs from "./ListBoxs";
import { getCatalog, purchaseBox } from "../util/interact";
import { useEffect } from "react";
import { ethers } from "ethers";
import { parse } from "@ethersproject/transactions";

function NFTCase() {

    // const initialListItem = [
    //     {
    //         box_type: 0,
    //         price: 100,
    //         img: "https://casedrop.com/new/template/caseimages/upd2021/cd_cases/trash.png?v=614",
    //         rarity_weight: {}
    //     },
    //     {
    //         box_type: 1,
    //         price: 10000,
    //         img: "https://casedrop.com/new/template/caseimages/new2021/chroma_case_n.png?v=608",
    //         rarity_weight: {}
    //     },
    //     {
    //         box_type: 2,
    //         price: 10000000,
    //         img: "https://casedrop.com/new/template/caseimages/upd2021/cd_cases/fade.png?v=614",
    //         rarity_weight: {}
    //     },
    // ]
    const [listItem, setListItem] = useState([]);

    useEffect(() => {
        async function fetchCataLog() {
            const res = await getCatalog();

            // console.log("string:",res[1]["_price"].toString());
            // console.log("wei:",ethers.utils.formatUnits(res[1]["_price"], "wei"));
            // console.log("gwei:",ethers.utils.formatUnits(res[1]["_price"], "gwei"));


            const listObjItem = [
                Object.assign({}, res[0]),
                Object.assign({}, res[1]),
                Object.assign({}, res[2])];
            setListItem(listObjItem);
        }
        fetchCataLog();
    }, []);


    const clickBuy = async (boxType) => {
        console.log(boxType, ethers.utils.formatUnits(listItem[boxType-1]["_price"], "wei"));
        await purchaseBox(boxType, ethers.utils.formatUnits(listItem[boxType-1]["_price"], "wei"));
    };
    return (
        <ListBoxs
            listItem={listItem}
            clickBuy={clickBuy}
        />
    );

}
export default NFTCase;