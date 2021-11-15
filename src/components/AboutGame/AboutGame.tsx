import React from 'react';
import "../../layout/LayoutGameDetail2/styles.css";

interface Detail{
    detail:{
        name: string;
        genres: string[];
        features: string[];
        description: string;
        minimumWindow:{
            name: string; value: string;
        }[];
        recommendedWindow:{
            name: string; value: string;
        }[];
        minimumMacOs:{
            name: string; value: string;
        }[];
        recommendedMacOs:{
            name: string; value: string;
        }[];
        discount: number;
        price: number;
        details:{
            name: string; value: string;
        }[];
        requiresMinimum: string;
        requiresRecommended: string;
    }
}

function AboutGame({
    detail
}:Detail){
    return(
        <div className="pd-bottom-20 relative">
            <div className="max-height-850 overflow-hidden">
                <div className="game_area_description">
                    <h2 className="white uppercase lh-26 pd-top-2 m-bottom-10 fs-14 weight-normal brg-img">About this game</h2>
                    <span>
                        {detail.description}
                    </span>
                    <h2 className="blue-3 fs-15 m-top-18 pd-top-2">
                        <strong>Game Description</strong>
                    </h2>
                    <ul className="pd-0 m-left-18 square">
                        <li className="m-bottom-8">
                            There are 123 leading football leagues at your disposal. Have you got what it takes to spend big (or small) budgets wisely and guide your club to the top of the game? 
                        </li>
                        <li className="m-bottom-8">
                            Build a world-class backroom team that can assist with everything from Recruitment to Player Development. Lean on their expertise as you navigate the everyday challenges faced in football management.
                        </li>
                        <li className="m-bottom-8">
                            Scour Football Manager’s world-leading database of more than 500,000 real players for undiscovered talent or build your squad from within, training your prospects to realise their ultimate potential.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default AboutGame;