import logo from './logo.svg';
import './App.css';
import React from "react";
import ReactDOM from "react-dom";


class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      input: "",
      decimalFlag: false,
      curr: "0",
      currNum: "",
      ans: 0,
      equalFlag: false
    }
    this.addToInput = this.addToInput.bind(this);
    this.calculate = this.calculate.bind(this);
  }
  calculate(input){
    var inputArr = input.split(/(?=[^0-9.])/);
    console.log(inputArr);
    var newArr = [];
    inputArr.map(val=>{
      if(val.charAt(0) === "*" || val.charAt(0) === "/"){
        newArr.push(val.charAt(0));
        newArr.push(parseFloat(val.substring(1,val.length)));
      }else{
        newArr.push(parseFloat(val));
      }
    })

   for( var i = 0; i < newArr.length; i++){ // follows BODMAS so first division is dchecked and one
       if ( newArr[i] === "/") {
          newArr[i-1] = newArr[i-1]/newArr[i+1];
           newArr.splice(i, 2);
       }
   }for( var i = 0; i < newArr.length; i++){ //then followed by multiplication
       if( newArr[i] === "*") {
          newArr[i-1] = newArr[i-1]*newArr[i+1];
           newArr.splice(i, 2);
       }
   }
   var ans = newArr.reduce((sum,val)=>{
     return sum+val;
   })
    console.log(newArr);
    console.log(ans+" ans");
    return ans;
  }

  addToInput(event){
    var input = "";
    var curr = "";
    var decimalFlag = this.state.decimalFlag;
    var currNum = "";
    var ans = 0;
    var regex = /[^0-9.]/;
    var equalFlag = this.state.equalFlag;
    if(!equalFlag){
      if(event.target.value !== "=" && event.target.value !== "ac"){  //checks for input other than = & AC
        if(regex.test(event.target.value)){  //if operator is selected then curr is just operator
          curr = event.target.value;
          decimalFlag = false;
        }else{ // when numbers are selected it concats to previous input numbers to form currNum
          if(!decimalFlag || (decimalFlag && event.target.value !== ".")){ //checks for decimals
            currNum = this.state.currNum+event.target.value;
          }else{ //comes here if already one decimal is present in currNum
            currNum = this.state.currNum;
          }
          curr = currNum;
        }
        if(this.state.input.length ==1 && this.state.curr === "0"){ //makes sure only 1 zero is entered in the beginning of number
          input = event.target.value;
        }else if(regex.test(event.target.value) && regex.test(this.state.curr)){ //checks if 2 operators are selected simultaneously
          if(this.state.curr === "-"){
            input = this.state.input.substring(0,this.state.input.length-2)+event.target.value;
          }else if(event.target.value!== "-"){
            input = this.state.input.substring(0,this.state.input.length-1)+event.target.value;
          }else{
            input = this.state.input.substring(0,this.state.input.length)+event.target.value;
          }
        }else{
          input = this.state.input+event.target.value;
          if(event.target.value === "."){
            if(!decimalFlag){
              decimalFlag = true;
            }else{
              input = this.state.input;
              curr = currNum;
            }
          }
        }
      }else if(event.target.value === "ac"){
        input = "";
        curr = "0";
        decimalFlag = false;
      }else if(event.target.value === "="){
        ans = this.calculate(this.state.input);
        input = this.state.input+"="+ans;
        curr = ans;
        equalFlag = true;
        decimalFlag = false;
      }
    }else{ //when = is selected, it cleans all the state parameters and sets new values
      curr = "0";
      if(event.target.value !== "ac"){
        input = this.state.ans+event.target.value;
        curr = event.target.value;
        console.log("here for anseerfjlka");
      }
      equalFlag = false;
    }
    this.setState(()=>({
      input: input,
      curr: curr,
      ans: ans,
      currNum: currNum,
      equalFlag: equalFlag,
      decimalFlag: decimalFlag
    }))

  }
  render(){
    return (
      <div className="App">
        <div id="calculator">
          <div id="display">
            <div id="displayExpression" dangerouslySetInnerHTML={{__html:this.state.input}}>
            </div>
            <div id="displayInput" dangerouslySetInnerHTML={{__html:this.state.curr}}>
            </div>
          </div>
          <div className="keys">
            <button type="button" onClick={this.addToInput} value = "ac" className="btn btn-default" id="clear">AC</button>
            <button type="button" onClick={this.addToInput} value = "/" className="operator btn btn-default" id="divide">/</button>
            <button type="button" onClick={this.addToInput} value = "*" className="operator btn btn-default" id="multiply">x</button>
            <button type="button" onClick={this.addToInput} value = "7" className="btn btn-default" id="seven">7</button>
            <button type="button" onClick={this.addToInput} value = "8" className="btn btn-default" id="eight">8</button>
            <button type="button" onClick={this.addToInput} value = "9" className="btn btn-default" id="nine">9</button>
            <button type="button" onClick={this.addToInput} value = "-" className="operator btn btn-default" id="subtract">-</button>
            <button type="button" onClick={this.addToInput} value = "4" className="btn btn-default" id="four">4</button>
            <button type="button" onClick={this.addToInput} value = "5" className="btn btn-default" id="five">5</button>
            <button type="button" onClick={this.addToInput} value = "6" className="btn btn-default" id="six">6</button>
            <button type="button" onClick={this.addToInput} value = "+" className="operator btn btn-default" id="add">+</button>
            <button type="button" onClick={this.addToInput} value = "1" className="btn btn-default" id="one">1</button>
            <button type="button" onClick={this.addToInput} value = "2" className="btn btn-default" id="two">2</button>
            <button type="button" onClick={this.addToInput} value = "3" className="btn btn-default" id="three">3</button>
            <button type="button" onClick={this.addToInput} value = "=" className="btn btn-default" id="equal">=</button>
            <button type="button" onClick={this.addToInput} value = "0" className="btn btn-default" id="zero">0</button>
            <button type="button" onClick={this.addToInput} value = "." className="btn btn-default" id="decimal">.</button>
          </div>
          <p id="author">Designed and coded by<br />
          Madhurima Peram</p>
        </div>

      </div>
    )
  }
}

export default App;
