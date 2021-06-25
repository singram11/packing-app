function Login() {
    return <LoginForm></LoginForm>
}

function LoginForm() {
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
            .then(() => props.onSubmit && props.onSubmit()) ///THIS NEEDS TO BE CHANGED
    };

    return( 
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="text" value={email} onChange={handleEmailChange}/>
                <label>Password:</label>
                <input value={password} onChange={handlePasswordChange}/>
                <input type="submit" value="Submit"/>
            </form>
        );
}


ReactDOM.render(<LoginForm/>, document.getElementById('root'));