import React, { useEffect, useState, useMemo } from "react";


const ItemList = ({ items }) => {
    const [counts, setCounts] = useState(() => {
      const initialCounts = {};
      for (const item of items) {
        initialCounts[item.name] = 0;
      }
      return initialCounts;
    });
  
    const handleCountChange = (name, value) => {
      const updatedCounts = { ...counts };
      updatedCounts[name] = value;
      setCounts(updatedCounts);
    };
  
    const countsMap = useMemo(() => {
      const countsMap = {};
      for (const item of items) {
        countsMap[item.name] = counts[item.name];
      }
      return countsMap;
    }, [counts]);
  
    return (
      <ul>
        {items.map((item) => {
          const count = countsMap[item.name];
  
          return (
            <li key={item.name}>
              <span className="name">{item.name}</span>
              <input
                type="number"
                className="count"
                value={count}
                onChange={(e) => handleCountChange(item.name, e.target.value)}
              />
              <span className="unit">{item.unit}</span>
            </li>
          );
        })}
      </ul>
    );
};

export default ItemList;