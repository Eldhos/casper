var SearchForm = React.createClass({
  render: function(){
    return(
      <div> {this.props.url}</div>
    );
  }
});

ReactDOM.render(
  <SearchForm url="/search"/>,
  document.getElementById("content");
);
