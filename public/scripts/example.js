var SearchForm = React.createClass({
  getInitialState: function(){
    return {
      origin:'',
      destination:'',
      adult:0,
      senior:0,
      infantLap:0,
      infantSeat:0
    }

  },
  addOriginDestination: function(){
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
    var adult = this.state.adult;
    var senior = this.state.senior;
    var infantLap = this.state.infantLap;
    var infantSeat = this.state.infantSeat;
    if(!!origin || !!destination){
      this.addOriginDestination();
    }
    this.props.search({adult:adult, senior:senior, infantLap:infantLap, infantSeat:infantSeat});
    this.setState({origin:'',destination:'', adult:0, senior:0, infantLap:0, infantSeat:0});
  },
  handleOriginChange: function(e){
    this.setState({origin:e.target.value});
  },
  handleDestinationChange: function(e){
    this.setState({destination: e.target.value});
  },
  incAdultCount: function(e){
    this.setState({adult: this.state.adult+1 });
  },
  incSeniorCount:function(e){
    this.setState({senior: this.state.senior+1});
  },
  incInfantSeatCount:function(e){
    this.setState({infantSeat:this.state.infantSeat+1})
  },
  incInfantLapCount:function(e){
    this.setState({infantLap:this.state.infantLap+1})
  },
  render: function(){
    return (
      <form className = "form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input className="form-control" type="text" placeholder="Origin" value={this.state.origin} onChange={this.handleOriginChange}/>
          <input className="form-control" type="text" placeholder="Destination" value={this.state.destination} onChange={this.handleDestinationChange}/>
          <button className="btn glyphicon glyphicon-plus" onClick={this.addOriginDestination}></button>
          <p/>
          <div className="btn btn-toolbar">
            <button className="btn btn-primary" type="button" onClick={this.incAdultCount}>Adult<span className="badge">{this.state.adult}</span></button>
            <button className="btn btn-info" type="button" onClick={this.incSeniorCount}>Senior <span className="badge">{this.state.senior}</span></button>
            <button className="btn btn-warning" type="button" onClick={this.incInfantSeatCount}>Infant Seat<span className="badge">{this.state.infantSeat}</span></button>
            <button className="btn btn-danger" type="button" onClick={this.incInfantLapCount}>Infant Lap <span className="badge">{this.state.infantLap}</span></button>
            <button className="btn glyphicon glyphicon-search" type="submit"></button>
          </div>
        </div>
    </form>
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
    return {data:[]};
  },
  addToOriginDestination:function(search){
    var currentSearch = this.state.data;
    search.id = Date.now();
    this.setState({data: currentSearch.concat([search])});
  },
  doTheThing: function(travelerDetails){
    var searchData = this.state.data;
    var search = {
      itinerary:searchData,
      travelers:travelerDetails
    }
    fetch('/search', {
           method: 'POST',
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
          body: JSON.stringify(search)
     });
     this.setState({data:searchData});
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
