import { useEffect } from "react";
import {
  futbollistiSelectors,
  fetchFutbollistiAsync,
  fetchFilters // Import the function
} from "../../features/futbollisti/futbollistiSlice";
import { useAppSelector, useAppDispatch } from "../store/configureStore";


export default function useFutbollisti() {
  const futbollisti = useAppSelector(futbollistiSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { futbollistiLoaded, filtersLoaded, emri, skuadra, metaData } = useAppSelector(state => state.futbollisti);

  useEffect(() => {
    if (!futbollistiLoaded) dispatch (fetchFutbollistiAsync());
  }, [dispatch, futbollistiLoaded]);
  
  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters()); // Use the function here
  }, [dispatch, filtersLoaded]);

  return {
    futbollisti,
    futbollistiLoaded,
    filtersLoaded,
    emri,
    skuadra,
    metaData
  };
}
