import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './fonts/fonts.css';
import './calendar.css';

import { DatePicker, Calendar } from '../../dist';

const App = () => {
  const [selectedDay, setValue] = useState(null);

  return (
    <div className="page">
      <div className="divisao">
        <Calendar value={selectedDay} onChange={setValue} shouldHighlightWeekends />
      </div>
      <div className="divisao">
        <DatePicker value={selectedDay} onChange={setValue} shouldHighlightWeekends />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
