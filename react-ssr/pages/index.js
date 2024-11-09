import React, { useState } from 'react';

export const getServerSideProps = async () => {
    const res = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await res.json();
    console.log(data);
    return {
        cat: data
    }
}

export default function App(props) {
    console.log(123, props);
    const [count, setCount] = useState(0);
    return <div>
        <p>count: {count}</p>
        <button onClick={() => setCount(count + 1)}>click me 1111</button>
        <img src={props.cat[0].url} alt="cat" />
    </div>;
}
