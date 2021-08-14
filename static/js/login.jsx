function LoginPage(props) {
    // props onsubmit

    const [toggleReg, setToggleReg] = React.useState(false);

    const [alertMessage, setAlertMessage] = React.useState('');

    React.useEffect(() => {
        setAlertMessage('');
    }, [toggleReg]);

    function handleClick() {
        setToggleReg(true);
    }

    return (
        <section className='login-page d-flex align-items-center justify-content-center'>
            <ReactBootstrap.Container
                md='auto'
                className='login-overlay mx-auto align-middle flex-column'
            >
                <ReactBootstrap.Row className='align-items-center'>
                    <ReactBootstrap.Col className='align-self-center align-items-center'>
                        {toggleReg ? (
                            <React.Fragment>
                                <CreateNewAccountForm
                                    closeForm={setToggleReg}
                                    logIn={props.onSubmit}
                                    message={setAlertMessage}
                                />
                                {alertMessage ? (
                                    <AlertMessage message={alertMessage} />
                                ) : null}
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <LoginForm
                                    onSubmit={props.onSubmit}
                                    message={setAlertMessage}
                                />
                                {alertMessage ? (
                                    <AlertMessage message={alertMessage} />
                                ) : null}
                                <a
                                    className='m-4 new-account-link'
                                    onClick={handleClick}
                                    style={{ cursor: 'pointer' }}
                                    href={void 0}
                                >
                                    Create a New Account
                                </a>
                            </React.Fragment>
                        )}
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </section>
    );
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password }),
        };

        fetch('/login', postBody)
            .then((response) => response.json())
            .then((jsonResponse) => {
                if (jsonResponse.success) {
                    localStorage.setItem('loggedIn', true);
                    props.onSubmit(true);
                } else {
                    props.message(jsonResponse.message);
                }
            });
    }

    return (
        <ReactBootstrap.Form onSubmit={handleSubmit} className='m-4'>
            <ReactBootstrap.Form.Group
                className='mb-3 mt-3'
                as={ReactBootstrap.Row}
                controlId='email'
            >
                <ReactBootstrap.Form.Label column sm={3}>
                    Email:
                </ReactBootstrap.Form.Label>
                <ReactBootstrap.Col sm={9}>
                    <ReactBootstrap.Form.Control
                        type='email'
                        required='required'
                        value={email}
                        onChange={handleEmailChange}
                    />
                </ReactBootstrap.Col>
            </ReactBootstrap.Form.Group>
            <ReactBootstrap.Form.Group
                className='mb-3'
                as={ReactBootstrap.Row}
                controlId='password'
            >
                <ReactBootstrap.Form.Label column sm={3}>
                    Password:
                </ReactBootstrap.Form.Label>
                <ReactBootstrap.Col sm={9}>
                    <ReactBootstrap.Form.Control
                        type='password'
                        required='required'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </ReactBootstrap.Col>
            </ReactBootstrap.Form.Group>
            <ReactBootstrap.Button variant='primary' type='submit'>
                Log In
            </ReactBootstrap.Button>
        </ReactBootstrap.Form>
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
                fname: fname,
                lname: lname,
            }),
        };

        fetch('/new-account', postBody)
            .then((response) => response.json())
            .then((jsonResponse) => {
                if (jsonResponse.success) {
                    localStorage.setItem('loggedIn', true);
                    props.logIn(true);
                } else {
                    props.message(jsonResponse.message);
                }
            });
    }

    return (
        <React.Fragment>
            <ReactBootstrap.Form onSubmit={handleSubmit} className='m-4'>
                <ReactBootstrap.Form.Group
                    className='mt-3 mb-3'
                    as={ReactBootstrap.Row}
                    controlId='email'
                >
                    <ReactBootstrap.Form.Label column sm={3}>
                        Email:
                    </ReactBootstrap.Form.Label>
                    <ReactBootstrap.Col sm={9}>
                        <ReactBootstrap.Form.Control
                            type='email'
                            required='required'
                            // value={email}
                            onChange={handleEmailChange}
                        />
                    </ReactBootstrap.Col>
                </ReactBootstrap.Form.Group>
                <ReactBootstrap.Form.Group
                    className='mb-3'
                    as={ReactBootstrap.Row}
                    controlId='password'
                >
                    <ReactBootstrap.Form.Label column sm={3}>
                        Password:
                    </ReactBootstrap.Form.Label>
                    <ReactBootstrap.Col sm={9}>
                        <ReactBootstrap.Form.Control
                            type='password'
                            required='required'
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </ReactBootstrap.Col>
                </ReactBootstrap.Form.Group>
                <ReactBootstrap.Form.Group
                    className='mb-3'
                    as={ReactBootstrap.Row}
                    controlId='first-name'
                >
                    <ReactBootstrap.Form.Label column sm={3}>
                        First Name:
                    </ReactBootstrap.Form.Label>
                    <ReactBootstrap.Col sm={9}>
                        <ReactBootstrap.Form.Control
                            type='text'
                            required='required'
                            value={fname}
                            onChange={handleFnameChange}
                        />
                    </ReactBootstrap.Col>
                </ReactBootstrap.Form.Group>
                <ReactBootstrap.Form.Group
                    className='mb-3'
                    as={ReactBootstrap.Row}
                    controlId='last-name'
                >
                    <ReactBootstrap.Form.Label column sm={3}>
                        Last Name:
                    </ReactBootstrap.Form.Label>
                    <ReactBootstrap.Col sm={9}>
                        <ReactBootstrap.Form.Control
                            value={lname}
                            onChange={handleLnameChange}
                        />
                    </ReactBootstrap.Col>
                </ReactBootstrap.Form.Group>
                <ReactBootstrap.Row>
                    <ReactBootstrap.Col>
                        <ReactBootstrap.Button type='submit'>
                            Create Account
                        </ReactBootstrap.Button>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row>
                    <ReactBootstrap.Col className='mt-3'>
                        <CloseFormButton
                            as={ReactBootstrap.Col}
                            showForm={props.closeForm}
                            buttonSize={''}
                            buttonVariant={'outline-primary'}
                            buttonClass={'close-registration mb-4 ml-4'}
                            content={'Cancel'}
                        />
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Form>
        </React.Fragment>
    );
}

function AlertMessage(props) {
    //props message
    return (
        <ReactBootstrap.Container>
            <ReactBootstrap.Alert variant='warning'>
                {props.message}
            </ReactBootstrap.Alert>
        </ReactBootstrap.Container>
    );
}
