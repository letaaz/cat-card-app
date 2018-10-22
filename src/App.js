import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form } from './Form.js';
import * as DataService from './data-service.js';
import './App.css';

export function Header(props) {
  var back = null;
  if (props.backButton === true) {
    back = <a href="/" className="btn btn-primary back-btn"><i className="fas fa-caret-left mr-2"></i>Back</a>;
  }

  return (<header className="bg-primary">
    {back}
    <h1 className="text-white text-center p-3">Cat card app</h1>
  </header>)
}

export function Footer(props) {
  return (<div className="container text-center">
    <i className="far fa-copyright mr-1"></i><label><span id="currentYear">{new Date().getFullYear()}</span> - Lille 1</label>
    <span className="small font-italic infos">No cat has been hurt during the development of this app.</span>
  </div>)
}

class Card extends Component {
   handleClick(id, e) {
//    e.preventDefault();
    console.log("Card id to edit : " + id);
    ReactDOM.render(<Form key={id * 2} id={id} title={this.props.title} src={this.props.src} desc={this.props.description} />, document.getElementById('root'));
  }

  render() {
    return (<div className="flipper mb-3" onTouchStart="this.classNameList.toggle('hover');">
      <div className="front card text-center shadow-sm">
        <img className="card-img-top" src={this.props.src} alt={this.props.alt} width={this.props.width} height={this.props.heigth} />
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
        </div>
      </div>
      <div className="back card text-center shadow-sm">
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">{this.props.title}</h6>
          <p className="card-text">{this.props.description}</p>
        </div>
        <div className="card-footer">
          <button href="#" className="btn btn-primary card-link" onClick={this.handleClick.bind(this, this.props.id)}>Edit that cat</button>
        </div>
      </div>
    </div>)
  }
}

class Home extends Component {
  constructor(props){
    super(props);
    this.state = { cards : []};
    this.callback = this.callback.bind(this);
  }

  callback(response) {
    this.setState( {
      isLoading: false,
      cards : response} );
  }

  componentWillMount() {
    this.setState({
      isLoading: true,
    });
    DataService.getAllCards()
      .then(this.callback);
  }

  handleCreate() {
    ReactDOM.render(<Form create={true} />, document.getElementById('root'));
  }

  resetCards() {
    DataService.clearAll()
      .then(function(response) {
        console.log("cards Cleared !")
      });
    ReactDOM.render(<Home />, document.getElementById('root'));
  }

  render() {
    const cardNodes = this.state.cards.map((card) =>
      <Card id={card.id} alt="Cat" width="250" height="200" title={card.title} src={card.imageUrl} description={card.description}/>);

      if(this.state.isLoading) {
        return (<p>Loading ...</p>)
      }
      else {
        return (
          <>
            <Header />
            <section className="container">
              <h2>Cat card list</h2>
              <hr />
              <div className="card-group">
                {cardNodes}
              </div>
              <button className="btn btn-lg btn-danger circle add" onClick={this.handleCreate.bind(this)}><i className="fas fa-plus"></i></button>
            </section>
            <button onClick={this.resetCards.bind(this)} className="btn btn-default">Reset</button>
            <Footer />
          </>
        );
      }
  }
}

export default Home;
