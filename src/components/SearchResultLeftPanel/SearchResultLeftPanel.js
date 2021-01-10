import React from 'react';

import './SearchResultLeftPanel.css';

class SearchResultLeftPanel extends  React.Component {

  renderSearchCritera = () => {
    const {
      address,
      narrowSearchOptions,
    } = this.props;
    const { distanceInMilesSelection } = narrowSearchOptions;

    return (
      <div className="search-criteria">
        <div className="criteria">
          <u>Address:</u>  {address}
        </div>
        <div className="criteria">
          <u>Distance:</u> {distanceInMilesSelection}
        </div>
        {
          Object.keys(narrowSearchOptions).map((key, index) => (
            <div className="criteria" key={index}>
              {narrowSearchOptions[key].length > 0 && (<span><u>{key}:</u> {narrowSearchOptions[key].join(", ")}</span>)}
            </div>
          ))
        }
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
