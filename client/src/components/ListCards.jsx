import { useEffect } from "react";
import { useState } from "react";
import Card from "./Card";


function ListCards(props) {

    return (
        <div className="album py-5 bg-light">
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {props.listItem.map((item) => {
                        return (
                            <Card
                                name={item.name}
                                img={item.img}
                                id={item.tokenID}
                                address={props.myNFT == true ? item.ownerAddress : item.sellerAddress}
                                myNFT={props.myNFT}
                                price={item.price}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ListCards;