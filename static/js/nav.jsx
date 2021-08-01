function Nav(props){
   
    return (
        <nav>
            <ul className='nav-links'>
                <ReactRouterDOM.NavLink to='/lists' >
                    <li>Lists</li>
                </ReactRouterDOM.NavLink>
                <ReactRouterDOM.NavLink to='/gear'>
                    <li>Gear</li>
                </ReactRouterDOM.NavLink>
            </ul>
            <LogOutButton setLoginStatus={props.setLoginStatus}/>
        </nav>
    )

}

function LogOutButton(props){
    const history = ReactRouterDOM.useHistory();

    function logOut() {
        props.setLoginStatus(false);
        localStorage.removeItem('loggedIn', undefined);
        history.push('/')
   }
    return <button className='logout' onClick={logOut}>Log Out</button>
}