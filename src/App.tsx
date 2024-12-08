import { useEffect, useState } from "react";
import Child from "./components/child";

export default function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("app useEffect");
  });
  console.log("app render");
  return (
    <div>
      App: {count}
      <button
        onClick={() => {
          setCount((prevCount) => prevCount + 1);
        }}
      >
        Button
      </button>
      <Child />
    </div>
  );
}
