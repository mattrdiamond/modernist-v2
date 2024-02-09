import React from "react";
import { withRouter, Link } from "react-router-dom";
import CollectionItem from "../collection-item/collection-item.component";
import Icon from "../icon/icon.component";
import "./collection-preview.styles.scss";

const CollectionPreview = ({ title, items, history, match, routeName }) => (
  <section className='collection-preview'>
    <Link to={`${match.path}/${routeName}`}>
      <h2 className='title'>{title}</h2>
    </Link>
    <div className='preview-wrapper'>
      <div className='preview'>
        {items
          .filter((item, index) => index < 5)
          .map((item) => (
            <CollectionItem key={item.id} item={item} routeName={routeName} />
          ))}
      </div>
      <button
        onClick={() => history.push(`${match.path}/${routeName}`)}
        className='view-all'
      >
        <div className='circle'>
          <Icon icon='arrow-right-long' title='view all' />
        </div>
        View All
      </button>
    </div>
  </section>
);

export default withRouter(CollectionPreview);
