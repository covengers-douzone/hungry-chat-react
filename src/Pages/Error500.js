import React from 'react';


function Error500({ history }) {

    function errorPageHandler(e){
        e.preventDefault();
        history.push("/sign-in");

    }

    return (
        <div className="error">
            <h1> 500: Inteneral Server error</h1>
            <button onClick={ errorPageHandler } >뒤로 가기</button>
        </div>
    )
}

export default Error500;
