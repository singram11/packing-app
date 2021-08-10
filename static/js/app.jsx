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
                    {/* <ContainerTest/> */}
                    {/* <ReactRouterDOM.Switch> */}
                    <div className="offset">
                        {/* <ReactBootstrap.Container fluid> */}
                        <ReactRouterDOM.Route exact path="/">
                            <LandingPage />
                        </ReactRouterDOM.Route>
                        <ReactBootstrap.Container
                            className="content-container"
                            fluid
                        >
                            <ReactBootstrap.Row>
                                <ReactRouterDOM.Route path="/lists">
                                    <ReactBootstrap.Col
                                        className="pr-4 sidebar pads align-items-stretch"
                                        fluid
                                        xs={3}
                                    >
                                        <ListsPage />
                                    </ReactBootstrap.Col>
                                </ReactRouterDOM.Route>
                                <ReactRouterDOM.Route path="/lists/:id">
                                    <ReactBootstrap.Col>
                                        <ListDetailsPage />
                                    </ReactBootstrap.Col>
                                </ReactRouterDOM.Route>
                            </ReactBootstrap.Row>
                            <ReactBootstrap.Row>
                                <ReactRouterDOM.Route path="/gear">
                                    <ReactBootstrap.Col
                                        xs={4}
                                        className="pr-4 sidebar pads align-items-stretch"
                                        fluid
                                    >
                                        <ShowGear />
                                    </ReactBootstrap.Col>
                                </ReactRouterDOM.Route>

                                <ReactRouterDOM.Route path="/gear/:id">
                                    <ReactBootstrap.Col>
                                        <ShowGearDetails />
                                    </ReactBootstrap.Col>
                                </ReactRouterDOM.Route>
                            </ReactBootstrap.Row>
                        </ReactBootstrap.Container>
                        {/* </ReactBootstrap.Container> */}
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
