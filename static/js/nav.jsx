function Nav(props){
   
    return (
        <ReactBootstrap.Navbar>
            <ReactBootstrap.Container>
            <ReactBootstrap.Nav className="me-auto">
            {/* <ul className='nav-links'> fix this!!!!*/ }
                <ReactRouterDOM.NavLink to='/lists' >  
                    Lists
                </ReactRouterDOM.NavLink>
                <ReactRouterDOM.NavLink to='/gear'>
                    Gear
                </ReactRouterDOM.NavLink>
            {/* </ul> */}
            </ReactBootstrap.Nav>
            <LogOutButton setLoginStatus={props.setLoginStatus}/>
            </ReactBootstrap.Container>
        </ReactBootstrap.Navbar>
    )

}

function LogOutButton(props){
    const history = ReactRouterDOM.useHistory();

    function logOut() {
        props.setLoginStatus(false);
        localStorage.removeItem('loggedIn', undefined);
        history.push('/')
   }
    return <ReactBootstrap.Button className='logout' onClick={logOut}>Log Out</ReactBootstrap.Button>
}