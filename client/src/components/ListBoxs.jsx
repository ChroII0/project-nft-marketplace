// import { useEffect } from "react";
// import { useState } from "react";
import { useState } from "react";
import Box from "./Box";
import BoxDetail from "./BoxDetail";

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
                                    type={boxType[item.box_type]}
                                    img={item.img}
                                    price={item.price}
                                    buy={props.clickBuy}
                                />
                                <BoxDetail
                                    box_type={boxType[item.box_type]}
                                    img={item.img}
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