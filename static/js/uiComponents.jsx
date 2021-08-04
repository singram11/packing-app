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

    return <ReactBootstrap.Button onClick={handleClick}>
        Add {props.name}
    </ReactBootstrap.Button>
}


function CloseFormButton(props){
    // props: showForm
    function handleClick(){
        props.showForm(false);
    }
    return <ReactBootstrap.Button variant="outline-primary" onClick={handleClick}>Cancel</ReactBootstrap.Button>
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
        <ReactBootstrap.Form.Select onChange={handleGearChange}>
            <option value='Select Your Gear'>--Select Your Gear--</option>
            {gearArr.map((gearArr)=> <option key={gearArr.key} value={gearArr.key}>{gearArr.name}</option>)}
        </ReactBootstrap.Form.Select>
        <ReactBootstrap.Button type="submit" onClick={handleSubmit}>Select</ReactBootstrap.Button> 
    </form>
}

function AddGearForm(props) {

    const listItemId = props.listItemId
    
    const [gearName, setName] = React.useState('');
    const [img, setImage] = React.useState(undefined);
    const [weight, setWeight] = React.useState(undefined);
    const [description, setDescription] = React.useState(undefined);
    const [preview, setPreview] = React.useState()
    
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
        const file = event.target.files[0];
        setImage(file);
        previewFile(file);
    }

    function previewFile(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreview(reader.result)
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (img) {const reader = new FileReader()
            reader.readAsDataURL(img);
            reader.onloadend = () => {
                uploadGearData(reader.result)
            }; 
        } else {
            uploadGearData(null);
        }
       
    }

    function uploadGearData(imgString){
        
        const postBody = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'name':gearName,
                                'weight': weight,
                                'description': description,
                                'img': imgString,
                                'listItemId': listItemId})
        };

        fetch('/api/gear', postBody)
            .then((response) => response.json())
            .then(() => props.renderListItems && props.renderListItems())
    };

    return(<React.Fragment> 
                {/* <form onSubmit={handleSubmit}>
                    <label>Gear Name</label>
                    <input type="text" required='required' value={gearName} onChange={handleNameChange}/>
                    <label>Weight</label>
                    <input type='number' value={weight} onChange={handleWeightChange}/>
                    <label>Description</label>
                    <textarea value={description} onChange={handleDescriptionChange}/>
                    <label>Upload Image</label>
                    {/* <input value={img} onChange={handleImageChange}/> */}
                    {/* <input type='file' onChange={handleImageChange}/>
                    <input type="submit" value="Submit"/>
                </form> */} 
                <ReactBootstrap.Form onSubmit={handleSubmit}>
                    <ReactBootstrap.Form.Group>
                        <ReactBootstrap.Form.Label>Gear Name</ReactBootstrap.Form.Label>
                        <ReactBootstrap.Form.Control 
                            type="text" 
                            required='required' 
                            value={gearName} 
                            onChange={handleNameChange}/>
                    </ReactBootstrap.Form.Group>
                    <ReactBootstrap.Form.Group>
                        <ReactBootstrap.Form.Label>Weight</ReactBootstrap.Form.Label>
                        <ReactBootstrap.Form.Control 
                            type='number' 
                            value={weight} 
                            onChange={handleWeightChange} />
                    </ReactBootstrap.Form.Group>
                    <ReactBootstrap.Form.Group>
                        <ReactBootstrap.Form.Label>Description</ReactBootstrap.Form.Label>
                        <ReactBootstrap.Form.Label 
                            as="textarea" 
                            rows={3}
                            value={description} 
                            onChange={handleDescriptionChange} />
                      </ReactBootstrap.Form.Group>
                      <ReactBootstrap.Form.Group>
                        <ReactBootstrap.Form.Label>Upload Image</ReactBootstrap.Form.Label>
                        <ReactBootstrap.Form.Control 
                            type='file' 
                            onChange={handleImageChange}/>
                    </ReactBootstrap.Form.Group>
                    <ReactBootstrap.Button type="submit">Submit</ReactBootstrap.Button>
                </ReactBootstrap.Form>
                {preview && ( <img src={preview} style={{height: '150px'}}/>)}
                <CloseFormButton showForm={props.showForm}/>
            </React.Fragment>
        );
}

// function AddImageForm(){
    
//     const [ selectedImage, setSelectedImage] = React.useState('')

//     const [preview, setPreview] = React.useState()

//     const [fileToSend, setFiletoSend] = React.useState()

//     // function previewFile(file){
//     //     const reader = new FileReader();
//     //     reader.readAsDataURL(file);
//     //     reader.onloadend= () => {
//     //         setPreview(reader.result);
//     //     }

//     // }
    
//     function handleImageChange(event) {
//         setSelectedImage(event.target.files[0]);
//         previewFile(event.target.files[0])
//         // preivewFile(selectedImage);
    
//     } 

//     function previewFile(file) {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onloadend = () => {
//             setPreview(reader.result)
//         }
//     }

//     // function getBase64Image(file){
//     //     const reader = new FileReader()
//     //     reader.readAsDataURL(file);
//     //     reader.onloadend = () => {
//     //         console.log(reader.result)
//     //     }
//     // }

//     function handleSubmitFile(event){
//         event.preventDefault();
//         console.log(selectedImage)

//         // const reader = new FileReader();
//         // reader.readAsDataURL(selectedImage);
//         const reader = new FileReader()
//         reader.readAsDataURL(selectedImage);
//         reader.onloadend = () => {
//             uploadImage(reader.result)
//         }

//         console.log(selectedImage);
//     }
    
//     function uploadImage(imgString) {
//         const postBody = {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({'file': imgString})
//         };
        
//         fetch('/api/upload-image',postBody)
//             .then((response) => response.json())
//             .then(() => console.log(response))

//     }

    
//     return <form onSubmit={handleSubmitFile}>
//         <input type='file' onChange={handleImageChange}/>
//         <button type='submit'>Select</button>
//         {preview && ( <img src={preview} style={{height: '150px'}}/>)}
//     </form>
// }