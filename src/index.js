import './styles.css'

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

class Node {
  constructor(rootNode = null, leftNode = null, rightNode = null) {
    this.rootNode = rootNode;
    this.leftNode = leftNode;
    this.rightNode = rightNode;
  };
};

class Tree {
  constructor(arr) {
    this.root = this.buildTree(Tree.sortTheArr(Tree.removeDuplicatesFromArr(arr)));
  };

  static removeDuplicatesFromArr(arr) {
    const mySet = new Set(arr);
    const arrWithoutDuplicates = Array.from(mySet.values());
    return arrWithoutDuplicates;
  }

  static sortTheArr(arr) {
    if (!(Array.isArray(arr))) throw new Error("The argument is not an array.");
    if (arr.length === 0) return [];
    if (arr.length === 1) return arr;
    if (arr.length > 1) {
      const middleOfArr = Math.floor(arr.length / 2);
    
      const leftHalfOfArr = arr.slice(0, middleOfArr);
      const rightHalfOfArr = arr.slice(middleOfArr);

      const mergeSortLeftHalfOfArr = Tree.sortTheArr(leftHalfOfArr);
      const mergeSortRightHalfOfArr = Tree.sortTheArr(rightHalfOfArr);

      let tempSortResultOfCurrIteration = [];
      for (let i = 0, j = 0; i < mergeSortLeftHalfOfArr.length &&
          j < mergeSortRightHalfOfArr.length;) {
        if (mergeSortLeftHalfOfArr[i] < mergeSortRightHalfOfArr[j]) {
          tempSortResultOfCurrIteration.push(mergeSortLeftHalfOfArr[i]);
          i++;
        } else {
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

  buildTree(arr) {
    if (arr.length === 0) return new Node(arr);
    if (arr.length === 1) return new Node(arr);
    if (arr.length === 2) return new Node(arr[1], arr[0]);
    if (arr.length === 3) return new Node(arr[1], arr[0], arr[2]);

    const middleOfArr = Math.floor(arr.length / 2);

    const leftHalfOfTheArr = arr.slice(0, middleOfArr);
    const rightHalfOfArr = arr.slice(middleOfArr + 1);

    return new Node(arr[middleOfArr], this.buildTree(leftHalfOfTheArr), this.buildTree(rightHalfOfArr));
  };
};

const myTree = new Tree(arr);
const treeRoot = (myTree.root);
console.log(treeRoot);

/*
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
      } else {
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

*/
