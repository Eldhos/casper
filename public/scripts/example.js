var SearchForm = React.createClass({
  getInitialState: function(){
    return ({origin:'',destination:''});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var origin= this.state.origin.trim();
    var destination = this.state.destination.trim();
    if(!origin || !destination){
      return;
    }
    fetch('/search', {
          method: 'POST',
          headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
          body: JSON.stringify({
                origin: origin,
                destination: destination,
                })
    });

    this.setState({origin:'',destination:''});
  },
  handleOriginChange: function(e){
    this.setState({origin:e.target.value});
  },
  handleDestinationChange: function(e) {
    this.setState({destination:e.target.value});
  },
  render: function(){
    return(
      <div>
        <form className = "form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input className="form-control" type="text" placeholder="Origin"
            value={this.state.origin}
            onChange={this.handleOriginChange} />
          <input className="form-control" type="text" placeholder="Destination"
            value={this.state.destination}
            onChange={this.handleDestinationChange} />
          <button className="btn btn-default" type="submit">Post</button>
        </div>
      </form>

      <div className="originValue">
        Origin is {this.state.origin}
        <br></br>
        Destination value is {this.state.destination}
      </div>
      </div>

    );
  }
});


ReactDOM.render(
  <SearchForm url="/search"/>,
  document.getElementById("content")
);
