import React, { useEffect, useState } from 'react';
import PageNavbar from "./PageNavbar";
import Dropdown from "./Dropdown";

const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

export default function ComparePage(props) {
    const [state1, setState1] = useState(states[0]);
    const [state2, setState2] = useState(states[1]);

    function handleState1Select(value) {
        setState1(value);
    }

    function handleState2Select(value) {
        setState2(value);
    }

    return (
        <div className="Compare-page">
            <PageNavbar active="Comparison" />
            <div className="container recommendations-container">
                <br></br>
                <div className="jumbotron findFriend-headspace">
                    <div className="h5">Choose two states to compare:</div>
                    <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                        <Dropdown options={states} onSelect={handleState1Select} />
                        <div style={{ margin: "0 10px" }}>vs.</div>
                        <Dropdown options={states} onSelect={handleState2Select} />
                    </div>
                    <div>State 1: {state1}</div>
                    <div>State 2: {state2}</div>
                </div>
            </div>
        </div>
    );
};