import './style';
import {signal} from '@preact/signals';

const x = signal(5)
const y = signal(3)

function NumberIn(props) {

    const onInput = event => (props.sig.value = event.target.value);

    return (
        <div class="input">
            <input value={props.sig.value} onInput={onInput} />
        </div>
    );
}

export default function App() {
	return (
		<div class="base-grid">
            <div class="headline">
			<h1>Hello, World!</h1>
            <p>This is the headline</p>
        </div>
        <div class="inputs">
            <p>Inputs go in here</p>
            <NumberIn sig={x}/>
            <NumberIn sig={y}/>
        </div>
        <div class="table">
            <p>Tables go in here</p>
        </div>
        <div class="viz">
            <p>Vizualizations go in here</p>
		</div>
        </div>
	);
}
