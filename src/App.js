import React from 'react';
import './App.css';
import Overview from './components/Overview';
import Details from './components/Details';
import Add from './components/Add';
import Edit from './components/Edit'
import { HashRouter, Route } from 'react-router-dom';


class App extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        view: '',
        params: {},
      };
    }


  // handleChangeView(view, params) {
  //   console.log({ view, params })
  //   this.setState({view, params})
  // }

  render() {
  // const { view, params } = this.state;

  // let ActiveView; //big letters to show that this will be a component

  // switch (view) {
  //   case '/details':
  //     ActiveView = Details;
  //     break;
  //   case '/add':
  //     ActiveView = Add;
  //     break;
  //   case '/edit':
  //     ActiveView = Edit;
  //     break;
  //   default: 
  //     ActiveView = Overview;
  // }


    return (
      <HashRouter>
      <div>
        <h1>Book Nook</h1>
        
        <h2>My favourite books</h2>
        {/* <ActiveView 
        {...params}
        changeView={this.handleChangeView.bind(this)}
        /> */}
        <Route path="/" exact component={Overview} />
        <Route path="/details/:id" component={Details} />
        <Route path="/add" component={Add} />
        <Route path="/edit/:id" component={Edit} />
        </div>
        </HashRouter>
    )
  }
}
export default App;
