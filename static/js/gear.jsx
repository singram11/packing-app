function GearPage() {
    return <ReactRouterDOM.BrowserRouter>
            
            <ReactRouterDOM.Switch>
                <ReactRouterDOM.Route exact path='/gear'>
                    <ShowGear />
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route path='/api/usergear/details/:id' children={<ShowGearDetails/>}>
                    <ShowGearDetails/>
                </ReactRouterDOM.Route>
            </ReactRouterDOM.Switch>
    </ReactRouterDOM.BrowserRouter>
}



function ShowGear() {

    const [gear, setGear] = React.useState({});

    React.useEffect(() => {
        fetch('/api/usergear')
            .then((response) => response.json())
            .then((result) => {
                setGear(result);
            });
        }, []);
    
        
    return (<GearList gear={gear}/>);
}

function ShowGearDetails() {

    const { id } = ReactRouterDOM.useParams();
    
    const [gearDetail, setGearDetail] = React.useState({});

    const url = `/api/usergear/details/${id}`

    React.useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                setGearDetail(result);
            });
        }, []);
    
    console.log(`gearDetail: ${gearDetail}`)  
    return (<GearItemDetails gearDetail={gearDetail}/>);
    return (<div>butts</div>);
}

ReactDOM.render(<GearPage/>, document.getElementById('root'));