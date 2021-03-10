import {useReducer,useEffect} from "react"
import Decision from "./Decision"
const initialState = {
  fcfEachyear: [],
  tenthYearFCF: 0,
  futureCashFlow: null,
  marketCapCal:0
};

const reducer = (state, {type,value}) => {
  switch(type)
  {
    case "reset":
      return {...state,...initialState};
    case "updateFcfBreakDown":
        return  {...state, fcfEachyear:value };
    case "tenthYearFCF":
      return  {...state, tenthYearFCF:value };
    case "updateFutureCashFlow":
      return  {...state, futureCashFlow:value };
    case "updateMarketCap":
      return  {...state, marketCapCal:value };
    default:
        return state;  
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { fcfEachyear, tenthYearFCF, futureCashFlow,marketCapCal} = state;
  function updateSelectedValue(elem)
  {
      document.getElementById((elem.id)+"Selected").innerHTML=elem.value;
  }
    
  function calculateIntrinsic()
  {
    dispatch({ type: "reset" });
    
    let firstFiveGR=parseInt(document.getElementById("firstFiveYearGR").value)/100;
    let nextFiveYearGR=parseInt(document.getElementById("nextFiveYearGR").value)/100;
    let terminalValue=document.getElementById("terminalValue").value;
  //  let discountRate=parseInt(document.getElementById("discountValue").value)/100;
    let fcf=document.getElementById("freeCashflow").value;
   // let excessCapital=parseFloat(document.getElementById("excessCapital").value);
    
   CalculateFreeCashFlow(fcf,firstFiveGR,nextFiveYearGR,terminalValue)
  }
   const CalculateFreeCashFlow=async (fcf,firstFiveGR,nextFiveYearGR,terminalValue)=>
  {
    let nextCashFlow=parseFloat(fcf);
    let fcfYearBreakDown=[nextCashFlow];

    console.log(nextFiveYearGR)
    for(let i=2;i<=5;i++)
    {
      nextCashFlow=nextCashFlow+(nextCashFlow*firstFiveGR)
      console.log(Math.round(nextCashFlow)+ "   " + nextCashFlow)
      fcfYearBreakDown.push(nextCashFlow)
    }
    for(let i=6;i<=10;i++)
    {
      nextCashFlow=nextCashFlow+(nextCashFlow*nextFiveYearGR)
      console.log(Math.round(nextCashFlow)+ "   " + nextCashFlow)
      fcfYearBreakDown.push(nextCashFlow)
    }
    let TenthYearFCF=nextCashFlow*terminalValue;
    console.log(TenthYearFCF)
   dispatch(
     {
       type:"updateFcfBreakDown",
       value:fcfYearBreakDown
     })
     dispatch(
      {
        type:"tenthYearFCF",
        value:TenthYearFCF
      })
     
   return true;
  }
  useEffect(() => {
    let discountRate=parseInt(document.getElementById("discountValue").value)/100;

    if(fcfEachyear.length>0)
    calculatePresentValue(discountRate)
}, [fcfEachyear])
useEffect(()=>{
  let excessCapital=parseFloat(document.getElementById("excessCapital").value);
  if(futureCashFlow !== null)
    calculateIntrinsicValue(excessCapital).then(console.log("hai"));
},[futureCashFlow])
  const calculatePresentValue=async (discountRate)=>
  {
    console.log(fcfEachyear)
      let presentvalue=0
       fcfEachyear.forEach((value,index) => {
        presentvalue+=(value/Math.pow((1+discountRate),(index+1)));
      });
      let valueOfCompany=(tenthYearFCF/Math.pow((1+discountRate),10));
      let futureCashFlowValue=valueOfCompany+presentvalue;

      dispatch(
        {
          type:"updateFutureCashFlow",
          value:futureCashFlowValue
        })
      return true;
  }
  const calculateIntrinsicValue= async (excessCapital)=>
  {
    let calculatedMarketCap=excessCapital+futureCashFlow
    console.log("calculated Market Cap")
    console.log(calculatedMarketCap)
    dispatch(
      {
        type:"updateMarketCap",
        value:calculatedMarketCap
      })
    return true;
  } 
  return (
    <div className="App">
      <div>
        <label htmlFor="firstFiveYearGR">Growth Rate (yrs 1 -5)</label>
        <input type="text" id="firstFiveYearGR" name="firstFiveYearGR" />
      </div>
      <div>
        <label htmlFor="nextFiveYearGR">Growth rate (yrs 6 - 10)</label>
        <input type="text" id="nextFiveYearGR" name="nextFiveYearGR" />
      </div>
      <div>
        <label htmlFor="terminalValue">Terminal Value <span id="terminalValueSelected"></span></label>
        <input type="range" id="terminalValue" name="terminalValue" min="10" max="15" onChange={event => updateSelectedValue(event.target)}/>
      </div>
      <div>
        <label htmlFor="discountValue">Discount Rate<span id="discountValueSelected"></span></label>
        <input type="range" id="discountValue" name="discountValue" onChange={event => updateSelectedValue(event.target)} 
          min="0" max="100" value="10"/>
      </div>
      <div>
        <label htmlFor="freeCashFlow">Free Cash flow</label>
        <input type="text" id="freeCashflow" name="freeCashflow" />
      </div>
      <div>
        <label htmlFor="excessCapital">Excess Capital</label>
        <input type="text" id="excessCapital" name="excessCapital"  />
      </div>
      <div>
        <button id="canIBuyNow" name="canIBuyNow" onClick={calculateIntrinsic}>Can I buy now?</button>
      </div>
      <div>
        Calculated total Market cap is {marketCapCal}
      </div>
    </div>
  );
}

export default App;
