import { Chart } from "react-google-charts";







function BoxDetail(props) {

    const data = [
        ["Task", "Weight"],
        ["Common", props.commonWeight],
        ["Elite", props.eliteWeight],
        ["Epic", props.epicWeight],
        ["Legendary", props.legendaryWeight],
        ["Mythical", props.mythicalWeight],
        ["Rare", props.rareWeight],
    ];
    const options = {
        is3D: false,
        pieHole: 0.3,
        legend: "none",
        
    };

    return (
        <div className="offcanvas offcanvas-end w-50" tabindex="-1" id={"offcanvasRight" + props.type} aria-controls="offcanvasTop" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id={"offcanvasRightLabel" + props.type}>{props.type} Detail</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <img className="card-img-top" width="25%" height="25%" src={props.img} /><hr />
                <p className="card-text"><strong>Price:</strong> {props.price} gwei</p><hr />
                <p className="card-text"><strong>Weight:</strong></p>
                <Chart
                    chartType="PieChart"
                    data={data}
                    options={options}
                    width={"100%"}
                    height={"500px"}
                />
            </div>
        </div>
    );
}

export default BoxDetail