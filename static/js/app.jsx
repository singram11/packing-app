function App() {

    const [login, setLogin] = React.useState();


    return (
    <React.Fragment>
        {login ?
        <ReactRouterDOM.BrowserRouter>
            <Nav logOut={setLogin}/>
            <ReactRouterDOM.Switch>
                <ReactRouterDOM.Route path='/lists' exact>
                    <ListsPage/>
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route path='/lists/items/:id'>
                    <ListDetailsPage/>
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route path='/gear' exact>
                    <ShowGear/>
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route path='/api/gear/:id'>
                    <ShowGearDetails/>
                </ReactRouterDOM.Route>
            </ReactRouterDOM.Switch>
        </ReactRouterDOM.BrowserRouter>
        : <LoginForm onSubmit={setLogin}/> }
    </React.Fragment>
    )
}


ReactDOM.render(<App/>, document.getElementById('root'));