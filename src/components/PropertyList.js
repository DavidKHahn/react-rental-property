import React from 'react';
import spongeBob from '../assets/spongebob_ight_imma_head_out.jpg';
import './PropertyList.css';

class PropertyList extends React.Component {
  state = {
    isLoading: true,
    properties: []
  }

  componentDidMount() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url= 'https://dev1-sample.azurewebsites.net/properties.json';

    fetch(proxyUrl+url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          properties: data.properties,
          isLoading: false
        },
          () => console.log('properties', this.state.properties))
      })
  }

  // handleClick = () => {
  //   this.props.history.push(`/${this.state.properties.id}`);
  // }

  render() {
    console.log(this.state.properties)
    return (
      <>
        <h2>Mobile Programming Properties:</h2>
        <div className="container">
          {!this.state.isLoading ? (
            this.state.properties.map(property => {
              const { address, mainImageUrl, id, physical, financial, resources } = property;
              return (
                <div className="card" key={id}>
                  <img
                    className="image"
                    id={id}
                    onClick={(e) => {
                      // console.log(e.target.id, )
                      this.props.history.push(`/property/${e.target.id}`, { address: address.address1, resources })
                    }} src={mainImageUrl ? mainImageUrl : spongeBob}
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