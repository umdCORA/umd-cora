import React from 'react';

class DescriptionPanel extends React.Component {
  render() {
    const { tags } = this.props;

    return (
      <div className="DescriptionPanel">
        <h2 style={{fontWeight: 'bold'}}>Description</h2>
        {tags.map(tag => <div key={tag}>{tag}</div>)}
      </div>
    );
  }
}

export default DescriptionPanel;
