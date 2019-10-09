import React from 'react';
import './App.css';
import Resources from './resources'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount(){
    this.setState({data: Resources.fetchData()})
  }

  render(){
    let {items = [], total = {}} = this.state.data
    return (
      <div className="App">
        <table className="table table-striped table-dark">
          <thead >
            <tr>
              <th scope="col">title</th>
              {total.peasants &&  <th scope="col">peasants</th>}
              {total.visitors &&  <th scope="col">visitors</th>}
              {total.attractions && <th scope="col">attraction</th>}
              {total.cabinet && <th scope="col">cabinet</th>}
              {total.tickets && <th scope="col">tickets</th>}
              {total.persuasion && <th scope="col">persuasion</th>}
              {total.revenue && <th scope="col">revenue</th>}
              {total.averageTicket && <th scope="col">averageTicket</th>}
              {total.items && <th scope="col">items</th>}
              {total.itemPerTicket && <th scope="col">itemperTicket</th>}
              {total.averagePermanence && <th scope="col">averagePermanence</th>}
              {total.daysOff && <th scope="col">Days Off</th>}
            </tr>
          </thead>
          <tbody className="table-striped">
            {
              items.map((item, key) => {
                return <tr key={item.identifier}>
                  <td className={key === items.length - 1 ? 'right' : ''}>{item.name}</td>
                  {total.peasants && <td>{item.peasants}</td>}
                  {total.visitors && <td>{item.visitors}</td>}
                  {total.attractions && <td>{item.attractions}%</td>}
                  {total.cabinet && <td>{item.cabinet}</td>}
                  {total.tickets && <td>{item.tickets}</td>}
                  {total.persuasion && <td>{item.persuasion}%</td>}
                  {total.revenue && <td>{item.revenue}</td>}
                  {total.averageTicket && <td>{item.averageTicket}</td>}
                  {total.items && <td>{item.items}</td>}
                  {total.itemPerTicket && <td>{item.itemPerTicket}</td>}
                  {total.averagePermanence && <td>{item.averagePermanence} min</td>}
                  {total.daysOff && <td>{item.daysOff}</td>}
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
