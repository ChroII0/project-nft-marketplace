



function BoxDetail(props) {
    return (
        <div className="offcanvas offcanvas-end" tabindex="-1" id={"offcanvasRight" + props.box_type} aria-controls="offcanvasTop" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id={"offcanvasRightLabel" + props.box_type}>{props.box_type} Detail</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <img className="card-img-top" width="25%" height="25%" src={props.img} /><hr/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita perspiciatis laborum minus libero praesentium odio corrupti, sint consequuntur tempora temporibus mollitia, enim iusto quo eius doloremque iure asperiores neque rerum natus sapiente soluta! Ipsa rerum, amet doloremque minima aliquid laborum similique velit suscipit recusandae unde sapiente, voluptate maxime ea, numquam illum fugit excepturi impedit. Omnis suscipit modi obcaecati eos veniam id est qui molestias, repellendus vel aperiam recusandae fuga eveniet enim iusto odit tenetur! Eum neque aliquam expedita laudantium nemo dolore, modi, assumenda quia corporis quidem tenetur sed placeat amet id dolor. Officiis atque vitae voluptatum laborum libero ad nemo?</p>
            </div>
        </div>
    );
}

export default BoxDetail