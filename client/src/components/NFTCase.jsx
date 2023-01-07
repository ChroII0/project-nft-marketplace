// import { useEffect } from "react";
import { useState } from "react";
import ListBoxs from "./ListBoxs";


function NFTCase(){

    const initialListItem = [
        {
            box_type: 0,
            price: 100,
            img: "https://casedrop.com/new/template/caseimages/upd2021/cd_cases/trash.png?v=614",
            rarity_weight: {}
        },
        {
            box_type: 1,
            price: 10000,
            img: "https://casedrop.com/new/template/caseimages/new2021/chroma_case_n.png?v=608",
            rarity_weight: {}
        },
        {
            box_type: 2,
            price: 10000000,
            img: "https://casedrop.com/new/template/caseimages/upd2021/cd_cases/fade.png?v=614",
            rarity_weight: {}
        },
    ]
    const [listItem, setListItem] = useState(initialListItem);
    const clickBuy = () =>{
        
    };

    
    // async function loadBox() {



    //     setListItem();
    // }

    // useEffect(() => {
    //     loadBox();
    // }, []);


    return(
        <ListBoxs
            listItem={listItem}
            clickBuy={clickBuy}
        />
    );

}
export default NFTCase;