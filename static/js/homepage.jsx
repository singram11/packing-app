function Homepage() {
    const loggedIn = localStorage.getItem('loggedIn')
    const [loggedInUpdate, setLogin] = React.useState(loggedIn);

    return <React.Fragment>
            {/* <ReactRouterDOM.BrowserRouter>
                <ReactRouterDOM.NavLink
                    to ='/gear'
                    activeClassName = '/selected'>Gear</ReactRouterDOM.NavLink>
                <ReactRouterDOM.NavLink
                    to = '/lists'
                    activeClassName = '/selected'>Lists</ReactRouterDOM.NavLink>
                </ReactRouterDOM.BrowserRouter> */}
                {loggedIn ? <LoggedInHomepage updateLogin = {setLogin}/> : <LoginForm onSubmit={setLogin}/> }
            </React.Fragment>
}

function LoggedInHomepage(){
    
    
    function logOut() {
        localStorage.removeItem('loggedIn', undefined);
       
    }

    return <React.Fragment>
            <div>
                <a href='/lists'>Lists</a>
                <a href='/gear'>Gear</a>
                <button className='logOut' onClick={logOut}>Log Out</button>
            </div>
            <h1> Welcome to the packing app!</h1>
        </React.Fragment>
}

// function LogOutButton(){

//     function logOut() {
//         localStorage.removeItem('loggedIn', undefined);
//     }

//     return <button className='logOut' onClick={logOut}>Log Out</button>
// }



ReactDOM.render(<Homepage/>, document.getElementById('root'));