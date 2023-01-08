// import { useEffect } from "react";
// import { useState } from "react";
import Card from "./Card";
import { ethers } from "ethers";


function ListCards(props) {

    return (
        <div className="album py-5 bg-light">
            <div className="container">
                {props.title && (<h2 className="py-3">{props.title}</h2>)}
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {props.listItem.map((item) => {
                        return (
                            <Card
                                name={item._tokenName}
                                img={item._tokenImg}
                                id={item._tokenId}
                                address={(props.myNFT === true && props.isMKP !== true) ? item._owner : item._seller}
                                myNFT={props.myNFT}
                                price={ethers.utils.formatUnits(item._price, "gwei")}
                                isOnChain={item._tokenURIDetail[0].isOnchain}
                                isSelling={item._isSelling}
                                rarity={item._tokenURIDetail[0].rarity}
                                sellNFT={props.sellNFT}
                                onOrOffChain={props.onOrOffChain}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ListCards;