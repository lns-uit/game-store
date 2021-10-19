import React,{useState,useEffect} from 'react';
import Genre from './GenRe';
import Feature from './Features';
import "./styles.css"

var genre = [
    {
        name: 'Shooter',
        check: false
    },
    {
        name: 'OpenWorld',
        check: false
    },
    {
        name: 'Casual',
        check: false
    },
    {
        name: 'HyperCasual',
        check: false
    },{
        name: 'Survival',
        check: false
    }
    ,{
        name: 'Puzzle',
        check: false
    }
]
var feature = [
    {
        name: 'Co.op',
        check: false
    },
    {
        name: 'Multiplayer',
        check: false
    },
    {
        name: 'Single Player',
        check: false
    },
]

function Fillter(){

    const [genres, setGenres] = useState(genre); 
    const [features, setFeatures] = useState(feature); 

    function setCheckGenre(nameGenre){
        for(var i = 0; i < 6; i++){
            if (genre[i].name === nameGenre){
                genre[i].check = !genre[i].check;
            }
        }
        setGenres(genre);
    }

    function setCheckFeature(nameFeature){
        for(var i = 0; i < 3; i++){
            if (feature[i].name === nameFeature){
                feature[i].check = !feature[i].check;
            }
        }
        setFeatures(feature);
    }
    return(
        <div className="relative">
            <div className="background-white absolute">
                <div className="lay-out-fillter">
                    <div className="layout-1 border-bottom">
                        <div className="pd-top-bottom-10 pd-left-right-5">
                            <p className="fs-14 lh-16 mg-0">Fillter</p>
                        </div>
                    </div>
                    <Genre genres={genres} onClick={setCheckGenre}></Genre>
                    <Feature features={features} onClick={setCheckFeature}></Feature>
                </div>
            </div>
        </div>
    )
}

export default Fillter;
