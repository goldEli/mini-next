import React, { useState } from 'react';

export default function App() {
    const [count, setCount] = useState(0);
    return <div>
        <p>count: {count}</p>
        <button onClick={() => setCount(count + 1)}>click me 1111</button>
    </div>;
}
