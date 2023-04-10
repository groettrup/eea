import './style';
import {signal, computed, effect} from '@preact/signals';
import katex from 'katex';

const x = signal(5)
const y = signal(3)
const curr = signal(null)



function eea_list(x, y){
    let a = Math.max(x,y)
    let b = Math.min(x,y)
    let r = b
    let q = 0
    let s = 1
    let s_old = 0
    let t = 0
    let t_old = 1
    let tmp = 0
    let res = [
        [a,b,0,a,s_old,t_old],
        [a,b,q,r,s,t]
    ]
    while(b!=0){
        r = a % b
        q = (a-r) / b
        tmp = s
        s = s_old-q*s
        s_old = tmp
        tmp = t
        t = t_old-q*t
        t_old = tmp
        res.push([a,b,q,r,s,t])
        a = b
        b = r
    }
    return res
}
const table_entries = computed(() => {
    return eea_list(x,y)
})

const MathEnv = () => <div class="katex-env" ref={(me) => {
    if(me==null) return;
    effect(() => katex.render(equation.value,me,{output: "mathml"}))
}} />
const parenthesize = (val) => val < 0 ? "(" + val + ")" : val
const equation = computed(() => {
    if(curr.value==null) return("") 
    let [a,b,q,r,s,t] = table_entries.value[curr]
    return(`${x.value} \\cdot ${parenthesize(t)}+${y.value} \\cdot ${parenthesize(s)}=${r}`)
})

function NumberIn(props) {

    const onInput = event => (props.sig.value = event.target.value);

    return (
        <div class="input">
        <label>
        {`${props.name}: `}
        <input value={props.sig.value} onInput={onInput} />
        </label>
        </div>
    );
}
function Table(props) {
    return(
        <>
        <table onMouseleave={() => curr.value=null}>
        <tr>
        <th>i</th>
        <th>a</th>
        <th>b</th>
        <th>q</th>
        <th>r</th>
        <th>s</th>
        <th>t</th>
        </tr>
        {table_entries.value.map((xs,i) =>
            <tr onMouseenter={() => curr.value=i}>
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
        <h1>Extended Euklidean Algorithm</h1>
        <p>This is the headline</p>
        </div>
        <div class="inputs">
        <p>Inputs go in here</p>
        <NumberIn sig={x} name="x"/>
        <NumberIn sig={y} name="y"/>
        </div>
        <div class="table">
        <Table />
        </div>
        <div class="viz">
        <link
          rel="stylesheet"
          href="https://fred-wang.github.io/MathFonts/STIX/mathfonts.css" />
        <p><MathEnv /></p>
        </div>
        </div>
    );
}
