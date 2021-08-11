function ListsPage(props) {
    const loggedIn = localStorage.getItem('loggedIn');

    const [loggedInUpdate, setLogin] = React.useState(loggedIn);

    const [lists, setLists] = React.useState({});

    const history = ReactRouterDOM.useHistory();

    function renderLists() {
        return fetch('/api/lists')
            .then((response) => response.json())
            .then((result) => {
                setLists(result);
                return result;
            });
    }

    function renderListsOnMount() {
        renderLists().then((result) => {
            if (
                Object.keys(result).length > 0 &&
                history.location.pathname === '/lists'
            ) {
                const key = Object.keys(result)[0];
                history.push(`/lists/${key}`);
            }
        });
    }

    React.useEffect(() => {
        renderListsOnMount();
    }, []);

    //   if (Object.keys(lists).length > 0 && !id) {
    //     console.log('butts');
    //     history.push('/lists/44');
    // }

    return (
        <div className="mt-2 lists-sidebar">
            <p>My Lists:</p>
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
                <ReactBootstrap.Col>
                    <h4 style={{ color: '#214233' }}>
                        {listDetails['list_name']}
                    </h4>
                </ReactBootstrap.Col>
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
