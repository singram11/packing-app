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
            <ReactRouterDOM.NavLink activeClassName="selected" to={url}>
                {gearName}
            </ReactRouterDOM.NavLink>
        </div>
    );
}

function GearItemDetails(props) {
    const gearDetail = props.gearDetail;
    const { description, img, name, weight } = gearDetail;
    const [showWeight, setShowWeight] = React.useState(false);

    React.useEffect(() => {
        if (weight != null) {
            setShowWeight(true);
        }
    }, [weight]);

    // const noShowWeight = weight != null;
    console.log(`weight: ${weight}`);
    console.log(`showWeight: ${showWeight}`);

    return (
        <ReactBootstrap.Card
            md="auto"
            className="mt-2 gear-card"
            style={{ width: '25rem' }}
        >
            <ReactBootstrap.Card.Img
                variant="top"
                src={img}
                style={{ width: 'auto' }}
            />
            <ReactBootstrap.Card.Body>
                <ReactBootstrap.Card.Title>{name}</ReactBootstrap.Card.Title>
                <ReactBootstrap.Card.Text>
                    {description}
                </ReactBootstrap.Card.Text>
            </ReactBootstrap.Card.Body>
            <ReactBootstrap.ListGroup className="list-group-flush">
                {{ showWeight } ? (
                    <ReactBootstrap.ListGroupItem>
                        Weight: {weight} oz
                    </ReactBootstrap.ListGroupItem>
                ) : (
                    ''
                )}
            </ReactBootstrap.ListGroup>
        </ReactBootstrap.Card>
    );
}

// function GearItemDetailCard(props) {
//     const { gearName, weight, description, url } = props;

//     return (
//         <div className="gear-item">
//             <p>{gearName}</p>
//             <p>{weight}</p>
//             <p>{description}</p>
//             <p>{url}</p>
//         </div>
//     );
// }

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
        <ReactBootstrap.Button
            variant={props.buttonVariant}
            size="sm"
            onClick={handleClick}
        >
            Add {props.name}
        </ReactBootstrap.Button>
    );
}

function CloseFormButton(props) {
    // props: showForm buttonVariant
    function handleClick() {
        props.showForm(false);
    }
    return (
        <ReactBootstrap.Button
            className={props.buttonClass}
            // className="mr-4"
            variant={props.buttonVariant}
            size={props.buttonSize}
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

    React.useEffect(() => {
        setShowNewGearForm(false);
    }, [showForm]);

    return (
        <React.Fragment>
            {showForm ? (
                <React.Fragment>
                    {showNewGearForm ? (
                        <React.Fragment>
                            <AddGearForm
                                listItemId={props.listItemId}
                                renderListItems={props.onSubmit}
                            />
                            <CloseFormButton
                                showForm={setShowForm}
                                buttonVariant={'outline-primary'}
                                buttonSize={''}
                                buttonClass={'gear-form-close'}
                            />
                        </React.Fragment>
                    ) : (
                        <div>
                            <AddGearDropDown
                                listItemId={props.listItemId}
                                renderListItems={props.onSubmit}
                            />
                            <NewGearButton onClick={setShowNewGearForm} />
                            <CloseFormButton
                                showForm={setShowForm}
                                buttonVariant={'link'}
                                buttonSize={'sm'}
                                buttonClass={'gear-close'}
                            />
                        </div>
                    )}
                </React.Fragment>
            ) : (
                <AddButton
                    buttonVariant={'link'}
                    handleClick={setShowForm}
                    name={'Gear'}
                />
            )}
        </React.Fragment>
    );
}

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
    const [weight, setWeight] = React.useState(null);
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
        </React.Fragment>
    );
}
