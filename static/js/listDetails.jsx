function ListDetailsPage() {

    const [listItems, setListItems] = React.useState({});

    React.useEffect(()=> {
        fetch('/userlists/items')
            .then((response) => response.json())
            .then((result) => {
                setListItems(result);
            });
    }, []);
  
    return (<ShowListItems listItems={listItems}/>)

}

ReactDOM.render(<ListDetailsPage/>, document.getElementById('root'));