function Homepage() {
    const loggedIn = localStorage.getItem('loggedIn')
    const [loggedInUpdate, setLogin] = React.useState(loggedIn);

    return <React.Fragment>
                {loggedIn ? <LoggedInHomepage updateLogin = {setLogin}/> : <LoginForm onSubmit={setLogin}/> }
            </React.Fragment>
}

function LoggedInHomepage(){
    
    
    function logOut() {
        localStorage.removeItem('loggedIn', undefined);
       
    }

    return <React.Fragment>
            <h1> Welcome to the packing app!</h1>
            <button className='logOut' onClick={logOut}>Log Out</button>
        </React.Fragment>
}

function LogOutButton(){

    function logOut() {
        localStorage.removeItem('loggedIn', undefined);
    }

    return <button className='logOut' onClick={logOut}>Log Out</button>
}

ReactDOM.render(<Homepage/>, document.getElementById('root'));