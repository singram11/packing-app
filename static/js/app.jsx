function App() {
        const loggedInCookie = localStorage.getItem('loggedIn')
        const [login, setLogin] = React.useState(loggedInCookie);

        // React.useEffect(()=> {
        //     if (!login) {

        //     }else {

        //     }
        // }, [login])
    return (
    <React.Fragment>
        {login ?
        <ReactRouterDOM.BrowserRouter>
            
            <Nav setLoginStatus={setLogin}/>
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
        : <LoginPage onSubmit={setLogin}/> }
    </React.Fragment>
    )
}

// export default function testExport(){
//     return hello

// }

// function ContainerTest(){
//     return <ReactBootstrap.Button>
//         Does this work?
//     </ReactBootstrap.Button>
// }


ReactDOM.render(<App/>, document.getElementById('root'));