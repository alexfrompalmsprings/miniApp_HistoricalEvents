import React from 'react';

import Entry from './Entry.jsx'

const List = props => {
   const {events} = props;

   return (
     <div>
       <div>
         List of events
       </div>

      <br></br>
      {events.map((event, index) =>
        <Entry
          key={index}
          description={event.description}
          lang={event.lang}
          category1={event.category1}
          category2={event.category2}
          granularity={event.granularity}
        />
      )}
     </div>
   );
}

export default List;