function App() {
        const loggedInCookie = localStorage.getItem('loggedIn')
        const [login, setLogin] = React.useState(loggedInCookie);
        const [userInfo, setUserInfo] = React.useState('');

        function getUserInfo(){
            fetch('/api/user/me')
                .then((response) => response.json())
                .then((result) => {setUserInfo(result);
                });
        }

        React.useEffect(()=> {
            if (login) {
                getUserInfo()
            }
        }, [login])

    return (
    <React.Fragment>
        {login ?
        <ReactRouterDOM.BrowserRouter>
            
            <Nav userInfo={userInfo} login={login} setLoginStatus={setLogin}/>
            {/* <ContainerTest/> */}
            {/* <ReactRouterDOM.Switch> */}
            <ReactBootstrap.Container fluid>
                <ReactBootstrap.Row>
                    <ReactRouterDOM.Route path='/lists' >
                        <ReactBootstrap.Col fluid xs={3}>
                            <ListsPage />
                        </ReactBootstrap.Col>
                    </ReactRouterDOM.Route>
                    <ReactRouterDOM.Route path="/lists/:id">
                        <ReactBootstrap.Col>
                            <ListDetailsPage />
                        </ReactBootstrap.Col>
                    </ReactRouterDOM.Route>
                </ReactBootstrap.Row>
                <ReactRouterDOM.Route path='/gear' >
                    <ShowGear />
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route path='/gear/:id'>
                        <ShowGearDetails/>
                </ReactRouterDOM.Route>
            </ReactBootstrap.Container>
            {/* </ReactRouterDOM.Switch> */}
        </ReactRouterDOM.BrowserRouter>
        : <LoginPage 
            onSubmit={setLogin}/> }
    </React.Fragment>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));