import { Link } from "react-router-dom";

function Header() {

    const connectWallet = () => {

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
                        <button type="button" className="btn btn-light btn-lg" onClick={connectWallet}>
                            Connect Wallet
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );

}
export default Header;