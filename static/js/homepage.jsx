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
                {loggedIn ? <LoggedInHomepage setLogin={setLogin}/> : <LoginForm onSubmit={setLogin}/> }
            </React.Fragment>
}

function LoggedInHomepage(props){
    
    console.log(props.setLogin)

    function logOut() {
        localStorage.removeItem('loggedIn', undefined);
        props.setLogin()
       
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

function LoginForm(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    
    function handleEmailChange(event) {
        setEmail(event.target.value);
      }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }
   
    function handleSubmit(event) {
        event.preventDefault();
        
        const postBody = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'email':email,
                                'password': password})
        };

        fetch('/login', postBody)
            .then((response) => response.json())
            .then((jsonResponse)=> {
                    if (jsonResponse.success) {
                        localStorage.setItem('loggedIn', true);
                        props.onSubmit(true)
                    } else {
                        console.log("noooope");
                    }
            })
    };

    return( 
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="text" value={email} onChange={handleEmailChange}/>
                <label>Password:</label>
                <input value={password} onChange={handlePasswordChange}/>
                <input type="submit" value="Log In"/>
            </form>
        );
}

// function LogOutButton(){

//     function logOut() {
//         localStorage.removeItem('loggedIn', undefined);
//     }

//     return <button className='logOut' onClick={logOut}>Log Out</button>
// }



ReactDOM.render(<Homepage/>, document.getElementById('root'));