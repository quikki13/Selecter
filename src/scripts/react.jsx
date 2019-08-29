let scaleInfo = {
    "c": "Цельсии",
    "f": "Фаренгейт"
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFarenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return "";
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function BoilingVerdict(props) {
    if(props.celsius >= 100) {
        return <p>Вода кипит!</p>
    }
    return <p>Вода не кипит!</p>
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.onTemperatureChange(event.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <div>
                <legend>Введите температуру в {scaleInfo[scale]}:</legend>
                <input value={temperature} onChange={this.handleClick}/>
            </div>
        )
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFarenheitChange = this.handleFarenheitChange.bind(this);
        this.state = {temperature: '', scale: 'c'};
    }

    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }

    handleFarenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const farenheit = scale === 'c' ? tryConvert(temperature, toFarenheit) : temperature;

        return (
            <div>
            <TemperatureInput onTemperatureChange={this.handleCelsiusChange} temperature={celsius} scale="c"/>
            <TemperatureInput onTemperatureChange={this.handleFarenheitChange} temperature={farenheit} scale="f"/> 
            <BoilingVerdict celsius={parseFloat(celsius)}/>
            </div>
        )
    }
}

ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
);