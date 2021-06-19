function GearPage() {

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

ReactDOM.render(<GearPage/>, document.getElementById('root'));