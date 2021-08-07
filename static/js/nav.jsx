function Nav(props){
   
    return (
        <ReactBootstrap.Navbar >
            <ReactBootstrap.Container>
            <ReactBootstrap.Nav className="me-auto">
                <ReactBootstrap.Nav.Link >
                    <ReactRouterDOM.NavLink activeClassName='selected' to='/lists' >  
                        Lists
                    </ReactRouterDOM.NavLink>
                </ReactBootstrap.Nav.Link>
                <ReactBootstrap.Nav.Link >
                    <ReactRouterDOM.NavLink activeClassName='selected' to='/gear'>
                        Gear
                    </ReactRouterDOM.NavLink>
                </ReactBootstrap.Nav.Link>
            </ReactBootstrap.Nav>
            <ReactBootstrap.Navbar.Text className='ml-3'>Your username here</ReactBootstrap.Navbar.Text>
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
    return <ReactBootstrap.Button size='sm' className='logout' onClick={logOut}>Log Out</ReactBootstrap.Button>
}