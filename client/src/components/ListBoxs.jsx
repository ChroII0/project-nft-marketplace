// import { useEffect } from "react";
// import { useState } from "react";
import { useState } from "react";
import Box from "./Box";
import BoxDetail from "./BoxDetail";
import { ethers } from "ethers";

function ListBoxs(props) {

    const boxType = ["SmallBox", "BigBox", "MegaBox"];
    return (
        <div className="album py-5 bg-light">
            <div className="container">
                {props.title && (<h2 className="py-3">{props.title}</h2>)}
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {props.listItem.map((item) => {
                        return (
                            <>
                                {props.myNFT === false ? (
                                    <>
                                        <Box
                                            type={boxType[item._boxType - 1]}
                                            img={item._img}
                                            nonType={item._boxType}
                                            price={ethers.utils.formatUnits(item._price, "gwei")}
                                            buy={props.clickBuy}
                                            myNFT={props.myNFT}
                                        />
                                        <BoxDetail
                                            type={boxType[item._boxType - 1]}
                                            img={item._img}
                                            price={ethers.utils.formatUnits(item._price, "gwei")}
                                            commonWeight={item._commonWeight}
                                            eliteWeight={item._eliteWeight}
                                            epicWeight={item._epicWeight}
                                            legendaryWeight={item._legendaryWeight}
                                            mythicalWeight={item._mythicalWeight}
                                            rareWeight={item._rareWeight}
                                        />
                                    </>
                                ) : (
                                    <Box
                                        type={boxType[item._box_type - 1]}
                                        img={item._imgURI}
                                        id={item._id}
                                        open={props.clickOpen}
                                        myNFT={props.myNFT}
                                    />
                                )}
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ListBoxs;