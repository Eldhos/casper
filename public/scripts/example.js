var SearchForm = React.createClass({
  addOriginDestination: function(){
  },
  render: function(){
    return (
      <div>
      <form className = "form-inline" onSubmit={this.props.handleSubmit}>
      <div className="form-group">
        <input className="form-control" type="text" placeholder="Origin"
          value={this.props.origin} />
        <input className="form-control" type="text" placeholder="Destination"
          value={this.props.destination} />
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
      <div>
        <p>Origin: {this.props.origin}   Destination: {this.props.destination}</p>
        <button className="btn btn-danger glyphicon glyphicon-trash"></button>
      </div>

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
  render: function(){
    return (
      <div className="searchContainer">
        <SearchList results={this.state.data} url={this.props.url}/>
        <SearchForm/>
      </div>
            );
  }
});

ReactDOM.render(
  <SearchContainer url="/search"/ >,
  document.getElementById("content")
);
