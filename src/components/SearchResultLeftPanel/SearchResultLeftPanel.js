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
        <div className="title"><u>Search Criteria</u></div>
        <div className="criteria">{`Address:  ${address}`}</div>
        <div className="criteria">{resourceTypeSelection.length > 0 && `Resource Types: ${resourceTypeSelection.join(", ")}`}</div>
        <div className="criteria">{`Distance: ${distanceInMilesSelection}`}</div>
        <div className="criteria">{transportationSelection.length > 0 && `Transportation: ${transportationSelection.join(", ")}`}</div>
        <div className="criteria">{demographicSelection.length > 0 && `Demographic: ${demographicSelection.join(", ")}`}</div>
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
