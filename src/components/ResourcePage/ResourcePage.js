import React from 'react';
import { withRouter } from "react-router-dom";
import { getDistance, convertDistance } from 'geolib';
import LeftPanel from './LeftPanel.js';
import RightPanel from './RightPanel.js';
import DescriptionPanel from './DescriptionPanel.js';

import './ResourcePage.css';


class ResourcePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      description: '',
      location: '',
      services: [],
      distance: 0,
      targetLat: null,
      targetLong: null,
      tags: [],
    };
  }

  componentDidMount = () => {
    fetch(`/api/v1/data/resources/${this.props.match.params.uuid}`)
      .then(res => res.json())
      .then(result => {
        const {
          lat,
          long
        } = this.props.match.params;

        let distanceInMiles = convertDistance(getDistance(
          { latitude: parseFloat(lat), longitude: parseFloat(long) },
          { latitude: result.location.geo.coordinates[0], longitude: result.location.geo.coordinates[1] },
        ), 'mi');
        distanceInMiles = Math.round(distanceInMiles * 100) / 100;
        this.setState({
        name: result.name,
        phone:  result.contact.phone,
        description: result.description,
        location: result.location,
        services: result.services,
        distance: distanceInMiles,
        targetLat: result.location.geo.coordinates[0],
        targetLong: result.location.geo.coordinates[1],
        tags: result.tags,
      })});
  }

  render() {
    const {
      name,
      phone,
      description,
      location,
      services,
      distance,
      targetLat,
      targetLong,
      tags,
    } = this.state;

    return (
      <div className="ResourcePage">
        {targetLat && targetLong &&
          <div className="resource-page-container">
            <div className="panel-container">
              <LeftPanel
                name={name}
                location={location}
                distance={distance}
                targetLat={targetLat}
                targetLong={targetLong}
              />
              <RightPanel
                phone={phone}
                description={description}
                services={services}
              />
            </div>
            <DescriptionPanel
              tags={tags}
            />
          </div>
        }
      </div>
    );
  }
}

export default withRouter(ResourcePage);
