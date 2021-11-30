import React from "react";

function DiscoverCMS() {
    return(
        <div className="console-container">
            <div className="console-detail-header">
                <h1>
                    DISCOVER CONTENT MANAGEMENT SYSTEM
                </h1>
                <div className="console-toolbar">

                    <div className="btn" onClick={() => { }}>
                        {" "}
                        Save{" "}
                    </div>
                </div>
            </div>
            <div className="console-list" onClick={focus}>
            </div>
        </div>
    )
}

export default DiscoverCMS;