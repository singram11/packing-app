function ListsPage() {
  const loggedIn = localStorage.getItem("loggedIn");

  const [loggedInUpdate, setLogin] = React.useState(loggedIn);

  const [lists, setLists] = React.useState({});

  function renderLists() {
    fetch("/api/lists")
      .then((response) => response.json())
      .then((result) => {
        setLists(result);
      });
  }

  React.useEffect(() => {
    renderLists();
  }, []);

  // let {path, url } = useRouteMatch();

  return (
    <ReactRouterDOM.BrowserRouter>
      <Lists refreshLists={renderLists} lists={lists} />
      <AddListForm onSubmit={renderLists} />
      <ReactRouterDOM.Switch>
        <ReactRouterDOM.Route path="/lists/items/:id">
          <ListDetailsPage />
        </ReactRouterDOM.Route>
      </ReactRouterDOM.Switch>
    </ReactRouterDOM.BrowserRouter>
  );
}

// function ListsPage() {
//     const [lists, setLists] = React.useState({});

//     function renderLists() {
//         fetch('/api/lists')
//         .then((response) => response.json())
//         .then((result) => {
//             setLists(result);
//         });
//     }

//     React.useEffect(()=> {renderLists()
//     }, []);

//     return (<React.Fragment>
//                 <Lists refreshLists={renderLists} lists={lists}/>
//                 <AddListForm onSubmit={renderLists}/>
//             </React.Fragment>)
// }

function ListDetailsPage() {
  const { id } = ReactRouterDOM.useParams();

  const [listItems, setListItems] = React.useState({});

  const url = `/api/lists/${id}`;

  function renderListItems() {
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setListItems(result);
      });
  }

  React.useEffect(() => {
    renderListItems();
  }, [id]);

  return (
    <React.Fragment>
      <ShowListItems renderListItems={renderListItems} listItems={listItems} />
      <AddListItemForm onSubmit={renderListItems} id={id}></AddListItemForm>
    </React.Fragment>
  );
}

// ReactDOM.render(<ListsAndMore/> , document.getElementById('root'));
