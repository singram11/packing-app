function GearList(props) {
    const gearData = props.gear;
    const gear = [];

    for (const item in gearData) {
        const gearCard = (
            <GearItem key={item} id={item} gearName={gearData[item].name} />
        );

        gear.push(gearCard);
    }

    return <div className="all-gear">{gear}</div>;
}

function GearItem(props) {
    const { id, gearName } = props;

    const url = `/gear/${id}`;
    return (
        <div className="gear-item">
            <ReactRouterDOM.Link to={url}>{gearName}</ReactRouterDOM.Link>
        </div>
    );
}

function GearItemDetails(props) {
    const gearDetail = props.gearDetail;
    const { description, img, name, weight } = gearDetail;

    return (
        <React.Fragment>
            <p>{name}</p>
            <p>Weight:{weight}</p>
            <p>Description:{description}</p>
            <p>{img}</p>
        </React.Fragment>
    );
}

function GearItemDetailCard(props) {
    const { gearName, weight, description, url } = props;

    return (
        <div className="gear-item">
            <p>{gearName}</p>
            <p>{weight}</p>
            <p>{description}</p>
            <p>{url}</p>
        </div>
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

function AddButton(props) {
    //props.handleClick = setShowForm
    //props.name
    function handleClick() {
        props.handleClick(true);
    }

    return (
        <ReactBootstrap.Button variant="link" size="sm" onClick={handleClick}>
            Add {props.name}
        </ReactBootstrap.Button>
    );
}

function CloseFormButton(props) {
    // props: showForm
    function handleClick() {
        props.showForm(false);
    }
    return (
        <ReactBootstrap.Button
            className="mr-4 mb-4"
            variant="outline-primary"
            onClick={handleClick}
        >
            Cancel
        </ReactBootstrap.Button>
    );
}

function AddGear(props) {
    //listItemId={id} onSubmit={props.renderListItems}
    const [showForm, setShowForm] = React.useState(false);

    const [showNewGearForm, setShowNewGearForm] = React.useState(false);

    return (
        <React.Fragment>
            {showForm ? (
                <React.Fragment>
                    <AddGearDropDown
                        listItemId={props.listItemId}
                        renderListItems={props.onSubmit}
                    />
                    {showNewGearForm ? (
                        <AddGearForm
                            listItemId={props.listItemId}
                            renderListItems={props.onSubmit}
                            showForm={setShowForm}
                        />
                    ) : (
                        <NewGearButton onClick={setShowNewGearForm} />
                    )}
                </React.Fragment>
            ) : (
                <AddButton handleClick={setShowForm} name={'Gear'} />
            )}
        </React.Fragment>
    );
}

function ToggleAddGearOptions(props) {}

function NewGearButton(props) {
    function onClick() {
        props.onClick(true);
    }

    return (
        <ReactBootstrap.Button variant="link" size="sm" onClick={onClick}>
            Add New Gear
        </ReactBootstrap.Button>
    );
}

function AddGearDropDown(props) {
    const [gear, setGear] = React.useState({});

    function renderGear() {
        fetch('/api/gear')
            .then((response) => response.json())
            .then((result) => {
                setGear(result);
            });
    }

    React.useEffect(() => {
        renderGear();
    }, []);

    const gearArr = [];

    for (const item in gear) {
        const option = { key: item, name: gear[item].name };
        gearArr.push(option);
    }

    const [gearDropDown, setGearDropDown] = React.useState('Select');

    function handleGearChange(event) {
        setGearDropDown(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const postBody = {
            method: ['POST'],
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                gear: gearDropDown,
                listItemId: props.listItemId,
            }),
        };

        fetch('/api/list-item/add-gear', postBody)
            .then((response) => response.json())
            .then(() => props.renderListItems());
    }

    return (
        <ReactBootstrap.Row>
            <ReactBootstrap.Col md="auto">Select Gear:</ReactBootstrap.Col>
            <ReactBootstrap.Col md="auto">
                <ReactBootstrap.Form.Select
                    className="mb-2"
                    onChange={handleGearChange}
                >
                    <option value="Select Your Gear">
                        --Select Your Gear--
                    </option>
                    {gearArr.map((gearArr) => (
                        <option key={gearArr.key} value={gearArr.key}>
                            {gearArr.name}
                        </option>
                    ))}
                </ReactBootstrap.Form.Select>
            </ReactBootstrap.Col>
            <ReactBootstrap.Col>
                <ReactBootstrap.Button type="submit" onClick={handleSubmit}>
                    Select
                </ReactBootstrap.Button>
            </ReactBootstrap.Col>
        </ReactBootstrap.Row>
    );
}

function AddGearForm(props) {
    const listItemId = props.listItemId;

    const [gearName, setName] = React.useState('');
    const [img, setImage] = React.useState(undefined);
    const [weight, setWeight] = React.useState(undefined);
    const [description, setDescription] = React.useState(undefined);
    const [preview, setPreview] = React.useState();

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
            setPreview(reader.result);
        };
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (img) {
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onloadend = () => {
                uploadGearData(reader.result);
            };
        } else {
            uploadGearData(null);
        }
    }

    function uploadGearData(imgString) {
        const postBody = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: gearName,
                weight: weight,
                description: description,
                img: imgString,
                listItemId: listItemId,
            }),
        };

        fetch('/api/gear', postBody)
            .then((response) => response.json())
            .then(() => props.renderListItems && props.renderListItems());
    }

    return (
        <React.Fragment>
            <ReactBootstrap.Form onSubmit={handleSubmit}>
                <ReactBootstrap.Row className="mb-2">
                    <ReactBootstrap.Form.Group as={ReactBootstrap.Col}>
                        <ReactBootstrap.Form.Label>
                            Gear Name:
                        </ReactBootstrap.Form.Label>
                        <ReactBootstrap.Form.Control
                            type="text"
                            required="required"
                            value={gearName}
                            onChange={handleNameChange}
                        />
                    </ReactBootstrap.Form.Group>
                    <ReactBootstrap.Form.Group as={ReactBootstrap.Col}>
                        <ReactBootstrap.Form.Label>
                            Weight (oz):
                        </ReactBootstrap.Form.Label>
                        <ReactBootstrap.Form.Control
                            type="number"
                            value={weight}
                            onChange={handleWeightChange}
                        />
                    </ReactBootstrap.Form.Group>
                </ReactBootstrap.Row>
                <ReactBootstrap.Form.Group className="mb-2">
                    <ReactBootstrap.Form.Label>
                        Description:
                    </ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </ReactBootstrap.Form.Group>
                <ReactBootstrap.Form.Group className="mb-2">
                    <ReactBootstrap.Form.Label>
                        Upload Image:
                    </ReactBootstrap.Form.Label>
                    <ReactBootstrap.Form.Control
                        type="file"
                        onChange={handleImageChange}
                    />
                    {preview && (
                        <img
                            className="mt-2 image-preview"
                            src={preview}
                            style={{ height: '150px' }}
                        />
                    )}
                </ReactBootstrap.Form.Group>

                <ReactBootstrap.Button className="mt-2" type="submit">
                    Submit
                </ReactBootstrap.Button>
            </ReactBootstrap.Form>

            <CloseFormButton showForm={props.showForm} />
        </React.Fragment>
    );
}
