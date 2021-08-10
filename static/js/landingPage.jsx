function LandingPage(props) {
    return (
        <ReactBootstrap.Container fluid className="landing-page m-0 p-0">
            <ReactBootstrap.Container>
                <ReactBootstrap.Row className="my-4">
                    <h1>Get Ready For Your Next Adventure</h1>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="landing-page-links">
                    <ReactBootstrap.Col>
                        <ReactBootstrap.Button variant="outline-primary">
                            <ReactRouterDOM.Link
                                as={ReactBootstrap.Button}
                                to="/lists"
                            >
                                Update Your Lists
                            </ReactRouterDOM.Link>
                        </ReactBootstrap.Button>
                    </ReactBootstrap.Col>
                    <ReactBootstrap.Col>
                        <ReactBootstrap.Button variant="outline-primary">
                            <ReactRouterDOM.Link to="/gear">
                                Review Your Gear
                            </ReactRouterDOM.Link>
                        </ReactBootstrap.Button>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </ReactBootstrap.Container>
    );
}
