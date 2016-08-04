var SearchForm = React.createClass({
  getInitialState: function(){
    return ({origin:'',destination:''});
  },
  handleOriginChange: function(e){
    this.setState({origin:e.target.value});
  },
  handleDestinationChange: function(e) {
    this.setState({destination:e.target.value});
  },

  render: function(){
    return(
      <form className = "searchForm" onSubmit={this.handleSubmit}>
      <input
        type="text"
        placeholder="Origin"
        value={this.state.origin}
        onChange={this.handleOriginChange}
        />
        </form>

    );
  }
});


ReactDOM.render(
  <SearchForm url="/search"/>,
  document.getElementById("content")
);
