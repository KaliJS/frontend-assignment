import React, { useState, useEffect } from "react";

const DATA = {
  India: "Delhi",
  China: "Beijing",
  Russia: "Moscow",
  Afghanistan: "Kabul",
  France: "Paris",
  Germany: "Berlin",
  England: "London",
};

const Game = ({ data }) => {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Randomize items and split them into an array of country and capital options
    const countries = Object.keys(data).map((country) => ({ name: country, type: "country" }));
    const capitals = Object.values(data).map((capital) => ({ name: capital, type: "capital" }));
    setItems(shuffleArray([...countries, ...capitals]));
  }, [data]);

  useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected;

      // Check if selected options form a correct match
      if (data[first.name] === second.name || data[second.name] === first.name) {
        // Correct match
        setMatchedPairs((prev) => [...prev, first.name, second.name]);

        setTimeout(() => {
          setSelected([]);
          setItems((prevItems) => prevItems.filter((item) => !matchedPairs.includes(item.name)));
        }, 1000);
      } else {
        // Incorrect match, reset selection after 1000 ms
        setTimeout(() => setSelected([]), 1000);
      }
    }
  }, [selected, data, matchedPairs]);

  useEffect(() => {
    if (items.length === matchedPairs.length) {
      setMessage("Congratulations!");
    }
  }, [matchedPairs, items.length]);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleSelect = (item) => {
    if (selected.length < 2 && !selected.includes(item)) {
      setSelected((prev) => [...prev, item]);
    }
  };

  const getBorderColor = (item) => {
    if (selected.includes(item)) {
      return selected.length === 2 ? (data[selected[0].name] === selected[1].name || data[selected[1].name] === selected[0].name ? "green" : "red") : "blue";
    }
    return "grey";
  };

  return (
    <div>
      <h1>Match the Countries with their Capitals</h1>
      {message ? (
        <h2>{message}</h2>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelect(item)}
              style={{
                padding: "10px",
                border: `2px solid ${getBorderColor(item)}`,
                cursor: "pointer",
                width: "100px",
                textAlign: "center",
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Usage of Game component
export default function App() {
  return <Game data={DATA} />;
}
