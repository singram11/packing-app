function ListsPage(props) {
  const loggedIn = localStorage.getItem("loggedIn");

  const [loggedInUpdate, setLogin] = React.useState(loggedIn);

  const [lists, setLists] = React.useState({});

  // const { id } = ReactRouterDOM.useParams();

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
    // <ReactRouterDOM.BrowserRouter>

      <div className="list-container">
        <div className="sidebar">
            <Lists refreshLists={renderLists} lists={lists} />
            <AddList renderLists={renderLists}/>
        </div>  
        <ReactRouterDOM.Switch>
            {/* <ReactRouterDOM.Route exact path="lists">
              <p>please select a topic</p>
            </ReactRouterDOM.Route> */}
            {/* <ReactRouterDOM.Route path="/lists/:id">
                <div className="main-panel">
                    <ListDetailsPage />
                </div>
            </ReactRouterDOM.Route> */}
        </ReactRouterDOM.Switch>
      </div>
    
    // </ReactRouterDOM.BrowserRouter>
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
      <ShowItemCategories 
        renderListItems={renderListItems} 
        listDetails={listDetails}/>
      {/* <ShowListItems renderListItems={renderListItems} listDetails={listDetails} /> */}
      {/* <AddListItemForm onSubmit={renderListItems} id={id}></AddListItemForm> */}
      <AddListItems onSubmit={renderListItems} id={id}/>
    </React.Fragment>
  );
}

