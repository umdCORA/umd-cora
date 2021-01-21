import React from 'react';

import './RightPanel.css';

class RightPanel extends React.Component {

  render() {
    const {
      description,
      services,
    } = this.props;

    return (
      <div className="RightPanel">
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
