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
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {props.listItem.map((item) => {
                        return (
                            <>
                                <Box    
                                    type={boxType[ethers.utils.formatUnits(item._boxType, 0) -1]}
                                    nonType={ethers.utils.formatUnits(item._boxType, 0)}
                                    img={item._img}
                                    price={ethers.utils.formatUnits(item._price, "gwei")}
                                    buy={props.clickBuy}
                                />
                                <BoxDetail
                                    type={boxType[ethers.utils.formatUnits(item._boxType, 0) -1]}
                                    img={item._img}
                                    price={ethers.utils.formatUnits(item._price, "gwei")}
                                    commonWeight={ethers.utils.formatUnits(item._commonWeight, 0)}
                                    eliteWeight={ethers.utils.formatUnits(item._eliteWeight, 0)}
                                    epicWeight={ethers.utils.formatUnits(item._epicWeight, 0)}
                                    legendaryWeight={ethers.utils.formatUnits(item._legendaryWeight, 0)}
                                    mythicalWeight={ethers.utils.formatUnits(item._mythicalWeight, 0)}
                                    rareWeight={ethers.utils.formatUnits(item._rareWeight, 0)}
                                />
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ListBoxs;