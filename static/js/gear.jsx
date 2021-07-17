function ShowGearDetails() {

    const { id } = ReactRouterDOM.useParams();
    console.log(id)
    const [gearDetail, setGearDetail] = React.useState({});

    const url = `/api/gear/${id}`;
    
    React.useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                setGearDetail(result);
        
            });
        }, [id]);
    
    console.log(`gearDetail: ${gearDetail}`)  
    return (<GearItemDetails gearDetail={gearDetail}/>);

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

    React.useEffect(() => {renderGear()
        }, []);
    
        
    return (<ReactRouterDOM.BrowserRouter>
                <GearList gear={gear}/>
                <ReactRouterDOM.Switch>
                    <ReactRouterDOM.Route path='/gear/:id'>
                        <ShowGearDetails/>
                    </ReactRouterDOM.Route>
                </ReactRouterDOM.Switch>
            </ReactRouterDOM.BrowserRouter>);
}





