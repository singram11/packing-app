function ListsAndMore() {
    return <ReactRouterDOM.BrowserRouter>
            
            <ReactRouterDOM.Switch>
                <ReactRouterDOM.Route exact path='/lists'>
                    <ListsPage />
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route path='/userlists/items/:id' children={<ListDetailsPage/>}>
                    <ListDetailsPage />
                </ReactRouterDOM.Route>
            </ReactRouterDOM.Switch>
    </ReactRouterDOM.BrowserRouter>
}



function ListsPage() {
    
    const [lists, setLists] = React.useState({});

    React.useEffect(()=> {
        fetch('/api/userlists')
        .then((response) => response.json())
        .then((result) => {
            setLists(result);
        });
    }, []);
    
    return (<Lists lists={lists}/>)
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
                <ShowListItems listItems={listItems}/>
                <AddListItemForm onSubmit={renderListItems}></AddListItemForm>
            </React.Fragment>)

}

ReactDOM.render(<ListsAndMore/> , document.getElementById('root'));