function ListsAndMore() {
    const loggedIn = localStorage.getItem('loggedIn')

    const [loggedInUpdate, setLogin] = React.useState(loggedIn);

    return <ReactRouterDOM.BrowserRouter>
                <ReactRouterDOM.Switch>
                    <ReactRouterDOM.Route exact path='/lists'>
                        {loggedIn ? <ListsPage /> : <LoginForm onSubmit={setLogin}/> }
                    </ReactRouterDOM.Route>
                    <ReactRouterDOM.Route path='/userlists/items/:id' children={<ListDetailsPage/>}>
                        <ListDetailsPage />
                    </ReactRouterDOM.Route>
                </ReactRouterDOM.Switch>
    </ReactRouterDOM.BrowserRouter>
}
 
function ListsPage() {    
    const [lists, setLists] = React.useState({});

    function renderLists() {
        fetch('/api/userlists')
        .then((response) => response.json())
        .then((result) => {
            setLists(result);
        });
    }

    React.useEffect(()=> {renderLists()
    }, []);
    
    return (<React.Fragment>
                <Lists refreshLists={renderLists} lists={lists}/>
                <AddListForm onSubmit={renderLists}/>
            </React.Fragment>)
}

function ListDetailsPage() {

    const { id } = ReactRouterDOM.useParams();
    
    const [listItems, setListItems] = React.useState({});

    const url = `/api/userlists/items/${id}`

    function renderListItems() {
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                setListItems(result);
            });
    }

    React.useEffect(()=> { renderListItems()
        }, []);
  
    return (<React.Fragment>
                <ShowListItems renderListItems={renderListItems} listItems={listItems}/>
                <AddListItemForm onSubmit={renderListItems} id={id}></AddListItemForm>
            </React.Fragment>)

}

ReactDOM.render(<ListsAndMore/> , document.getElementById('root'));