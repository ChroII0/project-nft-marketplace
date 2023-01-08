import { useState } from "react";
import { Link } from "react-router-dom";


function Card(props) {

    const borderColor = [
        "blue",
        "green",
        "indigo",
        "orange",
        "red",
        "yellow"
    ]
    const AgentRarity = [
        "Common",
        "Rare",
        "Elite",
        "Epic",
        "Legendary",
        "Mythical"
    ]
    const [expectPrice, setExpectPrice] = useState("");
    const handleChangeExpectPrice = (e) =>{
        setExpectPrice(e.target.value);
    }
    return (
        <div className="col">
            <div className="card shadow-sm border-3" style={{ "border-color": borderColor[props.rarity] }}>
                <img className="card-img-top" width="100%" height="100%" src={props.img} />
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">{props.isOnChain === 1 ? (<span class="badge text-bg-success">OnChain</span>) : (<span class="badge text-bg-danger">OffChain</span>)}</small>
                        <small className="text-muted"><span class="badge" style={{ "background-color": borderColor[props.rarity], "color": "black" }}>{AgentRarity[props.rarity]}</span></small>
                    </div>
                    <p className="card-text mt-3"><strong>Name:</strong> <Link className="text-primary text-decoration-none" to={"/detail/" + props.id}>{props.name}</Link></p>
                    <p className="card-text"><strong>TokenID:</strong> {props.id}</p>
                    <p className="card-text"><strong>Address:</strong> {props.address}</p>
                    {props.myNFT === false ?
                        (
                            <>
                                <p className="card-text"><strong>Price:</strong> {props.price} gwei</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <Link to={"/detail/" + props.id}>
                                            <button className="btn btn-sm btn-outline-primary"><strong>Buy</strong></button>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        ) : ((props.isOnChain === 1 && props.isSelling === false) &&
                            (
                                <>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <button className="btn btn-sm btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"><strong>Auction</strong></button>
                                        </div>
                                    </div>
                                    <div className="collapse" id="collapseExample">
                                        <div className="card card-body">
                                            <input class="form-control" type="number" onChange={handleChangeExpectPrice} placeholder="pls use gwei" readonly/>
                                            <button className="btn btn-sm btn-outline-primary" onClick={() =>{props.sellNFT(props.id, expectPrice)}}><strong>Sell</strong></button>
                                        </div>
                                    </div>

                                </>
                            )
                        )}
                </div>
            </div>
        </div>
    );
}

export default Card;
