function LoginPage(props){
// props onsubmit

    const [ toggleReg, setToggleReg] = React.useState(false);

    const [alertMessage, setAlertMessage] = React.useState('')

    React.useEffect(()=> {
        setAlertMessage('')
    }, [toggleReg])

    function handleClick(){
        setToggleReg(true);
    }
    
// toggle what screen is show by the toggle reg button?
    return <div>
                {toggleReg 
                ? (<React.Fragment>
                    <CreateNewAccountForm closeForm={setToggleReg} logIn={props.onSubmit} message={setAlertMessage}/>
                    {alertMessage ? <AlertMessage message={alertMessage}/> : null}
                </React.Fragment> )
                : (<React.Fragment>
                        <LoginForm onSubmit={props.onSubmit} message={setAlertMessage}/>
                        {alertMessage ? <AlertMessage message={alertMessage}/> : null}
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
    // onSubmit, message
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
                        props.message(jsonResponse.message)
                    }
            })
    };

    return( 
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type='email' required='required' value={email} onChange={handleEmailChange}/>
                <label>Password:</label>
                <input type='password' required='required' value={password} onChange={handlePasswordChange}/>
                <input type="submit" value="Log In"/>
            </form>
        );
}

function CreateNewAccountForm(props) {
    // props: closeForm, logIn, message
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
                    if (jsonResponse.success) {
                        localStorage.setItem('loggedIn', true);
                        props.logIn(true)
                    } else {
                        props.message(jsonResponse.message)
                        console.log("jsonResponse.message");
                    }
            })
       
        // maybe a way to make a better toggle ??
    };

    return( 
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type='email' required='required' value={email} onChange={handleEmailChange}/>
                <label>Password:</label>
                <input type='password' required='required' value={password} onChange={handlePasswordChange}/>
                <label>First Name:</label>
                <input type='text' required='required' value={fname} onChange={handleFnameChange}/>
                <label>Last Name</label>
                <input value={lname} onChange={handleLnameChange}/>
                <input type="submit" value="Create Account"/>
            </form>
            <CloseFormButton showForm={props.closeForm}/>
        </React.Fragment>
    );
}

function AlertMessage(props){
    //props message 
    return <div>{props.message}</div>

}