function reverseStringConditionalInteger(str) {
    const matches = str.match(/^(\D+)(\d*)$/);
    const word = matches[1];
    const number = matches[2];
    
    let arr = word.split("");
    const reversedArr = arr.reverse();
    const reversedWord = reversedArr.join("");
    
    const reversedStr = reversedWord + number;
    return reversedStr;
  }
  
  const kata = "NEGIE1";
  const kataTerbalik = reverseStringConditionalInteger(kata);
  console.log(kataTerbalik);