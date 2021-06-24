function Hello() {
    return (<p>hello world</p>);
}


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

    console.log(url)

    return (
        // <div className="list-name">
        //     <a href={url}>{name}</a>
        //     <span>Category: {category}</span>
        // </div>
        <ReactRouterDOM.Link to={url}>{name}</ReactRouterDOM.Link>
    )
}

function ShowListItems(props) {
    const listItems = props.listItems;
    console.log(listItems)
    const listItemsArr = [];

        
    for (const item in listItems) {
        let listItemCard = '';
        if (listItems[item].gear) {
            listItemCard = (
                <ItemCardWithGear 
                    key={item}
                    name={listItems[item].name}
                    category={listItems[item].category}
                    gear={listItems[item].gear}
                />
            );
        } else {
            listItemCard = (
                <ItemCardNoGear 
                    key={item}
                    name={listItems[item].name}
                    category={listItems[item].category}
                   
                />
            );
        }
        
       

        listItemsArr.push(listItemCard);
    }

    return <React.Fragment>
        <div className="list-item-container">{listItemsArr}</div>
        </React.Fragment>
}

function ItemCardNoGear(props){
    const {name, category} = props;

    return (
        <div className="list-item">
            <div className="item-name">{name}</div>
            <div className="item-details">Category: {category}</div>
        </div>
    )
}

function ItemCardWithGear(props){
    const {name, category, gear} = props;

    return (
        <div className="list-item">
            <div className="item-name">{name}</div>
            <div className="item-details">Category: {category}</div>
            <div className="item-details">Gear: {gear}</div>

        </div>
    )
}

function AddListItemForm(props) {
    const [itemName, setName] = React.useState('');
    const [category, setCategory] = React.useState('');
    

    function handleListNameChange(event) {
        setName(event.target.value);
      }
    
    function handleCategoryChange(event) {
        setCategory(event.target.value);
    }
    // need to move this function to the parent where I can use the 
    // set result function to update the function thats loading the page
    function handleSubmit(event) {
        event.preventDefault();
     
        const postBody = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'name':itemName,
                                'category':category})
        };

        fetch('/new-list-item', postBody)
            .then(() => props.onSubmit && props.onSubmit())
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
