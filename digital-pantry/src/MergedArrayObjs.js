import React from "react";
import ItemList from "./ItemListMaker";

function mergeArraysOfObjects (array1, array2) {
  return [...array1, ...array2];
};

const MyComponent = ({ array1, array2 }) => {

  const mergedArray = mergeArraysOfObjects(array1, array2);

  console.log(mergedArray);

  

  return (
    <ItemList items={mergedArray}/>
  );
};

export default MyComponent;

