import { useState } from "react";
import { useParams } from "react-router-dom";



function Detail() {
    const { itemId } = useParams();

    const initialItem = {
        _tokenName: "test_name",
        _tokenId: 1,
        _tokenImg: "http://www.w3.org/2000/svg",
        _seller: "seller_address",
        _owner: "onwer_address",
        _price: 1000,
        _isSelling: true,
        _tokenURIDetail: []
    }
    const [item, setItem] = useState(initialItem);
    // async function loadNFT() {



    //     setItem();
    // }

    // useEffect(() => {
    //     loadNFT();
    // }, []);
    const clickBuy = () => {

    }

    return (
        <div className="col-md-12 pt-5 px-3">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col-auto d-none d-lg-block">
                    <svg className="bd-placeholder-img" width="700" height="700" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                </div>
                <div className="col p-4 d-flex flex-column position-static">
                    <strong className="d-inline-block mb-2 text-success">Item</strong>
                    <h3 className="mb-0">{item._tokenName}</h3>
                    <div className="mb-3 text-muted">owner: {item._owner}</div>
                    <p className="mb-auto">Detail:<br/>{}</p>
                    <p className="mb-auto">Attribute:<br/>{}</p>
                    {}
                </div>
            </div>
        </div>
    );
}
export default Detail;
