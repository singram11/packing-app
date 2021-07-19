// function Homepage() {
//     const loggedIn = localStorage.getItem('loggedIn')
//     const [loggedInUpdate, setLogin] = React.useState(loggedIn);

const React = require("react");

//     return <React.Fragment>
//             {/* <ReactRouterDOM.BrowserRouter>
//                 <ReactRouterDOM.NavLink
//                     to ='/gear'
//                     activeClassName = '/selected'>Gear</ReactRouterDOM.NavLink>
//                 <ReactRouterDOM.NavLink
//                     to = '/lists'
//                     activeClassName = '/selected'>Lists</ReactRouterDOM.NavLink>
//                 </ReactRouterDOM.BrowserRouter> */}
//                 {loggedIn ? <LoggedInHomepage setLogin={setLogin}/> : <LoginForm onSubmit={setLogin}/> }
//             </React.Fragment>
// }

// function LoggedInHomepage(props){
    
//     console.log(props.setLogin)

//     function logOut() {
//         localStorage.removeItem('loggedIn', undefined);
//         props.setLogin()
       
//     }

//     return <React.Fragment>
//             <div>
//                 <a href='/lists'>Lists</a>
//                 <a href='/gear'>Gear</a>
//                 <button className='logOut' onClick={logOut}>Log Out</button>
//             </div>
//             <h1> Welcome to the packing app!</h1>
//         </React.Fragment>
// }

function LoginPage(props){
// props onsubmit

    const [ toggleReg, setToggleReg] = React.useState(false);

    function handleClick(){
        setToggleReg(true);
    }
    
// toggle what screen is show by the toggle reg button?
    return <div>
                
                {toggleReg 
                ? <CreateNewAccountForm closeForm={setToggleReg}/>
                : (<React.Fragment>
                        <LoginForm onSubmit={props.onSubmit}/>
                        <a 
                        onClick={handleClick} 
                        style={{cursor: 'pointer'}}
                        href={void (0)}>
                            Create a New Account
                    </a>
                  </React.Fragment>) }
        
            </div>
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

function CreateNewAccountForm(props) {
    // props: closeForm
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [fname, setFname] = React.useState('');
    const [lname, setLname] = React.useState('');

    function handleEmailChange(event) {
        setEmail(event.target.value);
      }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleFnameChange(event) {
        setFname(event.target.value);
      }

    function handleLnameChange(event) {
        setLname(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        
        const postBody = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'email':email,
                                'password': password,
                                'fname': fname,
                                'lname': lname})
        };

        fetch('/new-account', postBody)
            .then((response) => response.json())
            .then((jsonResponse)=> {
                    // if (jsonResponse.success) {
                    //     localStorage.setItem('loggedIn', true);
                    //     props.onSubmit(true)
                    // } else {
                    //     console.log("noooope");
                    // }
            })
        props.closeForm(false)
        // maybe a way to make a better toggle ??
    };

    return( 
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="text" value={email} onChange={handleEmailChange}/>
                <label>Password:</label>
                <input value={password} onChange={handlePasswordChange}/>
                <label>First Name:</label>
                <input type="text" value={fname} onChange={handleFnameChange}/>
                <label>Last Name</label>
                <input value={lname} onChange={handleLnameChange}/>
                <input type="submit" value="Create Account"/>
            </form>
            <CloseFormButton showForm={props.closeForm}/>
        </React.Fragment>
    );
}