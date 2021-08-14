function Nav(props) {
    //    user = props.userInfo;
    //    email = user.email
    return (
        <ReactBootstrap.Navbar variant='dark' fixed='top'>
            <ReactBootstrap.Container fluid className='mx-2 px-2'>
                <ReactBootstrap.Nav className='me-auto'>
                    <ReactBootstrap.Navbar.Brand>
                        <ReactRouterDOM.NavLink to='/'>
                            <img
                                src='/static/images/icons/tree.svg'
                                width='25'
                                height='25'
                                className='d-inline-block align-bottom'
                                alt='React Bootstrap logo'
                            />
                        </ReactRouterDOM.NavLink>
                    </ReactBootstrap.Navbar.Brand>
                    <ReactRouterDOM.NavLink
                        activeClassName='selected'
                        to='/lists'
                        className='mx-3 pt-2 nav-link'
                    >
                        Lists
                    </ReactRouterDOM.NavLink>

                    <ReactRouterDOM.NavLink
                        activeClassName='selected'
                        to='/gear'
                        className='mx-3 pt-2 nav-link'
                    >
                        Gear
                    </ReactRouterDOM.NavLink>
                </ReactBootstrap.Nav>
                <ReactBootstrap.Navbar.Text className='ml-3'>
                    {props.userInfo['email']} |
                </ReactBootstrap.Navbar.Text>
                <LogOutButton setLoginStatus={props.setLoginStatus} />
            </ReactBootstrap.Container>
        </ReactBootstrap.Navbar>
    );
}

function LogOutButton(props) {
    const history = ReactRouterDOM.useHistory();

    function logOut() {
        props.setLoginStatus(false);
        localStorage.removeItem('loggedIn', undefined);
        history.push('/');
    }
    return (
        <ReactBootstrap.Button
            variant='link'
            size='sm'
            className='logout'
            onClick={logOut}
        >
            Log Out
        </ReactBootstrap.Button>
    );
}
