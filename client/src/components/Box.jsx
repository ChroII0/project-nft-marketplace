// import { Link } from "react-router-dom";


function Box(props) {


    return (
        <div className="col">
            <div className="card shadow-sm">
                <img className="card-img-top" width="100%" height="100%" src={props.img} />
                <div className="card-body">
                    {props.myNFT === false ?
                        (
                            <>
                                <p className="card-text"><strong>Type:</strong> {props.type}</p>
                                <p className="card-text"><strong>Price:</strong> {props.price} gwei</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-sm btn-outline-primary" data-bs-toggle="offcanvas" data-bs-target={"#offcanvasRight" + props.type}>Detail</button>
                                        <button className="btn btn-sm btn-outline-primary" onClick={() => props.buy(props.nonType)}><strong>Buy</strong></button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="card-text"><strong>Type:</strong> {props.type}</p>
                                <p className="card-text"><strong>TokenId:</strong> {props.id}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button className="btn btn-sm btn-outline-primary" onClick={() => props.open(props.id, props.target)}><strong>Open</strong></button>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>

        </div>

    );
}

export default Box;
