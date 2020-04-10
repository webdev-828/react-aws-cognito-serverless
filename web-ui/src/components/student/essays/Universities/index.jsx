import React from "react";
import Masonry from "./Masonry";
import Card from "./Card";

const Universities = (props) => {
    return (
        <Masonry columns={3}>
            {props.universities.map((university, index) =>
                <Card key = {index} data = {university}/>
            )}
        </Masonry>
    );
};

export default Universities;
