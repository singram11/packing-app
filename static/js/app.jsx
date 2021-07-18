function App() {
        const loggedInCookie = localStorage.getItem('loggedIn')
        const [login, setLogin] = React.useState(loggedInCookie);


    return (
    <React.Fragment>
        {login ?
        <ReactRouterDOM.BrowserRouter>
            <Nav setLoginStatus={setLogin}/>
            <ReactRouterDOM.Switch>
                <ReactRouterDOM.Route path='/lists' >
                    <ListsPage/>
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route path='/gear' >
                    <ShowGear/>
                </ReactRouterDOM.Route>
            </ReactRouterDOM.Switch>
        </ReactRouterDOM.BrowserRouter>
        : <LoginForm onSubmit={setLogin}/> }
    </React.Fragment>
    )
}


ReactDOM.render(<App/>, document.getElementById('root'));