import React from 'react';
import PhoneIcon from '@material-ui/icons/Phone';
import PrintIcon from '@material-ui/icons/Print';

import './RightPanel.css';

class RightPanel extends React.Component {
  render() {
    const {
      phone,
      description,
      services,
    } = this.props;
    return (
      <div className="RightPanel">
        <div className="right-icons">
          <span className="phone">
            <PhoneIcon/> {phone}
          </span> 
          <span className="print" onClick={() => window.print()}>
            <PrintIcon/> Print Page
          </span>
        </div>
        <div className="summary">
          <h2 className="summary-title">Summary</h2>
          <div className="summary-blurb">
            {description}
            <br/>
            Services offered: {services.join(", ")}
          </div>
        </div>
      </div>
    );
  }
}

export default RightPanel;
