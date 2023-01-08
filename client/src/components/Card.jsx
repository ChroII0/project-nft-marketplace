import { Link } from "react-router-dom";


function Card(props) {


    return (
        <div className="col">
            <div className="card shadow-sm">
            <img className="card-img-top" width="100%" height="100%" src={props.img} />
                <div className="card-body">
                    <p className="card-text"><strong>Name:</strong> <Link to={"/detail/" + props.id}>{props.name}</Link></p>
                    <p className="card-text"><strong>TokenID:</strong> {props.id}</p>
                    <p className="card-text"><strong>Address:</strong> {props.address}</p>
                    {props.myNFT === false &&
                        (
                            <>
                                <p className="card-text"><strong>Price:</strong> {props.price} gwei</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <Link to={"/detail/" + props.id}>
                                            <button className="btn btn-sm btn-outline-primary"><strong>Buy</strong></button>
                                        </Link>
                                    </div>
                                    {/* <small className="text-muted">9 mins</small> */}
                                </div></>
                        )}
                </div>
            </div>
        </div>
    );
}

export default Card;
