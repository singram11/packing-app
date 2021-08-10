function ShowGearDetails() {
    const { id } = ReactRouterDOM.useParams();
    console.log(id);
    const [gearDetail, setGearDetail] = React.useState({});

    const url = `/api/gear/${id}`;

    React.useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                setGearDetail(result);
            });
    }, [id]);

    return <GearItemDetails gearDetail={gearDetail} />;
}

function ShowGear(props) {
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

    return (
        <div className="mt-4 gear-sidebar">
            <p>My Gear:</p>
            <GearList gear={gear} />
        </div>
    );
}
