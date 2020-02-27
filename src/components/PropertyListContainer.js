import React from 'react';
import { useHistory } from "react-router-dom";
import { images } from '../globals/images/index';

const PropertyListView = props => {
    const history = useHistory();
    const { properties } = props;

    return (
        <>
            <h2>Mobile Programming Properties:</h2>
            <div className="container">
                {properties.map(property => {
                    const { address, mainImageUrl, id, physical, financial, resources } = property;
                    return (
                        <div className="card" key={id}>
                            <img
                                className="image"
                                id={id}
                                onClick={(e) => {
                                    history.push(`/property/${e.target.id}`, { address: address.address1, resources })
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
                }
            </div>
        </>
    )
}

export default PropertyListView;