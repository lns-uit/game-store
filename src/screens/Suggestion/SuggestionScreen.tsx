import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function SuggestionScreen() {
    let slug  = useParams();

    const getPostTitleSuggestion = (slug : any) => {
        switch (slug.title) {
            case 'top-sellers': return 'Top sellers';
            case 'new-release': return 'New release';
            case 'free-games': return 'Free games';
            case 'most-popular': return 'Most popular';
            case 'free-now': return 'Free now';
            case 'most-favorite': return 'Most favorite';
            case 'game-on-sales': return 'Game on sales';
        }
    }
    useEffect(()=>{
        console.log(getPostTitleSuggestion(slug))
    },[])
    return(
        <div></div>
    )
}

export default SuggestionScreen;