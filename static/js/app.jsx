function App() {
        const loggedInCookie = localStorage.getItem('loggedIn')
        const [login, setLogin] = React.useState(loggedInCookie);


    return (
    <React.Fragment>
        {login ?
        <ReactRouterDOM.BrowserRouter>
            <Nav setLoginStatus={setLogin}/>
            {/* <ContainerTest/> */}
            {/* <ReactRouterDOM.Switch> */}
                <ReactRouterDOM.Route path='/lists' >
                    <ListsPage />
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route path="/lists/:id">
                    <div className="main-panel">
                        <ListDetailsPage />
                    </div>
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route path='/gear' >
                    <ShowGear />
                </ReactRouterDOM.Route>
            {/* </ReactRouterDOM.Switch> */}
        </ReactRouterDOM.BrowserRouter>
        : <LoginPage onSubmit={setLogin}/> }
    </React.Fragment>
    )
}

// export default function testExport(){
//     return hello

// }

// function ContainerTest(){
//     return <ReactBootstrap.Container>
//         Does this work?
//     </ReactBootstrap.Container>
// }


ReactDOM.render(<App/>, document.getElementById('root'));