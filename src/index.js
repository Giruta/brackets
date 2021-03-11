module.exports = function check(str, bracketsConfig) {
  const open = [], close=[], tempArr=[];
  let lastEl;
  let count=0;

  bracketsConfig.forEach(item=>{
    const brackets = item.join();
    open.push(brackets[0]);
    close.push(brackets[2]);
  })

  for (let i = 0; i < str.length; i++) {
    if (open.includes(str[i]) && close.includes(str[i]) && count%2 === 0) {
      tempArr.push(str[i]);
      count = count + 1;
    } else if (open.includes(str[i]) && close.includes(str[i]) && count%2 === 1 && tempArr.length) {
      lastEl = tempArr[tempArr.length - 1];
      if (lastEl === str[i]) {
        tempArr.pop();
        count = count - 1;
      }
    } else if (open.includes(str[i])) {
      tempArr.push(str[i]);
    } else if (close.includes(str[i])) {
      if (tempArr.length) {
        lastEl = tempArr[tempArr.length - 1];
        open.forEach((item, ind) => {
          if (lastEl===item && str[i] === close[ind]) {
            tempArr.pop();
          }
        })
      } else return false;
    }
  }
  return (!tempArr.length) ? true : false;
}
