// const { func } = require("prop-types");

function GearList(props) {
    const gearData = props.gear;
    const gear = [];
   
    for (const item in gearData) {
       
        const gearCard = (
            <GearItem
                key={item}
                id={item}
                gearName={gearData[item].name}
            />
        );

        gear.push(gearCard);
    };
   
    return <div className="all-gear">{gear}</div>
}

function GearItem(props) {
    const {id, gearName} = props;

    const url = `/gear/${id}`
    return (
        <div className='gear-item'>
            <ReactRouterDOM.Link to={url}>{gearName}</ReactRouterDOM.Link> 
        </div>
    )
}

function GearItemDetails(props) {
    const gearDetail = props.gearDetail;
    const {description, img, name, weight} = gearDetail;
    
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
        <div className="list-item-container">{listItemsArr}</div>
        </React.Fragment>
}

function ItemCard(props){
    const {name, category, gear, id} = props;

console.log(`Item Card ${id}`)

    return (
        <div className="list-item">
            <div className="item-name">{name}</div>
            <div className="item-details">Category: {category}</div>
            {gear ? <div className="item-details">Gear: {gear}</div> : 
            <AddGear listItemId={id} onSubmit={props.renderListItems}/> }
            {/* // <AddGearForm listItemId={id} onSubmit={props.renderListItems}/> */}
            <DeleteListItemButton renderListItems={props.renderListItems} id={id}>-</DeleteListItemButton>
        </div>
    )
}

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
                <input type="text" value={itemName} onChange={handleListNameChange}/>
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

function AddGearForm(props) {

    const listItemId = props.listItemId
    
    const [gearName, setName] = React.useState('');
    const [img, setImage] = React.useState('');
    const [weight, setWeight] = React.useState('');
    const [description, setDescription] = React.useState('');
    
    function handleNameChange(event) {
        setName(event.target.value);
      }

    function handleWeightChange(event) {
        setWeight(event.target.value);
    }
    
    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handleImageChange(event) {
        setImage(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        
        const postBody = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'name':gearName,
                                'weight': weight,
                                'description': description,
                                'img': img,
                                'listItemId': listItemId})
        };

        fetch('/api/gear', postBody)
            .then((response) => response.json())
            .then(() => props.onSubmit && props.onSubmit())
    };

    return(<React.Fragment> 
                <form onSubmit={handleSubmit}>
                    <label>Gear Name</label>
                    <input type="text" value={gearName} onChange={handleNameChange}/>
                    <label>Weight</label>
                    <input value={weight} onChange={handleWeightChange}/>
                    <label>Description</label>
                    <textarea value={description} onChange={handleDescriptionChange}/>
                    <label>Image Link</label>
                    <input value={img} onChange={handleImageChange}/>
                    <input type="submit" value="Submit"/>
                </form>
                <CloseFormButton showForm={props.showForm}/>
            </React.Fragment>
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

function AddButton(props) {
    //props.handleClick = setShowForm 
    //props.name
    function handleClick() {
        props.handleClick(true)
    }

    return <button onClick={handleClick}>
        Add {props.name}
    </button>
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

function CloseFormButton(props){
    // props: showForm
    function handleClick(){
        props.showForm(false);
    }
    return <button onClick={handleClick}>x</button>
}

function AddGear(props){
    //listItemId={id} onSubmit={props.renderListItems}
    const [showForm, setShowForm] = React.useState(false)

  
    return (
        <React.Fragment>
            {showForm 
            ? <AddGearForm listItemId={props.listItemId} onSubmit={props.onSubmit} showForm={setShowForm}/> :
            <AddButton handleClick={setShowForm} name={'Gear'}/>}
        </React.Fragment>
    )
}