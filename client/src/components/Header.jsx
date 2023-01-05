import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { connectWallet, getCurrentWalletConnected } from "../util/interact";

function Header() {
    const [walletAddress, setWallet] = useState("");
    const [balance, setBalance] = useState(null);
    const [status, setStatus] = useState(false);
    const [message, setMessage] = useState("No connection to the network.");
    const [newMessage, setNewMessage] = useState("");

    const connect_wallet = async () => {
        const status = await connectWallet();
        setStatus(status);
    };
    if (status)
    {
        window.location.reload();
        setStatus(false);
    }
    useEffect(() => {
        async function fetchWallet() {
            const { address, balance } = await getCurrentWalletConnected();
            setWallet(address);
            setBalance(balance);
        }
        fetchWallet();
    },[]);
    return (
        <header className="p-3 text-bg-dark">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <h2 className="d-flex align-items-center mb-2 mb-lg-0 text-white me-md-5">
                        <Link to="/" className="nav-link text-white">Header</Link>
                    </h2>
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/mynft" className="nav-link px-2 text-white">Market Place</Link></li>
                        <li><Link to="/mynft" className="nav-link px-2 text-white">My Listed NFTs</Link></li>
                        <li><Link to="/mynft" className="nav-link px-2 text-white">My NFTs</Link></li>

                    </ul>
                    <div>
                        {(walletAddress === "") ?
                            (<button type="button" className="btn btn-light btn-lg" onClick={connect_wallet}>
                                Connect Wallet
                            </button>) : (
                                <span>
                                    <span><strong>Account: </strong>{walletAddress}</span><br/>
                                    <span><strong>Balance: </strong>{balance} ETH</span>
                                </span>)}
                    </div>
                </div>
            </div>
        </header>
    );

}
export default Header;