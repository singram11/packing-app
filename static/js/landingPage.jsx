function LandingPage(props) {
    return (
        <ReactBootstrap.Container fluid className="landing-page m-0 p-0">
            <ReactBootstrap.Container>
                <ReactBootstrap.Row className="my-4">
                    <h1 style={{ textAlign: 'center' }}>
                        Get Ready For Your Next Adventure
                    </h1>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="landing-page-links">
                    <ReactBootstrap.Col className="align d-flex justify-content-center">
                        <ReactBootstrap.Button variant="dark">
                            <ReactRouterDOM.Link
                                as={ReactBootstrap.Button}
                                to="/lists"
                            >
                                Update Your Lists
                            </ReactRouterDOM.Link>
                        </ReactBootstrap.Button>
                    </ReactBootstrap.Col>
                    <ReactBootstrap.Col className="d-flex justify-content-center">
                        <ReactBootstrap.Button variant="dark">
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
