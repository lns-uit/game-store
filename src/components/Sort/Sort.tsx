import React, { useState } from 'react';
import './styles.css';

var sorts = [
    'All', 'Alphabetical', 'New Release', 'Price Low To High', 'Price High To Low'
]

function Sort() {
    const [nameSort, setNameSort] = useState("All");
    const [dropDown, setDropDown] = useState(false);

  return(
    <div className="relative">
        <div 
            className="d-flex align-items-center pointer"
            onClick={()=>setDropDown(!dropDown)}   
        >
            <p className="fs-15 lh-18 gray-1 mr-0">Sort by: </p>
            <span className="pd-left-right-4 fs-15 lh-18">{nameSort}</span>
            <span><i className="fa fa-chevron-down"></i></span>
        </div>
        <div className={dropDown === false 
            ? "brg-brown d-inline-block min-width-200 hig-0 absolute visibility-hidden mr-top-8 animition noselect" 
            : "brg-brown d-inline-block min-width-200 absolute mr-top-8 animition z-index-100 noselect"}
        >
            <ul className="list-style-none pd-0 mr-0">
                {sorts.map((sort)=>{
                    return(
                        <li 
                            className={nameSort === sort ? "pd-top-bottom-12 pd-left-13 pointer bgr-gray2" : "pd-top-bottom-12 pd-left-13 pointer hover-1"}
                            onClick={()=>setNameSort(sort)}
                        >
                            <div className="d-flex space-between">
                                <p className="mr-0">{sort}</p>
                                {
                                    nameSort === sort 
                                    ? <span className="pd-right-5"><i className="fa fa-check"></i></span>
                                    : null
                                }
                            </div>
                        </li>
                )})}
            </ul>
        </div>
    </div>
  );
}

export default Sort;
