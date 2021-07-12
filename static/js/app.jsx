function App() {
    return (
    <ReactRouterDOM.BrowserRouter>
        <Nav/>
        <ReactRouterDOM.Switch>
            <ReactRouterDOM.Route path="/lists">
                <QuickTest/>
            </ReactRouterDOM.Route>
            <ReactRouterDOM.Route path="/gear">
                <GearPage/>
            </ReactRouterDOM.Route>
        </ReactRouterDOM.Switch>

    </ReactRouterDOM.BrowserRouter>
    )
}


ReactDOM.render(<App/>, document.getElementById('root'));