const buzz = () => {
    const date = new Date();
    alert('buzzed at ' + `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
};

export default function BuzzerPage() {
    return <div style={{textAlign: 'center'}}>
        <br />
        <br />
        <button style={{
            padding: '150px',
            fontSize: '4em',
            color: 'black',
            border: '5px solid black'
        }} 
        onClick={buzz}
        >
            Buzz
        </button>
    </div>
};