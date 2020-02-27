import React from 'react';
import * as constUrls from '../globals/constants';
import { images } from '../globals/images/index';
import './PropertyList.css';

class PropertyList extends React.Component {
  state = {
    isLoading: false,
    properties: [],
    error: null,
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(`${constUrls.PROXY_URL}${constUrls.FETCH_URL}`)
      .then(response => response.json())
      .then(data => this.setState({ properties: data.properties, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }))
  }

  render() {
    const { error, isLoading, properties } = this.state;
    if (error) {
      return <h3>{error.message}</h3>;
    }

    if (!properties.length) {
      return <h3>We're all sold out of rental properties. Please check back soon!</h3>;
    }

    return (
      <>
        <h2>Mobile Programming Properties:</h2>
        <div className="container">
          {!isLoading ? (
            properties.map(property => {
              const { address, mainImageUrl, id, physical, financial, resources } = property;
              return (
                <div className="card" key={id}>
                  <img
                    className="image"
                    id={id}
                    onClick={(e) => {
                      this.props.history.push(`/property/${e.target.id}`, { address: address.address1, resources })
                    }} src={mainImageUrl ? mainImageUrl : images.spongebob}
                    alt="rental-properties"
                  ></img>

                  <p>Address: {address && address.address1 ? address.address1 : 'N/A'}</p>
                  <p>Year Built: {physical && physical.yearBuilt ? physical.yearBuilt : 'N/A'}</p>
                  <p>List Price: {financial && financial.listPrice ? '$' + financial.listPrice : 'N/A'}</p>
                  <p>Monthly Rent: {financial && financial.monthlyRent ? '$' + financial.monthlyRent : 'N/A'}</p>
                  <p>Gross Yield: {(financial && financial.monthlyRent && financial.listPrice ? (financial.monthlyRent * 12 / financial.listPrice).toFixed(4) + '%' : 'N/A')}</p>
                </div>
              );
            })
          ) : (
              <h3>Loading...</h3>
            )}

        </div>
      </>
    )
  }
}

export default PropertyList;