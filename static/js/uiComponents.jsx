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
                gearName={gearData[item].name}
                description={gearData[item].description}
                weight={gearData[item].weight}
                img={gearData[item].img}
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
    const {name, category} = props;

    return (
        <div className="list-name">
            <span>{name} </span>
            <span>Category: {category}</span>
        </div>
    )
}