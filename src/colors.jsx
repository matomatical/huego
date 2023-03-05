const DEFAULT_COLORS = [
    "#ffffff",
    "#2ec1f8",
    "#f2e98b",
]


function App() {
    const [ colors, setColors ] = React.useState(DEFAULT_COLORS);
    return (<>
            <h2>HueGo Weaving</h2>
            <ColorController colors={colors} setColors={setColors} />
            <WeavingTable colors={colors} />
    </>);
}


function ColorController({ colors, setColors }) {
    return (<>
        <h3>Choose your colours</h3>
        <div className="color-picker-container">
            <button
                className="color-picker"
                onClick={arrayStateExtendByN(setColors,1,colors[colors.length-1])}
            >
                Add another colour
            </button>
            {colors.map((c, i) =>
                <ColorPicker key={i}
                    color={c}
                    index={i}
                    updater={arrayStateSetterI(setColors, i)}
                />
            )}
        </div>
    </>);
}


function ColorPicker({ color, index, updater }) {
    return (<div className="color-picker" style={{backgroundColor: color}}>
        Colour {index}
        <br/>
        <input type="color" value={color}
            onInput={e => updater(e.target.value)}
        />
    </div>);
}


function WeavingTable({ colors }) {
    const [ rows, setRows ] = React.useState(Array(16).fill(0));
    const [ cols, setCols ] = React.useState(Array(16).fill(0));
    const [ grid, setGrid ] = React.useState(false);
    return (<>
        <h3>Create your weave</h3>
        <p>
            Columns:
            &nbsp;
            <button onClick={arrayStateTruncateByN(setCols,4)}>-4</button>
            <button onClick={arrayStateTruncateByN(setCols,1)}>-1</button>
            <button onClick={arrayStateExtendByN(setCols,1,0)}>+1</button>
            <button onClick={arrayStateExtendByN(setCols,4,0)}>+4</button>
            &nbsp;
            Rows:
            &nbsp;
            <button onClick={arrayStateTruncateByN(setRows,4)}>-4</button>
            <button onClick={arrayStateTruncateByN(setRows,1)}>-1</button>
            <button onClick={arrayStateExtendByN(setRows,1,0)}>+1</button>
            <button onClick={arrayStateExtendByN(setRows,4,0)}>+4</button>
            &nbsp;
            grid lines:
            &nbsp;
            <button onClick={() => {setGrid(!grid)}}>on/off</button>
        </p>
        <table style={{borderSpacing: "0px"}}>
            <tbody>{rows.map(
                (r, i) => (<tr key={i}>
                    {cols.map((c, j) =>
                        <ColorSquare key={j}
                            border={grid}
                            rowColor={colors[r]}
                            colColor={colors[c]}
                        />
                    )}
                    <td>
                        <RowHeader key={i}
                            row={r}
                            index={i}
                            colors={colors}
                            updater={arrayStateSetterI(setRows, i)}
                        />
                    </td>
                </tr>)
            )}</tbody>
            <tfoot><tr>
                {cols.map((c,i) => <td key={i}>
                    <ColumnHeader
                        column={c}
                        index={i}
                        colors={colors}
                        updater={arrayStateSetterI(setCols, i)}
                    />
                </td>)}
                <td>{/* blank corner cell */}</td>
            </tr></tfoot>
        </table>
    </>);
}


function ColorSquare({colColor, rowColor, border}) {
    tdStyle = {
        border: (border ? "1px solid black" : "none"),
    }
    return (<td className="color-cell" style={tdStyle}>
        <div style={{height: "100%", width: "100%" }} className="grid-v">
            <div className="grid-h" style={{flexGrow: 1}}>
                <Cell color={rowColor}/>
                <Cell color={colColor}/>
            </div>
            <div className="grid-h" style={{flexGrow: 1}}>
                <Cell color={colColor}/>
                <Cell color={rowColor}/>
            </div>
        </div>
    </td>);
}


function Cell({ color }) {
    return (<div style={{backgroundColor: color, flexGrow: 1}}></div>);
}


function ColumnHeader({ column, index, colors, updater }) {
    let name = "column" + index;
    return (<div className="column-header-container">
        {colors.map((color, i) => 
            <ColorSelector key={i}
                color={color}
                name={name}
                value={i}
                checked={i == column}
                updater={updater}
                wide={true}
            />
        )}
    </div>);
}


function RowHeader({ row, index, colors, updater }) {
    let name = "row" + index;
    return (<div className="row-header-container">
        {colors.map((color, i) => 
            <ColorSelector key={i}
                color={color}
                name={name}
                value={i}
                updater={updater}
                checked={i == row}
                wide={false}
            />
        )}
    </div>)
}


function ColorSelector({ color, updater, name, value, wide, checked }) {
    function drag(event) {
        if (event.buttons % 2 == 1) {
            updater(event.target.value);
        }
    }
    return (<input type="radio"
        name={name}
        value={value}
        checked={checked}
        className={"radio " + (wide ? "wide" : "tall")}
        onChange={e => updater(e.target.value)}
        onMouseEnter={drag}
        onMouseLeave={drag}
        style={{backgroundColor: color}}
    />);
}


/* HELPER FUNCTIONS */

const arrayStateSetterI = (setArray, index) => (item) => {
    setArray(array => {
        newArray = [...array];
        newArray[index] = item;
        return newArray;
    });
}

function arrayStateExtendByN(setArray, n, defaultValue) {
    return () => setArray(array => [...array, ...Array(n).fill(defaultValue)]);
}

function arrayStateTruncateByN(setArray, n) {
    // assume n > 0
    return () => setArray(array => array.slice(0, -n));
}


/* HAND OFF TO REACT */

const rootNode = document.getElementById('react-root');
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(App));
