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






// function Navbar() {
//     // const { logo, brand, children, className } = props;
  
//     const navLinks = children.map((el, i) => {
//       return (
//         <div key={i} className="nav-item">
//           {el}
//         </div>
//       );
//     });

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
            ? <React.Fragment>
                <AddGearDropDown 
                    listItemId={props.listItemId}
                    renderListItems={props.onSubmit}/>
                <AddGearForm 
                    listItemId={props.listItemId} 
                    renderListItems={props.onSubmit} 
                    showForm={setShowForm}/> 
            </React.Fragment>
            : <AddButton handleClick={setShowForm} name={'Gear'}/>}
        </React.Fragment>
    )
}

function AddGearDropDown(props){
    // kjhkj

    // const gear = [ { name : 'cats meow'},
    //                 {name: 'half dome 2'},
    //                 {name: 'carbon z 2'}]

    const [gear, setGear] = React.useState({});

    function renderGear() {
        fetch('/api/gear')
            .then((response) => response.json())
            .then((result) => {
                setGear(result);
            });
    }

    React.useEffect(() => {renderGear()
        }, []);

    const gearArr=[]
        
    for (const item in gear) {
        const option = {key: item,
                        name: gear[item].name}
        gearArr.push(option)
    };
    

    const [gearDropDown, setGearDropDown]= React.useState('Select'); 

    function handleGearChange(event){
        setGearDropDown(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const postBody ={
            method: ['POST'],
            headers: {'Content-Type': 'application/json'},    
            body: JSON.stringify({'gear': gearDropDown,
                 'listItemId':props.listItemId})
        };

        fetch('/api/list-item/add-gear', postBody)
            .then((response) => response.json())
            .then(()=> props.renderListItems());
    }

    return <form>
        Gear:
        <br/>
        <select onChange={handleGearChange}>
            <option value='Select Your Gear'>--Select Your Gear--</option>
            {gearArr.map((gearArr)=> <option key={gearArr.key} value={gearArr.key}>{gearArr.name}</option>)}
        </select>
        <button type="submit" onClick={handleSubmit}>Select</button>
    </form>
}

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
            .then(() => props.renderListItems && props.renderListItems())
    };

    return(<React.Fragment> 
                <form onSubmit={handleSubmit}>
                    <label>Gear Name</label>
                    <input type="text" required='required' value={gearName} onChange={handleNameChange}/>
                    <label>Weight</label>
                    <input type='number' value={weight} onChange={handleWeightChange}/>
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

function AddImageForm(){
    
    const [ selectedImage, setSelectedImage] = React.useState('')

    const [preview, setPreview] = React.useState()

    function previewFile(file){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend= () => {
            setPreview(reader.result);
        }

    }
    
    function handleImageChange(event) {
        setSelectedImage(event.target.value);
        // preivewFile(selectedImage);
    
    } 

    function handleSubmitFile(event){
        event.preventDefault();
        console.log(selectedImage)

    }

    

    return <form onSubmit={handleSubmitFile}>
        <input type='file' onChange={handleImageChange}/>
        <button type='submit'>Select</button>
        {/* {preview && ( <img src={preview} style={{height = '300px'}}/>)} */}
    </form>
}