import spinner from "./Dual Ring-1s-200px.gif";

import React from 'react'

export default function LoadingSpinner() {
    return (
        <div>
            <img src={spinner} style={{ width: "100px", height: "100px" }} alt="Loading is in progress" />
        </div>
    )
}
