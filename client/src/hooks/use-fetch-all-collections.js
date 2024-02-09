import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAreAllCollectionsLoaded,
  selectCollectionsError,
  selectIsFetchingCollections,
} from "../redux/shop/shop.selectors";
import { fetchCollectionsStart } from "../redux/shop/shop.actions";

const useFetchAllCollections = () => {
  const dispatch = useDispatch();
  const allCollectionsLoaded = useSelector(selectAreAllCollectionsLoaded);
  const loading = useSelector(selectIsFetchingCollections);
  const error = useSelector(selectCollectionsError);

  useEffect(() => {
    if (!allCollectionsLoaded) {
      dispatch(fetchCollectionsStart());
    }
  }, [dispatch, allCollectionsLoaded]);

  return { loading, error };
};

export default useFetchAllCollections;
