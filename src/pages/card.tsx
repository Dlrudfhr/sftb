import React, {useState} from "react";

const cards = [{
    name: "summary",
    description:"Due Tasks",
    footer:"Completed:13",

}]
export const Card = () => (
    <div className="cards">
        {cards.map((card) => (
            <label key={card.name} id={card.name}>
                <input type="checkbox" />
                <div className="card">
                    <div className="front">
                        <header>
                            <h2>{card.name}</h2><span>more_vert</span>
                        </header>
                        <var></var>
                        <h3></h3>
                        <h4></h4>
                    </div>
                    <div className="back">
                        <header>
                            <h2></h2><span></span>
                        </header>
                        <p></p>
                    </div>
                </div>
            </label>
        ))}
    </div>
);

