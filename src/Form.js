import React, { Component } from 'react';
import { Header, Footer} from './App.js';
import * as DataService from './data-service.js';
import './App.css';

function CardTitleInput(props) {
  return (<div className="form-group row">
              <label htmlFor="cardTitle" className="col-sm-2 col-form-label">Card title</label>
              <input type="text" required className="form-control col-sm-10" id="cardTitle" name="titleValue" onChange={props.onChange} value={props.title} />
              <div className="invalid-feedback offset-md-2 col-sm-10">
                That field is required. Please provide a value.
              </div>
            </div>);
}

function CardImageInput(props) {
  return (<div className="form-group row">
    <label htmlFor="cardImage" className="col-sm-2 col-form-label">Card image URL</label>
    <input type="url" required className="form-control col-sm-10" id="cardImage" name="srcValue"  onChange={props.onChange} value={props.src}/>
    <div className="invalid-feedback offset-md-2 col-sm-10">
      That field is required and attempt an URL as value. Please provide a value that respect URL format.
    </div>
  </div>);
}

function CardDescriptionInput(props) {
  return (<div className="form-group row">
    <label htmlFor="cardDescription" className="col-sm-2 col-form-label">Card description</label>
    <textarea className="form-control col-sm-10" id="cardDescription" name="descValue" onChange={props.onChange} value={props.desc}></textarea>
  </div>);
}

export class Form extends Component {
    constructor(props) {
      super(props);
      if (this.props.id && this.props.title && this.props.src && this.props.desc) {
        this.state = { id : this.props.id, titleValue : this.props.title, srcValue : this.props.src, descValue : this.props.desc};
      } else {
        this.state = { titleValue : "", srcValue : "", descValue : ""};
      }

      this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
      const target = e.target;
      const name = target.name;
      const value = target.value;

      this.setState({
        [name] : value
      });
    }

    handleSave(e) {
      e.preventDefault();
      console.log("Values to be saved : \n" + this.state.id + " " + this.state.titleValue + " " + this.state.srcValue + " " + this.state.descValue);
      var updatedCard = {
        id : this.state.id,
        title: this.state.titleValue,
        imageUrl: this.state.srcValue,
        description: this.state.descValue
      };
      DataService.updateCard(updatedCard)
        .then(function(response) {
          console.log("Card updated !")
        });
    }

    handleDelete(e) {
      e.preventDefault();
      DataService.deleteCard(this.state.id)
        .then(function(response) {
          console.log("Card deleted !");
        });
    }

    handleCreate(e) {
      e.preventDefault();
      const newCard = {
        title: this.state.titleValue,
        imageUrl: this.state.srcValue,
        description: this.state.descValue
      };
      DataService.createCard(newCard)
        .then(function(response) {
          console.log("new Card created !");
        });
    }

    render() {
      var createButton = null;
      var delButton = <button onClick={this.handleDelete.bind(this)} className="btn btn-danger">Delete</button>;
      var saveButton = <button type="submit" onClick={this.handleSave.bind(this)} className="btn btn-primary">Save</button>;

      if (this.props.create === true) {
        createButton = <button type="submit" onClick={this.handleCreate.bind(this)} className="btn btn-primary">Create</button>;
        delButton = null;
        saveButton = null;
      }

      return (<>
        <Header backButton={true} />
        <section className="container">
          <h2>Cat card form</h2>
          <hr />
          <form noValidate className="was-validated">
          <CardTitleInput title={this.state.titleValue} onChange={this.handleInputChange} />
          <CardImageInput src={this.state.srcValue} onChange={this.handleInputChange} />
          <CardDescriptionInput desc={this.state.descValue} onChange={this.handleInputChange} />
          {createButton}
          {delButton}
          {saveButton}
          </form>
        </section>
        <Footer/>
      </>);
    }
}
