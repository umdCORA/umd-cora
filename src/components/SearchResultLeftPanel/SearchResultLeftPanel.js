import React from 'react';

import './SearchResultLeftPanel.css';

class SearchResultLeftPanel extends  React.Component {

  renderSearchCritera = () => {
    const {
      address,
      narrowSearchOptions,
    } = this.props;
    const {
      resourceTypeSelection,
      distanceInMilesSelection,
      transportationSelection,
      demographicSelection,
    } = narrowSearchOptions;

    resourceTypeSelection.sort();
    transportationSelection.sort();
    demographicSelection.sort();
    
    return(
      <div className="search-criteria">
        <div className="criteria">
          <u>Address:</u>  {address}
        </div>
        <div className="criteria">
          {resourceTypeSelection.length > 0 && (<span><u>Resource Types:</u> {resourceTypeSelection.join(", ")}</span>)}
        </div>
        <div className="criteria">
          <u>Distance:</u> {distanceInMilesSelection}
        </div>
        <div className="criteria">
          {transportationSelection.length > 0 && (<span><u>Transportation:</u> {transportationSelection.join(", ")}</span>)}
        </div>
        <div className="criteria">
          {demographicSelection.length > 0 && (<span><u>Demographic:</u> {demographicSelection.join(", ")}</span>)}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="search-result-left-panel">
        {this.renderSearchCritera()}
      </div>
    );
  }
}

export default SearchResultLeftPanel;
