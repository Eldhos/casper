var SearchForm = React.createClass({
  getInitialState: function(){
    return {
      origin:'',
      destination:'',
    }

  },
  addOriginDestination: function(e){
    e.preventDefault();
    var origin = this.state.origin;
    var destination = this.state.destination;
    if(!origin || !destination){
      return;
    }
    this.props.addToOriginDestination({origin: origin, destination:destination});
    this.setState({origin:'', destination:''});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var origin = this.state.origin;
    var destination = this.state.destination;
    if(!origin || !destination){
      this.props.search(null);
    } else {
      this.props.search({origin:origin, destination: destination});

    }
    this.setState({origin:'',destination:''});
  },
  handleOriginChange: function(e){
    this.setState({origin:e.target.value});
  },
  handleDestinationChange: function(e){
    this.setState({destination: e.target.value});
  },
  render: function(){
    return (
      <div>
      <form className = "form-inline" onSubmit={this.handleSubmit}>
      <div className="form-group">
        <input className="form-control" type="text" placeholder="Origin"
          value={this.state.origin} onChange={this.handleOriginChange}/>
        <input className="form-control" type="text" placeholder="Destination"
          value={this.state.destination} onChange={this.handleDestinationChange}/>
        <button className="btn glyphicon glyphicon-search" type="submit"></button>
        <button className="btn glyphicon glyphicon-plus" onClick={this.addOriginDestination}></button>
      </div>
    </form>
      </div>
    );
  }
});
var SearchList = React.createClass({
  render: function(){
    var searchNodes = this.props.results.map(function(search){
    return(
      <SearchNode key={search.id} origin={search.origin} destination={search.destination}/>
    );
    });
    return(
      <div className="searchList">
        {searchNodes}
      </div>
    );
  }
});
var SearchNode = React.createClass({
  render: function(){
    return(
      <form className="form-inline">
        <div className="form-group">
          <input className="form-control" type="text" value={this.props.origin} disabled/>
          <input className="form-control" type="text" value={this.props.destination} disabled/>
        </div>
      </form>
    );
  }
});
var SearchContainer = React.createClass({
  getInitialState: function(){
    return {data:[{
      id:1,
      origin:'las',
      destination:'lax',
      newForm:false
    }]};
  },
  addToOriginDestination:function(search){
    var currentSearch = this.state.data;
    search.id = Date.now();
    this.setState({data: currentSearch.concat([search])});
  },
  doTheThing: function(search){
    var searchData=this.state.data;
    var sendSearch = searchData;
    if(search != null) {
      search.id = Date.now();
      sendSearch = searchData.concat([search])
    }
    fetch('/search', {
           method: 'POST',
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
          body: JSON.stringify(sendSearch)
     });
     this.setState({data:sendSearch});
  },
  render: function(){
    return (
      <div className="searchContainer">
        <SearchList results={this.state.data} url={this.props.url}/>
        <SearchForm search={this.doTheThing} addToOriginDestination={this.addToOriginDestination}/>
      </div>
            );
  }
});

ReactDOM.render(
  <SearchContainer url="/search"/ >,
  document.getElementById("content")
);
