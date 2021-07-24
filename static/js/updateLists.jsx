function DeleteListItemButton(props) {
  
    const id = props.id;

    function deleteListItem(id, event) {
        event.preventDefault();

        // const postBody = {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({id:id})
        // };
        const url = `/api/list-item/${id}`
        fetch(url, {method:'DELETE'})
            .then((response) => response.json())
            .then( () => props.renderListItems())

    };

    return <button onClick={(event) => deleteListItem(id, event)}>-</button>
}

function AddListItemForm(props) {
   // props = onSubmit, id, showForm
    const [itemName, setName] = React.useState('');
    const [category, setCategory] = React.useState('');
  
    const id  = props.id;

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
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'name':itemName,
                                'category':category,
                                'id': id})
        };

        fetch('/api/list-item', postBody)
            .then(() => props.onSubmit && props.onSubmit())

        setName('');
        setCategory('');
    };

    return(<React.Fragment>
            <form onSubmit={handleSubmit}>
                <label>Item Name</label>
                <input type="text" required='required' value={itemName} onChange={handleListNameChange}/>
                <label>Category</label>
                <input value={category} onChange={handleCategoryChange}/>
                <input type="submit" value="Submit"/>
            </form>
            <CloseFormButton showForm={props.showForm}/>
            </React.Fragment> 
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
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'name':listName,
                                'category':category})
        };

        fetch('/api/lists', postBody)
            .then(() => props.renderLists && props.renderLists())
        
        props.showForm(false);
        setName('');
        setCategory('')
    };

    return( 
            <form onSubmit={handleSubmit}>
                <label>List Name</label>
                <input type="text" required='required' value={listName} onChange={handleListNameChange}/>
                <label>Category</label>
                <input value={category} onChange={handleCategoryChange}/>
                <input type="submit" value="Submit"/>
            </form>
        );
}
function AddList(props){
    // props.onSubmit = renderLists

    const [showForm, setShowForm] = React.useState(false)

    return (<React.Fragment>
                {showForm ? <AddListForm renderLists={props.renderLists} showForm={setShowForm}/>
                 : <AddButton handleClick={setShowForm} name={'List'}/> }
            </React.Fragment>  )
}

function AddListItems(props){
    // props {onSubmit, id}
    const [showForm, setShowForm] = React.useState(false)

    return ( <React.Fragment>
                {showForm 
                ? <AddListItemForm onSubmit={props.onSubmit} id={props.id} showForm={setShowForm}/> 
                : <AddButton handleClick={setShowForm} name={'Items'}/> }
            </React.Fragment>
    )
}