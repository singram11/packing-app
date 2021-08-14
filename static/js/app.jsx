function App() {
    const loggedInCookie = localStorage.getItem('loggedIn');
    const [login, setLogin] = React.useState(loggedInCookie);
    const [userInfo, setUserInfo] = React.useState('');

    function getUserInfo() {
        fetch('/api/user/me')
            .then((response) => response.json())
            .then((result) => {
                setUserInfo(result);
            });
    }

    React.useEffect(() => {
        if (login) {
            getUserInfo();
        }
    }, [login]);

    return (
        <React.Fragment>
            {login ? (
                <ReactRouterDOM.BrowserRouter>
                    <Nav
                        userInfo={userInfo}
                        login={login}
                        setLoginStatus={setLogin}
                    />
                    {/* <ReactRouterDOM.Switch> */}
                    <div className='offset'>
                        <ReactRouterDOM.Route exact path='/'>
                            <LandingPage />
                        </ReactRouterDOM.Route>
                        <ReactRouterDOM.Route path='/lists'>
                            <ReactBootstrap.Container
                                className='content-container'
                                fluid
                            >
                                <ReactBootstrap.Row className='list-container-height'>
                                    <ReactBootstrap.Col
                                        className='pr-4 sidebar pads'
                                        fluid
                                        xs={3}
                                    >
                                        <ListsPage />
                                    </ReactBootstrap.Col>
                                    <ReactBootstrap.Col>
                                        <ReactRouterDOM.Route path='/lists/:id'>
                                            <ListDetailsPage />
                                        </ReactRouterDOM.Route>
                                    </ReactBootstrap.Col>
                                </ReactBootstrap.Row>
                            </ReactBootstrap.Container>
                        </ReactRouterDOM.Route>
                        <ReactRouterDOM.Route path='/gear'>
                            <ReactBootstrap.Container
                                className='content-container'
                                fluid
                            >
                                <ReactBootstrap.Row className='list-container-height'>
                                    <ReactBootstrap.Col
                                        xs={4}
                                        // className="pr-4 sidebar pads align-items-stretch"
                                        className='sidebar pr-4'
                                        fluid
                                    >
                                        <ShowGear />
                                    </ReactBootstrap.Col>

                                    <ReactRouterDOM.Route path='/gear/:id'>
                                        <ReactBootstrap.Col>
                                            <ShowGearDetails />
                                        </ReactBootstrap.Col>
                                    </ReactRouterDOM.Route>
                                </ReactBootstrap.Row>
                            </ReactBootstrap.Container>
                        </ReactRouterDOM.Route>
                        {/* </ReactRouterDOM.Switch> */}
                    </div>
                </ReactRouterDOM.BrowserRouter>
            ) : (
                <LoginPage onSubmit={setLogin} />
            )}
        </React.Fragment>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
