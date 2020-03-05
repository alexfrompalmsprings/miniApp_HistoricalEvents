import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//bring the paginate
import ReactPaginate from 'react-paginate';

import List from './List.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events:[],
      request: '-',
      pageCount: 0 // should be zero when starting looking for events 😮
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e){
    const {name, value} = e.target;
    e.preventDefault();

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e){
    const {request} = this.state;
    e.preventDefault();
    this.searchEvents(request)
  }

  searchEvents(request,num){
    //use axios to get the events 🟠
    axios.get('/events', {
      params: {
        q:request,
        _page: num,
        _limit:20
      }
    })

    .then(response => {
      this.setState({
        events: response.data
      })
    })

    .catch(err => {
      console.log('there is an error trying to access this event', err)
    });
  }


  handleClick(e){
    console.log(`user changed the page to ${e.selected}`)
  }

  render() {
    const {events, request} = this.state;

    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Request:</label> <input type='text' name='request' value={request} onChange={this.handleChange}/>
          <input type="submit" />
        </form>

        <br></br>

        <List events={events}/>

        <br></br>

        <ReactPaginate
        previousLabel={'PREVIOUS'}
        nextLabel={'NEXT'}
        breakLabel={'---'}
        breakClassName={'break-me'}
        pageCount={this.state.pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={this.handleClick}
        />

      </div>
    )
  };
}

ReactDOM.render(<App />, document.getElementById('app'));

