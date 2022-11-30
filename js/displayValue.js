export default function displayValue(amount, type) {
  if(amount > 1000000){
    if(type == "g"){
      return (amount/1000/1000).toFixed(2) + " Tonnes";
    }
    return (amount/1000/1000).toFixed(2) + " M" + type;
  }else if(amount > 1000){
    return (amount/1000).toFixed(1) + " K" + type;
  }else if(amount < 1){
    return (amount*1000).toFixed(2) + " m" + type;
  }else{
    return (amount).toFixed(2) + " " + type;
  }
}
