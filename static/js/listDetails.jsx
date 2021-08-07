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
            <ReactRouterDOM.NavLink activeClassName='selected' to={url}>{name}</ReactRouterDOM.NavLink>
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

    return <ReactBootstrap.Button className="trash-can" onClick={(event) => deleteList(id, event)}>
            <img src="/static/images/icons/trash-fill.svg"/>
            </ReactBootstrap.Button>
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

    console.log(listItems)

    for (const listItem in listItems) {
        let listItemCard = '';

        listItemCard = (
            <ItemCard 
                key={listItem}
                name={listItems[listItem].item.name}
                category={listItems[listItem].item.category}
                gear = {listItems[listItem].gear ? listItems[listItem].gear.name : null}
                gear_img = {listItems[listItem].gear? listItems[listItem].gear.img: null}
                id={listItem}
                renderListItems={props.renderListItems}
            />
        );

        
        listItemsArr.push(listItemCard);
    }

    return <React.Fragment>
        <div className='category-name font-weight-bold'>{props.name}</div>
        <div className="list-item-container">{listItemsArr}</div>
        </React.Fragment>
}

function ItemCard(props){
    const {name, category, gear, gear_img, id} = props;

    return (
        // <div className="list-item">
        <ReactBootstrap.Card className='mb-2'>
            <ReactBootstrap.Card.Body className='p-1'>
            <ReactBootstrap.Row className="justify-content-between">
                <ReactBootstrap.Col >
                    <div className="item-name font-weight-bold">{name}</div>
                </ReactBootstrap.Col>
                <ReactBootstrap.Col sm='auto'>
                    <DeleteListItemButton 
                    renderListItems={props.renderListItems} 
                    id={id}>-</DeleteListItemButton>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
            
            {gear ? 
            <ReactBootstrap.Row className="justify-content-between">
                <ReactBootstrap.Col sm='auto'> 
                    <img className="gear-image-sm" src={gear_img} style={{width: '50px'}}/>
                </ReactBootstrap.Col>
                <ReactBootstrap.Col>
                    <div className="item-details">{gear}</div>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row> 
            : <ReactBootstrap.Row>
                <ReactBootstrap.Col>
                <AddGear listItemId={id} onSubmit={props.renderListItems}/> 
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>}
            </ReactBootstrap.Card.Body>
        </ReactBootstrap.Card>
        // </div>
    )
}




