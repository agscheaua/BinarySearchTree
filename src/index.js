import './styles.css'

export {mergeSort};

class Node {
  constructor(value) {
    this.value = value;
    this.leftNode;
    this.rightNode;
  };
};

class Tree {
  constructor(){
    this.root;
  };

  #buildTree(arr) {
    console.log(arr);
  };
};


const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const mySet = new Set(arr);
const arrWithoutDuplicates = Array.from(mySet.values());
console.log(arrWithoutDuplicates);

const mergeSort = function(arr) {
  if (!(Array.isArray(arr))) throw new Error("The argument is not an array.");
  if (arr.length === 0) return [];
  if (arr.length === 1) return arr;
  if (arr.length > 1) {
    const middleOfArr = Math.floor(arr.length / 2);
    let tempSortResultOfCurrIteration = [];

    const leftHalfOfArr = arr.slice(0, middleOfArr);
    const rightHalfOfArr = arr.slice(middleOfArr);

    const mergeSortLeftHalfOfArr = mergeSort(leftHalfOfArr);
    const mergeSortRightHalfOfArr = mergeSort(rightHalfOfArr);

    for (let i = 0, j = 0; i < mergeSortLeftHalfOfArr.length &&
         j < mergeSortRightHalfOfArr.length;) {
      if (mergeSortLeftHalfOfArr[i] < mergeSortRightHalfOfArr[j]) {
        tempSortResultOfCurrIteration.push(mergeSortLeftHalfOfArr[i]);
        i++;
      };
      if (mergeSortLeftHalfOfArr[i] > mergeSortRightHalfOfArr[j]) {
        tempSortResultOfCurrIteration.push(mergeSortRightHalfOfArr[j]);
        j++;
      };
      if (i === mergeSortLeftHalfOfArr.length) {
        for (;j < mergeSortRightHalfOfArr.length; j++) {
          tempSortResultOfCurrIteration.push(mergeSortRightHalfOfArr[j])
        };
        break;
      };
      if (j === mergeSortRightHalfOfArr.length) {
        for (;i < mergeSortLeftHalfOfArr.length; i++) {
          tempSortResultOfCurrIteration.push(mergeSortLeftHalfOfArr[i]);
        };
        break;
      };
    };
    return tempSortResultOfCurrIteration;
  };

};
const sortedArr = mergeSort(arrWithoutDuplicates);
console.log(sortedArr);











/*
let resultArray = [];
const mergeSort = function(arr) {
  if (!(Array.isArray(arr))) throw new Error("The argument is not an array.");
  if (arr.length === 0) return [];
  if (arr.length === 1) return arr;
  if (arr.length > 1) {
    let middleOfArray = Math.floor(arr.length / 2);

    const leftHalf = arr.slice(0,middleOfArray);
    const rightHalf = arr.slice(middleOfArray, arr.length);

    const firstNum = mergeSort(leftHalf);
    const secondNum = mergeSort(rightHalf);  

    if (resultArray[0] === undefined) {
      if (firstNum[0] < secondNum[0]) {
        resultArray.push(firstNum[0]);
        resultArray.push(secondNum[0]);
      } else {
        resultArray.push(secondNum[0]);
        resultArray.push(firstNum[0]);
      };
      return resultArray;
    };
  
    let sortingArray = [];
    if (resultArray[0] !== undefined) {
      let i = 0;
      let j = 0;
      for (;i < firstNum.length, j < secondNum.length;) {
        if (firstNum[i] > secondNum[j]) {
          sortingArray.push(secondNum[j]);
          j++;
        } else if (firstNum[i] < secondNum[j]) {
          sortingArray.push(firstNum[i]);
          i++;
        } else if (firstNum[i] === secondNum[j]) {
          sortingArray.push(firstNum[i]);
          sortingArray.push(secondNum[j]);
          i++;
          j++;
        };
        
        if (i === firstNum.length) {
          for (let k = j; k < secondNum.length; k++) {
            sortingArray.push(secondNum[k]);
          };
          resultArray = sortingArray;
          return resultArray;
        };
        if (j === secondNum.length) {
          for (let k = i; k < firstNum.length; k++) {
            sortingArray.push(firstNum[k]);
          };
          resultArray = sortingArray;
          return resultArray;
        };
      };
    };
  };
};
console.log(mergeSort(arr));
*/