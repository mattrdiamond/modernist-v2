import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  categoryItemType,
  collectionIdPropType,
  collectionTitlePropType,
} from "../../sharedPropTypes/sharedPropTypes";

import CollectionItem from "../collection-item/collection-item.component";
import Icon from "../icon/icon.component";

import "./collection-preview.styles.scss";

const CollectionPreview = ({ title, items, routeName }) => {
  const navigate = useNavigate();

  return (
    <section className='collection-preview'>
      <Link to={`/shop/${routeName}`}>
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
          onClick={() => navigate(`/shop/${routeName}`)}
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
};

export default CollectionPreview;

CollectionPreview.propTypes = {
  title: collectionTitlePropType.isRequired,
  items: PropTypes.arrayOf(categoryItemType).isRequired,
  routeName: collectionIdPropType.isRequired,
};
