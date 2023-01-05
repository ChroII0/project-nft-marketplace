import { useState } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { useEffect } from "react";

function Header() {
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState(null);
    const [isConnectMetamask, setIsConnectMetamask] = useState(false);

    const connectWallet = () => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(res => {
                    // Return the address of the wallet
                    setAddress(res[0]);
                    window.ethereum.request({
                        method: 'eth_getBalance',
                        params: [res[0], 'latest']
                    }).then(balance => {
                        setBalance(ethers.utils.formatEther(balance));
                        // Format the string into main latest balance
                    })
                    setIsConnectMetamask(true);
                })
            
        } else {
            alert("install metamask extension!!")
        }
    }
    return (
        <header className="p-3 text-bg-dark">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <h2 className="d-flex align-items-center mb-2 mb-lg-0 text-white me-5">
                        <Link to="/" className="nav-link text-white">Header</Link>
                    </h2>
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/mynft" className="nav-link px-2 text-white">Market Place</Link></li>
                        <li><Link to="/mynft" className="nav-link px-2 text-white">My Listed NFTs</Link></li>
                        <li><Link to="/mynft" className="nav-link px-2 text-white">My NFTs</Link></li>

                    </ul>
                    <div className="text-end">
                        {isConnectMetamask == false ?
                            (<button type="button" className="btn btn-light btn-lg" onClick={connectWallet}>
                                Connect Wallet
                            </button>) : (
                                <span>
                                    <p><strong>Account: </strong>{address}</p>
                                    <p><strong>Balance: </strong>{balance} ETH</p>
                                </span>)}
                    </div>
                </div>
            </div>
        </header>
    );

}
export default Header;