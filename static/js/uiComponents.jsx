function Hello() {
    return (<p>hello world</p>);
}

function GearList(props) {
    const gearData = props.gear;
    console.log(gearData)
    const gear = [];
    console.log(Object.values(gearData))

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
            <li>{gearName}</li>
            <li>{weight}</li>
            <li>{description}</li>
            <li>{url}</li>
        </div>
    )
}