import './style';
import {signal, computed} from '@preact/signals';

const x = signal(5)
const y = signal(3)

function eea_list(x, y){
    let a = Math.max(x,y)
    let b = Math.min(x,y)
    let r = a
    let q = 0
    let s = 1
    let s_old = 0
    let t = 0
    let t_old = 1
    let tmp = 0
    let res = [
        [a,b,0,b,s_old,t_old],
        [a,b,q,r,s,t]
    ]
    // b = 0*a+1*b
    while(b!=0){
        r = a % b
        q = (a-r) / b
        s = s_old-q*s
        t = t_old-q*t
        res.push([a,b,q,r,s,t])
        a = b
        b = r
    }
    return res
}
const product = computed(() => x.value * y.value)
const table_entries = computed(() => {
    return eea_list(x,y)
})

function NumberIn(props) {

    const onInput = event => (props.sig.value = event.target.value);

    return (
        <div class="input">
        <input value={props.sig.value} onInput={onInput} />
        </div>
    );
}
function Table(props) {
    return(
        <>
        <table>
            <tr>
                <th>i</th>
                <th>a</th>
                <th>b</th>
                <th>s</th>
                <th>t</th>
                <th>r</th>
            </tr>
        {table_entries.value.map((xs,i) =>
            <tr>
                <td>{i}</td>
                {xs.map((v) => <td>{v}</td>)}
            </tr>
        )}
        </table>
        </>
    )}


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
        <Table />
        <p>The product is {product.value}</p>
        </div>
        <div class="viz">
        <p>Vizualizations go in here</p>
        </div>
        </div>
    );
}
