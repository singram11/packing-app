function ListsPage(props) {
    const loggedIn = localStorage.getItem('loggedIn');

    const [loggedInUpdate, setLogin] = React.useState(loggedIn);

    const [lists, setLists] = React.useState({});

    // const { id } = ReactRouterDOM.useParams();

    function renderLists() {
        fetch('/api/lists')
            .then((response) => response.json())
            .then((result) => {
                setLists(result);
            });
    }

    React.useEffect(() => {
        renderLists();
    }, []);

    return (
        <div className="mt-2">
            <Lists refreshLists={renderLists} lists={lists} />
            <AddList renderLists={renderLists} />
        </div>
    );
}

function ListDetailsPage(props) {
    const { id } = ReactRouterDOM.useParams();

    const [listDetails, setListDetails] = React.useState({});

    const url = `/api/lists/${id}`;

    function renderListItems() {
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                setListDetails(result);
            });
    }

    React.useEffect(() => {
        renderListItems();
    }, [id]);

    return (
        <React.Fragment>
            <ReactBootstrap.Row className="justify-content-between mt-2">
                <ReactBootstrap.Col>List Title Here</ReactBootstrap.Col>
                <ReactBootstrap.Col md="auto">
                    <AddListItems onSubmit={renderListItems} id={id} />
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
            <ShowItemCategories
                renderListItems={renderListItems}
                listDetails={listDetails}
            />
        </React.Fragment>
    );
}
