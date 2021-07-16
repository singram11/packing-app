function App() {
        const loggedIn = localStorage.getItem('loggedIn')
        const [login, setLogin] = React.useState(loggedIn);


    return (
    <React.Fragment>
        {login ?
        <ReactRouterDOM.BrowserRouter>
            <Nav logOut={setLogin}/>
            <ReactRouterDOM.Switch>
                <ReactRouterDOM.Route path='/lists' exact>
                    <ListsPage/>
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route path='/gear' exact>
                    <ShowGear/>
                </ReactRouterDOM.Route>
                {/* <ReactRouterDOM.Route path='/api/gear/:id'>
                    <ShowGear/>
                    <ShowGearDetails/>
                </ReactRouterDOM.Route> */}
            </ReactRouterDOM.Switch>
        </ReactRouterDOM.BrowserRouter>
        : <LoginForm onSubmit={setLogin}/> }
    </React.Fragment>
    )
}


ReactDOM.render(<App/>, document.getElementById('root'));