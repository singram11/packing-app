function Nav(){

    return (
        <nav>
            <ul className='nav-links'>
                <ReactRouterDOM.Link to='/lists'>
                    <li>Lists</li>
                </ReactRouterDOM.Link>
                <ReactRouterDOM.Link to='/gear'>
                    <li>Gear</li>
                </ReactRouterDOM.Link>
                <ReactRouterDOM.Link  to='/logout'>
                    <li>Logout</li>
                </ReactRouterDOM.Link>
        
            </ul>
        </nav>
    )

}