function Hello() {
    return (<p>hello world</p>);
}

function GearList(props) {
    const gearData = props;
    console.log(props)
    const gear = [];
    console.log(Object.values(gearData))

    for (const item of Object.values(gearData)) {
        console.log(item);
        const gearCard = (
            <GearItem
                gearName={item.name}
                description={item.description}
                weight={item.weight}
                img={item.img}
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
            <li>{gearName}</li>
            <li>{weight}</li>
            <li>{description}</li>
            <li>{url}</li>
        </div>
    )
}