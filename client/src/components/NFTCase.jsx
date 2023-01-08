// import { useEffect } from "react";
import { useState } from "react";
import ListBoxs from "./ListBoxs";
import { canOpenBox, getCatalog, purchaseBox } from "../util/interact";
import { useEffect } from "react";
import { ethers } from "ethers";
import { formatRes } from "../util/func";

function NFTCase() {
    const [listItem, setListItem] = useState([]);

    useEffect(() => {
        async function fetchCataLog() {
            const res = await getCatalog();
            // console.log("string:",res[1]["_price"].toString());
            // console.log("wei:",ethers.utils.formatUnits(res[1]["_price"], "wei"));
            // console.log("gwei:",ethers.utils.formatUnits(res[1]["_price"], "gwei"));
            setListItem(formatRes(res));
        }
        fetchCataLog();
    }, []);
    const clickBuy = async (boxType) => {
        await purchaseBox(boxType, ethers.utils.formatUnits(listItem[boxType-1]._price, "wei"));
    };
    return (
        <ListBoxs
            listItem={listItem}
            clickBuy={clickBuy}
            myNFT={false}
        />
    );

}
export default NFTCase;