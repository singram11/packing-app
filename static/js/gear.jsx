function GearPage() {
    return <ReactRouterDOM.BrowserRouter>
            
            <ReactRouterDOM.Switch>
                <ReactRouterDOM.Route exact path='/gear'>
                    <ShowGear />
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route path='/api/usergear/details/:id' children={<ShowGearDetails/>}>
                    <ShowGearDetails/>
                </ReactRouterDOM.Route>
            </ReactRouterDOM.Switch>
    </ReactRouterDOM.BrowserRouter>
}




function ShowGearDetails() {

    const { id } = ReactRouterDOM.useParams();
    
    const [gearDetail, setGearDetail] = React.useState({});

    const url = `/api/usergear/details/${id}`

    React.useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                setGearDetail(result);
            });
        }, []);
    
    console.log(`gearDetail: ${gearDetail}`)  
    return (<GearItemDetails gearDetail={gearDetail}/>);

}

function AddGearForm(props) {
    const [gearName, setName] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [weight, setWeight] = React.useState('');
    const [description, setDescription] = React.useState('');
    
    function handleNameChange(event) {
        setName(event.target.value);
      }
    
    function handleCategoryChange(event) {
        setCategory(event.target.value);
    }

    function handleWeightChange(event) {
        setWeight(event.target.value);
    }
    
    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
     
        const postBody = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'name':itemName,
                                'category':category,
                                'weight': weight,
                                'description': description})
        };

        fetch('new url here', postBody)
            .then(() => props.onSubmit && props.onSubmit())
    };

    return( 
            <form onSubmit={handleSubmit}>
                <label>Gear Name</label>
                <input type="text" value={gearName} onChange={handleNameChange}/>
                <label>Category</label>
                <input value={category} onChange={handleCategoryChange}/>
                <label>Weight</label>
                <input value={weight} onChange={handleWeightChange}/>
                <label>Description</label>
                <textarea value={description} onChange={handleDescriptionChange}/>
                <input type="submit" value="Submit"/>
            </form>
        );
}


function ShowGear() {

    const [gear, setGear] = React.useState({});

    function renderGear() {
        fetch('/api/usergear')
            .then((response) => response.json())
            .then((result) => {
                setGear(result);
            });
    }

    React.useEffect(() => {renderGear()
        }, []);
    
        
    return (<React.Fragment>
                <GearList gear={gear}/>
                <AddGearForm onSubmit={renderGear}/>
            </React.Fragment>);
}

ReactDOM.render(<GearPage/>, document.getElementById('root'));