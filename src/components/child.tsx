import { useEffect, useState } from "react";

export default function Child() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("child useEffect");
  });
  console.log("child render");
  return (
    <div>
      Child: {count}
      <button
        onClick={() => {
          setCount((prevCount) => prevCount + 1);
        }}
      >
        Child
      </button>
    </div>
  );
}
