import React from "react";
import TicketList from './TicketList';
import NewTicketControl from './NewTicketControl';

class Queue extends React.Component {

  constructor(props) {
    console.log('constructor');
    super(props);
    this.state = {
      masterTicketList: [],
    };
    this.addNewTicketToList = this.addNewTicketToList.bind(this);
    this.updateTicketTimeSinceOpened = this.updateTicketTimeSinceOpened.bind(this);
  }

  componentDidMount() {
    this.timeSinceOpenedChecker = setInterval(() =>
      this.updateTicketTimeSinceOpened(),
      5000
    );
  }

  componentWillUnmount(){
    clearInterval(this.timeSinceOpenedChecker);
  }

  addNewTicketToList(newTicket){
    let newMasterTicketList = this.state.masterTicketList.slice();
    newMasterTicketList.push(newTicket);
    this.setState({masterTicketList: newMasterTicketList});
  }

  updateTicketTimeSinceOpened() {
    let newMasterTicketList = this.state.masterTicketList.slice();
    newMasterTicketList.forEach((ticket) =>
      ticket.setTimeSinceOpened()
    );
    this.setState({masterTicketList:newMasterTicketList})
  }

  render() {
    return (
      <div>
        <TicketList ticketList = {this.state.masterTicketList}/>
        <NewTicketControl onNewTicketCreation= {this.addNewTicketToList}/>
      </div>
    );
  }
}

export default Queue;
