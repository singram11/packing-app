function ListsPage() {
    
    const [lists, setLists] = React.useState({});

    React.useEffect(()=> {
        fetch('/userlists')
        .then((response) => response.json())
        .then((result) => {
            setLists(result);
        });
    }, []);
    
    return (<Lists lists={lists}/>)
}

ReactDOM.render(<ListsPage/> , document.getElementById('root'));