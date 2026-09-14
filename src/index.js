//import './styles.css'


// class use to create instances of different root nodes and their left and right sub-trees;

class Node {
  constructor(value = null, leftNode = null, rightNode = null) {
    this.value = value;
    this.leftNode = leftNode;
    this.rightNode = rightNode;
  };
};

// class used to construct the BBST, it is initialzed with an array argument;

class Tree {
  constructor(arr) {
    this.root = this.#buildTree(Tree.sortTheArr(Tree.removeDuplicatesFromArr(arr)));
  };

  // removes any duplicates from the array given as an argument;

  static removeDuplicatesFromArr(arr) {
    if (!(Array.isArray(arr))) throw new Error("The argument is not an array.");
    const mySet = new Set(arr);
    const arrWithoutDuplicates = Array.from(mySet.values());
    return arrWithoutDuplicates;
  }

  // sort the array given as an argument;

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

  // build the tree from the array given as a argument to the Tree class;
  // this function is invoked every time a new instances of the Tree class is created;

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

  // check if the inserted argument is a integer;

  static checkIfNumIsInteger(num) {
    if (!(Number.isInteger(num))) throw new Error("The argument is not an integer.");
  }

  // check if a value exist in the tree;

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

  // insert a new node in the tree recursively;

  insertRecursively(value) {
    Tree.checkIfNumIsInteger(value);
    if (this.includes(value) === true) return;

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

  // insert a new node in the tree iteratively;

  insertIteratively(value) {
    Tree.checkIfNumIsInteger(value);
    if (this.includes(value) === true) return;

    let tempRoot = this.root;

    while(tempRoot !== null) {
      if (tempRoot.value > value) {
        if (tempRoot.leftNode === null) {
          tempRoot.leftNode = new Node(value);
          break;
        };
        tempRoot = tempRoot.leftNode;
        continue;
      };
      if (tempRoot.value < value) {
        if (tempRoot.rightNode === null) {
          tempRoot.rightNode = new Node(value);
          break;
        };
        tempRoot = tempRoot.rightNode;
        continue;
      };
    };
    
    return this.root;
  };

  // delete a node in the tree, based on how many sub-trees it has;

  deleteItem(value, node) {
    if (node === null) return null;

    if (value < node.value) {
      node.leftNode = this.deleteItem(value, node.leftNode);
    } else if (value > node.value) {
      node.rightNode = this.deleteItem(value, node.rightNode);

    } else if (value === node.value) {
        if (node.leftNode === null &&
            node.rightNode === null) {
          if (this.root.value === value) {
            return this.root = null;
          };

          return null;
        } else if ((node.leftNode === null && node.rightNode !== null) ||
                  (node.leftNode !== null && node.rightNode === null)) {
            if (this.root.value === value) {
              if (this.root.leftNode) {
                return this.root = this.root.leftNode;
              } else {
                return this.root = this.root.rightNode
              };
            };

            if (node.leftNode !== null) {
              return node.leftNode;
            } else {
              return node.rightNode;
            };
        } else if (node.leftNode !== null && node.rightNode !== null) {

            let nodesSuccessor = node;
            let i = 0;
            while(nodesSuccessor !== null) {
              if (i === 0) {
                nodesSuccessor = nodesSuccessor.rightNode;
                i++
                if (nodesSuccessor.leftNode === null) break;
              } else {
                nodesSuccessor = nodesSuccessor.leftNode;
                if (nodesSuccessor.leftNode === null) break;
              };
            };

            this.deleteItem(nodesSuccessor.value, node);

            nodesSuccessor.leftNode = node.leftNode;
            nodesSuccessor.rightNode = node.rightNode;

            node.leftNode = null;
            node.rightNode = null;

            if (this.root.value === value) return this.root = nodesSuccessor;

            return nodesSuccessor;
        };
    };
    return node;
  };

  // travers the tree in breadth-first level and call the callBack function;
  // argument on each value;

  levelOrderForEach(callBack) {
    if (typeof callBack !== "function") throw new Error("The callback must be a function.");

    let root = this.root;

    if (this.root === null) throw new Error("The tree is empty");

    let valuesNodes = [];
    valuesNodes.push(root);

    while (valuesNodes.length !== 0) {
      callBack(valuesNodes[0].value);
  
      if (valuesNodes[0].leftNode !== null) {
        valuesNodes.push(valuesNodes[0].leftNode);
      };  
      if (valuesNodes[0].rightNode !== null) {
        valuesNodes.push(valuesNodes[0].rightNode);
      };

      valuesNodes.shift();
    };
  };

  // travers the tree in breadth-first level and call the callBack function;
  // argument on each value; (level order traversal iteratively)

  levelOrderForEachRecur(callBack) {
    if (typeof callBack !== "function") throw new Error("The callback must be a function.");
    let root = this.root;
    if (this.root === null) throw new Error("The tree is empty");

    let valuesNodes = [];
    valuesNodes.push(root);

    function runCallBackForEachVal() {
      if (valuesNodes.length === 0) return;

      callBack(valuesNodes[0].value);

      if (valuesNodes[0].leftNode !== null) {
        valuesNodes.push(valuesNodes[0].leftNode);
      };  
      if (valuesNodes[0].rightNode !== null) {
        valuesNodes.push(valuesNodes[0].rightNode);
      };

      valuesNodes.shift();
      return runCallBackForEachVal();
    };
    runCallBackForEachVal();
  };

  // travers the tree in breadth-first level and call the callBack function;
  // argument on each value; 7

  inOrderForEach(callBack) {
    function inOrderTraversalTree(root) {
      if (root === null) return;

      inOrderTraversalTree(root.leftNode);
      callBack(root.value);
      inOrderTraversalTree(root.rightNode);
    };
    inOrderTraversalTree(this.root);
  };

  preOrderForEach(callBack) {
    function preOrderTraversalTree(root) {
      if (root === null) return;

      callBack(root.value);
      preOrderTraversalTree(root.leftNode);
      preOrderTraversalTree(root.rightNode);
    };
    preOrderTraversalTree(this.root);
  };

  postOrderForEach(callBack) {
    function postOrderTraversalTree(root) {
      if (root === null) return;

      postOrderTraversalTree(root.leftNode);
      postOrderTraversalTree(root.rightNode);
      callBack(root.value);
    };
    postOrderTraversalTree(this.root);
  };

  height(value) {
    if (this.includes(value) === false) return undefined;

    let root = this.root;

    while (root.value !== value) {
      if (root.value > value) {
        root = root.leftNode;
      } else if (root.value < value) {
        root = root.rightNode;
      };
    }; 

     function maxNr(val1, val2) {
      if (val1 > val2) {
        return val1;
      } else {
        return val2;
      };
    };

    function getHeightNode(root) {
      if (root === null) return -1;
    
      const leftSubtreeHeight = getHeightNode(root.leftNode);
      const rightSubtreeHeight = getHeightNode(root.rightNode);

      return maxNr(leftSubtreeHeight, rightSubtreeHeight) + 1;
    };
    return getHeightNode(root);
  };




};

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
//const arr = [10, 5, 20];

const myTree = new Tree(arr);

//myTree.includes(1);
//myTree.insertRecursively(325);
//myTree.insertIteratively(22);
//myTree.deleteItem(15, myTree.root);
//myTree.levelOrderForEach(console.log);
//myTree.levelOrderForEachRecur(console.log);
//myTree.inOrderForEach(console.log);
//myTree.preOrderForEach(console.log);
//myTree.postOrderForEach(console.log);
console.log(myTree.height(8));

console.log(myTree);
