function ShowGearDetails() {
    const { id } = ReactRouterDOM.useParams();
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

    const history = ReactRouterDOM.useHistory();

    function renderGear() {
        return fetch('/api/gear')
            .then((response) => response.json())
            .then((result) => {
                setGear(result);
                return result;
            });
    }

    function renderGearOnMount() {
        renderGear().then((result) => {
            if (
                Object.keys(result).length > 0 &&
                history.location.pathname === '/gear'
            ) {
                const key = Object.keys(result)[0];
                history.push(`/gear/${key}`);
            }
        });
    }

    React.useEffect(() => {
        renderGearOnMount();
    }, []);

    return (
        <div className='mt-4 gear-sidebar'>
            <p>My Gear:</p>
            <GearList gear={gear} />
        </div>
    );
}
