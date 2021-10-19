import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";

interface Pages{
    page: number;
}

function Page({
    page
}:Pages){
    const [rendering, setRendering] = useState(1);
    rendering === 1 ? null : window.location.reload();

    return(
        <div className="d-flex center">
        <div className="d-inline-block">
          <div className="page d-flex align-center">
            {page === 1 
              ?
              <div className="btn-prev not-allowed disable mr-right-8">
                <i className="fa fa-chevron-left"></i>
              </div>
              :
              <Link to={"/browse?page=" + (page-1)}>
                <div 
                  className="btn-prev pointer text-white mr-right-8"
                  onClick={()=>setRendering(rendering+1)}
                >
                  <i className="fa fa-chevron-left"></i>
                </div>
              </Link>
            }
            <div className="d-flex align-center">
              <Link to={page >= 5 ? "/browse?page=" + (page-3) : "/browse?page=1"}>
                <div className={
                    page === 1 && page < 5 
                    ? "btn-page not-allowed hover-btn-page disable text-white" 
                    : "btn-page pointer hover-btn-page hover-btn-page transition-02 text-white"}
                    onClick={()=>setRendering(rendering+1)}
                >
                  <span>{page >= 5 ? page - 3 : 1}</span>
                </div>
              </Link>
              <Link to={page >= 5 ? "/browse?page=" + (page-2) : "/browse?page=2"}>
                <div className={
                    page === 2 && page < 5 
                    ? "btn-page not-allowed hover-btn-page disable text-white" 
                    : "btn-page pointer hover-btn-page hover-btn-page transition-02 text-white"}
                    onClick={()=>setRendering(rendering+1)}
                >
                  <span>{page >= 5 ? page - 2 : 2}</span>
                </div>
              </Link>
              <Link to={page >= 5 ? "/browse?page=" + (page-1) : "/browse?page=3"}>
                <div className={
                    page === 3 && page < 5 
                    ? "btn-page not-allowed hover-btn-page disable text-white" 
                    : "btn-page pointer hover-btn-page hover-btn-page transition-02 text-white"}
                    onClick={()=>setRendering(rendering+1)}
                >
                  <span>{page >= 5 ? page - 1 : 3}</span>
                </div>
              </Link>
              <Link to={page >= 5 ? "/browse?page=" + (page) : "/browse?page=4"}>
                <div className={
                    page === 4 || page >= 5 
                    ? "btn-page not-allowed hover-btn-page disable text-white" 
                    : "btn-page pointer hover-btn-page hover-btn-page transition-02 text-white"}
                    onClick={()=>setRendering(rendering+1)}
                >
                  <span>{page >= 5 ? page : 4}</span>
                </div>
              </Link>
              <Link to={page >= 5 ? "/browse?page=" + (page+1) : "/browse?page=5"}>
                <div className={
                    page === 5 && page < 5 
                    ? "btn-page not-allowed hover-btn-page disable text-white" 
                    : "btn-page pointer hover-btn-page hover-btn-page transition-02 text-white"}
                    onClick={()=>setRendering(rendering+1)}
                >
                  <span>{page >= 5 ? page + 1 : 5}</span>
                </div>
              </Link>
            </div>
            <Link to={"/browse?page=" + (page+1)}>
              <div 
                className="btn-next pointer text-white hover-btn-page transition-02 mr-left-8"
                onClick={()=>setRendering(rendering+1)}
              >
                <i className="fa fa-chevron-right"></i>
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
}

export default Page;