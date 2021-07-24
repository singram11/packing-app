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
    
    return <div className="list-container">{listsArr}</div>
    
}

function ListCard(props) {
    const {name, id, category} = props;
    const url = `/lists/${id}`


    return (
        <div>
            <ReactRouterDOM.NavLink to={url}>{name}</ReactRouterDOM.NavLink>
            <DeleteListButton refreshLists={props.refreshLists} id={id}></DeleteListButton>
        </div>
    )
}

function DeleteListButton(props) {
  
    const id = props.id;

    function deleteList(id, event) {
        event.preventDefault();

        // const postBody = {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({id:id})
        // };
        const url = `/api/lists/${id}`

        fetch(url, {method: 'DELETE'})
            .then((response) => response.json())
            .then( () => props.refreshLists())

    };

    return <button onClick={(event) => deleteList(id, event)}>-</button>
}

function ShowItemCategories(props) {
    // renderListItems, listDetails, gear, renderGear
    const listDetails = props.listDetails;
    const listCategories = [];


    for (const category in listDetails) {
        let categoryCard = '';

        categoryCard = (
            <ShowListItems
                key={category}
                name={category}
                listItems = {listDetails[category]}
                renderListItems = {props.renderListItems}
            />
        )
       
        listCategories.push(categoryCard);
    }
    return <React.Fragment>
        <div className='category-container'>{listCategories}</div>
    </React.Fragment>
   

}

function ShowListItems(props) {
    // props renderListItems, ListItems
    const listItems = props.listItems;
    const listItemsArr = [];

    for (const listItem in listItems) {
        let listItemCard = '';
        console.log(`ShowListItems: ${listItem}`)

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
        <div className='category-name'>{props.name}</div>
        <div className="list-item-container">{listItemsArr}</div>
        </React.Fragment>
}

function ItemCard(props){
    const {name, category, gear, id} = props;

    console.log(`Item Card ${id}`)

    return (
        <div className="list-item">
            <div className="item-name">{name}</div>
            {/* <div className="item-details">Category: {category}</div> */}
            {gear ? <div className="item-details">Gear: {gear}</div> : 
            <AddGear listItemId={id} onSubmit={props.renderListItems}/> }
            {/* // <AddGearForm listItemId={id} onSubmit={props.renderListItems}/> */}
            <DeleteListItemButton renderListItems={props.renderListItems} id={id}>-</DeleteListItemButton>
        </div>
    )
}




