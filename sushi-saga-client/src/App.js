import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  constructor(){
    super() 

    this.state = {
      sushi: [],
      index: 0,
      balance: 100
    }
  }

  componentDidMount() {
    fetch(API)
    .then(resp => resp.json())
    .then(sushi => 
      this.setState({
        sushi
      }))
  }

  displaySushi = () => {
    let i = this.state.index 

    return this.state.sushi.slice(i, i + 4)
  }

  moreSushi = () => {
    let i = this.state.index 
    this.setState({index: i + 4})
  }

  eatSushi = (id, price) => {
    let newBalance = this.state.balance - price
    if (newBalance < 0 ){ return }

    let newSushi = this.state.sushi.map(sushi => {
      if (sushi.id === id ){ sushi.eaten = true}
      return sushi
    })
    this.setState({sushi: newSushi, balance: newBalance})
  }

  render() {
    return (
      <div className="app">
        <SushiContainer 
          sushi={this.displaySushi()}
          moreSushi={this.moreSushi}
          eatSushi={this.eatSushi}
        />
        <Table 
        plates={this.state.sushi.filter(sushi => sushi.eaten)}
        balance={this.state.balance}
        />
      </div>
    );
  }
}

export default App;