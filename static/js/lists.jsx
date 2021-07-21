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

    return (
    <ReactRouterDOM.BrowserRouter>
      <div className="list-container">
        <div className="sidebar">
            <Lists refreshLists={renderLists} lists={lists} />
        </div>
        <ReactRouterDOM.Route exact path="/lists">
            <AddList renderLists={renderLists}/>
        </ReactRouterDOM.Route>    
        <ReactRouterDOM.Switch>
            <ReactRouterDOM.Route path="/lists/:id">
                <div className="main-panel">
                    <ListDetailsPage />
                </div>
            </ReactRouterDOM.Route>
        </ReactRouterDOM.Switch>
      </div>
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
      <ShowItemCategories renderListItems={renderListItems} listDetails={listDetails}/>
      {/* <ShowListItems renderListItems={renderListItems} listDetails={listDetails} /> */}
      {/* <AddListItemForm onSubmit={renderListItems} id={id}></AddListItemForm> */}
      <AddListItems onSubmit={renderListItems} id={id}/>
    </React.Fragment>
  );
}

// ReactDOM.render(<ListsAndMore/> , document.getElementById('root'));
