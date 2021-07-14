function Nav(props){
    function logOut() {
        props.logOut(false);
    }

    return (
        <nav>
            <ul className='nav-links'>
                <ReactRouterDOM.NavLink to='/lists'>
                    <li>Lists</li>
                </ReactRouterDOM.NavLink>
                <ReactRouterDOM.NavLink to='/gear'>
                    <li>Gear</li>
                </ReactRouterDOM.NavLink>
            </ul>
            <button className='logout' onClick={logOut}>Log Out</button>
        </nav>
    )

}