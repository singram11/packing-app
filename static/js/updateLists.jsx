function DeleteListItemButton(props) {
    const id = props.id;

    function deleteListItem(id, event) {
        event.preventDefault();

        // const postBody = {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({id:id})
        // };
        const url = `/api/list-item/${id}`;
        fetch(url, { method: 'DELETE' })
            .then((response) => response.json())
            .then(() => props.renderListItems());
    }

    return (
        <ReactBootstrap.Button
            className="trash-can"
            onClick={(event) => deleteListItem(id, event)}
        >
            <img src="/static/images/icons/trash-fill.svg" />
        </ReactBootstrap.Button>
    );
}

function AddListItemForm(props) {
    // props = onSubmit, id, showForm
    const [itemName, setName] = React.useState();
    const [category, setCategory] = React.useState();

    const id = props.id;

    function handleListNameChange(event) {
        setName(event.target.value);
    }

    function handleCategoryChange(event) {
        setCategory(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const postBody = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: itemName,
                category: category,
                id: id,
            }),
        };

        fetch('/api/list-item', postBody).then(
            () => props.onSubmit && props.onSubmit()
        );

        setName('');
        setCategory('');
    }

    return (
        <ReactBootstrap.Container fluid className="list-item-form">
            <ReactBootstrap.Form fluid onSubmit={handleSubmit}>
                <ReactBootstrap.Form.Group>
                    <ReactBootstrap.Form.Label>
                        Item Name:
                    </ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control
                        type="text"
                        required="required"
                        value={itemName}
                        onChange={handleListNameChange}
                    />
                </ReactBootstrap.Form.Group>
                <ReactBootstrap.Form.Group>
                    <ReactBootstrap.Form.Label>
                        Category:
                    </ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control
                        value={category}
                        onChange={handleCategoryChange}
                    />
                </ReactBootstrap.Form.Group>
                <ReactBootstrap.Button className="mt-2" type="submit">
                    Submit
                </ReactBootstrap.Button>
            </ReactBootstrap.Form>
            <ReactBootstrap.Col>
                <CloseFormButton showForm={props.showForm} />
            </ReactBootstrap.Col>
        </ReactBootstrap.Container>
    );
}

function AddListForm(props) {
    // props.renderLists = (rerender lists)
    //props.showForm = setShowForm

    const [listName, setName] = React.useState('');
    const [category, setCategory] = React.useState('');

    // function onResponse(){
    //     props.renderLists();
    //     props.showForm(false);
    // }

    function handleListNameChange(event) {
        setName(event.target.value);
    }

    function handleCategoryChange(event) {
        setCategory(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const postBody = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: listName, category: category }),
        };

        fetch('/api/lists', postBody).then(
            () => props.renderLists && props.renderLists()
        );

        props.showForm(false);
        setName('');
        setCategory('');
    }

    return (
        <ReactBootstrap.Form onSubmit={handleSubmit} className="pr-4">
            <ReactBootstrap.Form.Group as={ReactBootstrap.Row} className="pr-5">
                <ReactBootstrap.Col>
                    <ReactBootstrap.Form.Label>
                        List Name:
                    </ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control
                        type="text"
                        required="required"
                        value={listName}
                        onChange={handleListNameChange}
                    />
                </ReactBootstrap.Col>
            </ReactBootstrap.Form.Group>
            <ReactBootstrap.Form.Group className="mb-2">
                <ReactBootstrap.Form.Label>Category:</ReactBootstrap.Form.Label>
                <ReactBootstrap.Form.Control
                    value={category}
                    className="mr-2"
                    onChange={handleCategoryChange}
                />
                <ReactBootstrap.Form.Text>Optional</ReactBootstrap.Form.Text>
            </ReactBootstrap.Form.Group>
            <ReactBootstrap.Row>
                <ReactBootstrap.Col className="justify-content-start" md="auto">
                    <ReactBootstrap.Button className="mr-2" type="submit">
                        Submit
                    </ReactBootstrap.Button>
                </ReactBootstrap.Col>
                <ReactBootstrap.Col className="justify-content-start" md="auto">
                    <CloseFormButton
                        buttonClass="close-list-form"
                        buttonVariant={'outline-primary'}
                        buttonSize={''}
                        showForm={props.showForm}
                    />
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        </ReactBootstrap.Form>
    );
}
function AddList(props) {
    // props.onSubmit = renderLists

    const [showForm, setShowForm] = React.useState(false);

    return (
        <React.Fragment>
            {showForm ? (
                <AddListForm
                    renderLists={props.renderLists}
                    showForm={setShowForm}
                />
            ) : (
                <AddButton handleClick={setShowForm} name={'List'} />
            )}
        </React.Fragment>
    );
}

function AddListItems(props) {
    // props {onSubmit, id}
    const [showForm, setShowForm] = React.useState(false);

    return (
        <React.Fragment>
            {showForm ? (
                <ReactBootstrap.Row fluid>
                    <AddListItemForm
                        onSubmit={props.onSubmit}
                        id={props.id}
                        showForm={setShowForm}
                    />
                </ReactBootstrap.Row>
            ) : (
                <AddButton handleClick={setShowForm} name={'Items'} />
            )}
        </React.Fragment>
    );
}
