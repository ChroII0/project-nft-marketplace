import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getNFTDetailByTokenId } from "../util/interact";
import { formatRes } from "../util/func";
import { ethers } from "ethers";
import Cookies from 'js-cookie';


function Detail() {
    const { itemId } = useParams();

    const initialItem = {
        _tokenName: "test_name",
        _tokenId: 1,
        _tokenImg: "http://www.w3.org/2000/svg",
        _seller: "seller_address",
        _owner: "",
        _price: 1000,
        _isSelling: true,
        _tokenURIDetail: [
            {
                tokenId: 0,
                agentId: 0,
                isOnchain: 0,
                baseRarity: 0,
                rarity: 0,
                level: 0,
                damage: 0,
                hp: 0,
                evasion: 0,
                armor: 0,
                combo: 0,
                precision: 0,
                accuracy: 0,
                counter: 0,
                reversal: 0,
                lock: 0,
                disarm: 0,
                speed: 0

            }
        ]
    }
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
    const [item, setItem] = useState(initialItem);

    useEffect(() => {
        async function fetchNFT() {
            const res = await getNFTDetailByTokenId(parseInt(itemId));
            setItem(formatRes([res])[0]);
            console.log(res);
        }
        fetchNFT();
        console.log(item);
    }, []);
    const key_agent = [
        "level",
        "damage",
        "hp",
        "evasion",
        "armor",
        "combo",
        "precision",
        "accuracy",
        "counter",
        "reversal",
        "lock",
        "disarm",
        "speed",
    ]
    const max_values_agent = [
        500, 1000, 4000, 4000, 1000, 1000, 4000, 4000, 1000, 1000, 1000, 1000, 1000
    ];
    const clickBuy = () => {

    }

    return (
        <div className="col-md-12 pt-5 px-3">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col-auto d-none d-lg-block">
                    <img className="card-img-top" width="600px" height="600px" src={item._tokenImg} />
                </div>
                <div className="col p-4 d-flex flex-column position-static">
                    <strong className="d-inline-block mb-2 text-success">Item</strong>
                    <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">{item._tokenURIDetail[0].isOnchain === 1 ? (<span class="badge text-bg-success">OnChain</span>) : (<span class="badge text-bg-danger">OffChain</span>)}</small>
                        <small className="text-muted"><span class="badge" style={{ "background-color": borderColor[item._tokenURIDetail[0].rarity], "color": "black" }}>{AgentRarity[item._tokenURIDetail[0].rarity]}</span></small>
                    </div>
                    <h3 className="mb-0">{item._tokenName}</h3>
                    <div className="text-muted">Owner: {item._owner}</div>
                    <div className="mb-2 text-muted">Token-standard: ERC-721</div>
                    <p className="mb-auto"><strong>Attribute:</strong><br /></p>
                    {key_agent.map((key, i) => {
                        const w_progress = item._tokenURIDetail[0][key] / max_values_agent[i] * 100 + "%";
                        return (
                            <>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-muted">{key}: {item._tokenURIDetail[0][key]}</span>
                                    <span className="text-muted">max: {max_values_agent[i]}</span>
                                </div>
                                <div className="progress" style={{ "height": "5px" }}>
                                    <div className="progress-bar" role="progressbar" style={{ "width": w_progress }} aria-valuemin="0" aria-valuemax={max_values_agent[key]}></div>
                                </div>
                            </>
                        )
                    })
                    }
                    {Cookies.get("walletAddress") !== item._owner.toLowerCase() && (
                        <>
                        <button type="button" className="btn btn-primary mt-3" onClick={clickBuy}>Buy: {ethers.utils.formatUnits(item._price, "gwei")} gwei</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Detail;
