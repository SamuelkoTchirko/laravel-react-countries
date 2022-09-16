import React from 'react';
import ReactDOM from 'react-dom';

function Navigation() {
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid col-md-8">
                <a className="navbar-brand" href="/">Countries</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMarkup" aria-controls="navbarMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link" href="/">Countries</a>
                        <a className="nav-link" href="/add">Add Country</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
