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
                    <ReactBootstrap.Container className="offset" fluid>
                        <ReactRouterDOM.Route exact path="/">
                            <LandingPage />
                        </ReactRouterDOM.Route>
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
                            <ReactBootstrap.Col xs={4}>
                                <ReactRouterDOM.Route path="/gear">
                                    <ShowGear />
                                </ReactRouterDOM.Route>
                            </ReactBootstrap.Col>
                            <ReactBootstrap.Col>
                                <ReactRouterDOM.Route path="/gear/:id">
                                    <ShowGearDetails />
                                </ReactRouterDOM.Route>
                            </ReactBootstrap.Col>
                        </ReactBootstrap.Row>
                    </ReactBootstrap.Container>
                    {/* </ReactRouterDOM.Switch> */}
                </ReactRouterDOM.BrowserRouter>
            ) : (
                <LoginPage onSubmit={setLogin} />
            )}
        </React.Fragment>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
