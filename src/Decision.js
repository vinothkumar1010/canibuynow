function Decision(props)
{
    const generateColumns=(combinedValues)=>{
        let columns=[]
        if(combinedValue.fcfBreakDown.length===combinedValue.pvValue.length)
        {
            let numberofRows=combinedValue.fcfBreakDown.length;
            for(let i=1;i<=numberofRows;i++)
            {
                columns.push(<tr><td>{i}</td>
                          <td>{Math.round(combinedValue.fcfBreakDown[i-1])}</td>
                          <td>{Math.round(combinedValue.pvValue[i-1])}</td></tr>)
            }
            columns.push(<tr><td>{numberofRows}</td>
                <td>{Math.round(props.data.tenthYearFCF)}</td>
                <td>{Math.round(props.data.tenthYearPV)}</td></tr>)
        }
        return columns;

    }
    console.log("Gonna render decision")
    console.log(props.data)
    let combinedValue=Object.assign({},{"fcfBreakDown":props.data.fcfEachyear,"pvValue":props.data.pvEachYear})
    console.log(combinedValue)
    return <div id="Decision">
        <table>
            <thead>
                <tr>
                    <th>Year</th>
                    <th>FCF</th>
                    <th>PV</th>
                </tr>
            </thead>
            <tbody>
                {generateColumns(combinedValue)}
            </tbody>
        </table>
       
    </div>
}
export default Decision;