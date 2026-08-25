import './styles.css'

// class use to create instances of different root nodes and their
// left and right sub-trees

class Node {
  constructor(value = null, leftNode = null, rightNode = null) {
    this.value = value;
    this.leftNode = leftNode;
    this.rightNode = rightNode;
  };
};

// class used to construct the a BBST, it is initialzed with an array
// argument

class Tree {
  constructor(arr) {
    this.root = this.#buildTree(Tree.sortTheArr(Tree.removeDuplicatesFromArr(arr)));
  };

  // removes any duplicates from the array given as an argument

  static removeDuplicatesFromArr(arr) {
    const mySet = new Set(arr);
    const arrWithoutDuplicates = Array.from(mySet.values());
    return arrWithoutDuplicates;
  }

  // sort the array given as an argument

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

  // build the tree from the array given as a argument to the Tree class
  // this function is invoked every time a new instances of the Tree
  // class is created

  #buildTree(arr) {
    if (arr.length === 0) return null;
    if (arr.length === 1) return new Node(arr[0]);
    if (arr.length === 2) return new Node(arr[1], new Node(arr[0]));
    if (arr.length === 3) return new Node(arr[1], new Node(arr[0]), new Node(arr[2]));

    const middleOfArr = Math.floor(arr.length / 2);

    const leftHalfOfTheArr = arr.slice(0, middleOfArr);
    const rightHalfOfArr = arr.slice(middleOfArr + 1);

    return new Node(arr[middleOfArr], this.#buildTree(leftHalfOfTheArr), this.#buildTree(rightHalfOfArr));
  };

  static checkIfNumIsInteger(num) {
    if (!(Number.isInteger(num))) throw new Error("The argument is not an integer.");
  }

  includes(value) {
    Tree.checkIfNumIsInteger(value);

    function checkIfTreeIncludes(root) {
      if (root === null) return false;
      if (root.value === undefined) return false;
      if (root.value === value) return true;

      if (root.value > value) { 
        return checkIfTreeIncludes(root.leftNode);
      } else {
        return checkIfTreeIncludes(root.rightNode);
      };
    };

    return checkIfTreeIncludes(this.root);
  };

  insert(value) {
    Tree.checkIfNumIsInteger(value);

    function searchForPlaceToInsertNode(root) {
      if (root.leftNode === null && root.value > value) {
        root.leftNode = new Node(value);
        return;
      } else if (root.rightNode === null && root.value < value) {
        root.rightNode = new Node(value);
        return;
      }

      if (root.value > value) { 
        return searchForPlaceToInsertNode(root.leftNode);
      } else {
        return searchForPlaceToInsertNode(root.rightNode);
      };
    };

    return searchForPlaceToInsertNode(this.root);
  };

};

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const myTree = new Tree(arr);

console.log(myTree.root);
console.log(myTree.includes(1));
console.log(myTree.insert(22));
