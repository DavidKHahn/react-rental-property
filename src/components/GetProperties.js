import React from 'react';
import * as constUrls from '../globals/constants';
import './PropertyList.css';
import PropertyListView from './PropertyListContainer';

class GetProperties extends React.Component {
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
    if (isLoading) {
      return <h3>Loading...</h3>
    }
    if (!properties.length) {
      return <h3>We're all sold out of rental properties. Please check back soon!</h3>;
    }
    return <PropertyListView properties={this.state.properties} />
  }
}

export default GetProperties;