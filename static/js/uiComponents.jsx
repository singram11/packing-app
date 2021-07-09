
function GearList(props) {
    const gearData = props.gear;
    const gear = [];
   
    for (const item in gearData) {
        console.log(item);
        const gearCard = (
            <GearItem
                key={item}
                id={item}
                gearName={gearData[item].name}
            />
        );

        gear.push(gearCard);
    };
   
    return (
        <React.Fragment>
            <div className="all-gear">{gear}</div>
        </React.Fragment>
    )
}

function GearItem(props) {
    const {id, gearName} = props;

    const url = `/api/usergear/details/${id}`
    return (
        <ReactRouterDOM.Link to={url}>{gearName}</ReactRouterDOM.Link> 
    )
}

function GearItemDetails(props) {
    const gearDetail = props.gearDetail;
    const {description, img, name, weight} = gearDetail;
    console.log(name);
    
    return (
        <React.Fragment>
            <p>{name}</p>
            <p>Weight:{weight}</p>
            <p>Description:{description}</p>
            <p>{img}</p>
        </React.Fragment>
    )
}

function GearItemDetailCard(props) {
    const {gearName, weight, description, url} = props;

    return (
        <div className="gear-item">
            <p>{gearName}</p>
            <p>{weight}</p>
            <p>{description}</p>
            <p>{url}</p>
        </div>
    )
}

function Lists(props) {
    const lists = props.lists;
    const listsArr = [];


    for (const list in lists) {
        const listCard = ( 
            <ListCard
                key={list}
                id={list}
                name={lists[list].name}
                category={lists[list].category}
                refreshLists={props.refreshLists}
            />
        );

        listsArr.push(listCard);
    }
    
    return <React.Fragment>
        <div className="list-container">{listsArr}</div>
    </React.Fragment>
}

function ListCard(props) {
    const {name, id, category} = props;
    const url = `/userlists/items/${id}`


    return (
        <div>
            <ReactRouterDOM.Link to={url}>{name}</ReactRouterDOM.Link>
            <DeleteListButton refreshLists={props.refreshLists} id={id}></DeleteListButton>
        </div>
    )
}

function DeleteListButton(props) {
  
    const id = props.id;

    function deleteList(id, event) {
        event.preventDefault();

        const postBody = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id:id})
        };

        fetch('/remove-list', postBody)
            .then((response) => response.json())
            .then( () => props.refreshLists())

    };

    return <button onClick={(event) => deleteList(id, event)}>-</button>
}

function ShowListItems(props) {
    const listItems = props.listItems;
    const listItemsArr = [];

        
    for (const listItem in listItems) {
        let listItemCard = '';

        listItemCard = (
            <ItemCard 
                key={listItem}
                name={listItems[listItem].item.name}
                category={listItems[listItem].item.category}
                gear = {listItems[listItem].gear ? listItems[listItem].gear.name : null}
                id={listItem}
                renderListItems={props.renderListItems}
            />
        );

        
        listItemsArr.push(listItemCard);
    }

    return <React.Fragment>
        <div className="list-item-container">{listItemsArr}</div>
        </React.Fragment>
}

function ItemCard(props){
    const {name, category, gear, id} = props;

    return (
        <div className="list-item">
            <div className="item-name">{name}</div>
            <div className="item-details">Category: {category}</div>
            {gear ? <div className="item-details">Gear: {gear}</div> : "[add gear]"}
            <DeleteListItemButton renderListItems={props.renderListItems} id={id}>-</DeleteListItemButton>
        </div>
    )
}

function DeleteListItemButton(props) {
  
    const id = props.id;

    function deleteListItem(id, event) {
        event.preventDefault();

        const postBody = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id:id})
        };

        fetch('/remove-list-item', postBody)
            .then((response) => response.json())
            .then( () => props.renderListItems())

    };

    return <button onClick={(event) => deleteListItem(id, event)}>-</button>
}

function AddListItemForm(props) {
   
    const [itemName, setName] = React.useState('');
    const [category, setCategory] = React.useState('');
  
    const { id } = props;

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

        fetch('/new-list-item', postBody)
            .then(() => props.onSubmit && props.onSubmit())

        setName('');
        setCategory('');
    };

    return( 
            <form onSubmit={handleSubmit}>
                <label>Item Name</label>
                <input type="text" value={itemName} onChange={handleListNameChange}/>
                <label>Category</label>
                <input value={category} onChange={handleCategoryChange}/>
                <input type="submit" value="Submit"/>
            </form>
        );
}

function AddListForm(props) {
    const [listName, setName] = React.useState('');
    const [category, setCategory] = React.useState('');
    

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

        fetch('/new-list', postBody)
            .then(() => props.onSubmit && props.onSubmit())

        setName('');
        setCategory('')
    };

    return( 
            <form onSubmit={handleSubmit}>
                <label>List Name</label>
                <input type="text" value={listName} onChange={handleListNameChange}/>
                <label>Category</label>
                <input value={category} onChange={handleCategoryChange}/>
                <input type="submit" value="Submit"/>
            </form>
        );
}



// function Navbar() {
//     // const { logo, brand, children, className } = props;
  
//     const navLinks = children.map((el, i) => {
//       return (
//         <div key={i} className="nav-item">
//           {el}
//         </div>
//       );
//     });