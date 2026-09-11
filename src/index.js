//import './styles.css'

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
    if (!(Array.isArray(arr))) throw new Error("The argument is not an array.");
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

  // check if the inserted argument is a integer

  static checkIfNumIsInteger(num) {
    if (!(Number.isInteger(num))) throw new Error("The argument is not an integer.");
  }

  // check if a value exist in the tree

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

  // insert a new node in the tree recursively

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

  // insert a new node in the tree iteratively

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

  // delete a node in the tree 

  deleteItem(value, node) {
    if (node === null) return null;

    if (value < node.value) {
      node.leftNode = this.deleteItem(value, node.leftNode);
    } else if (value > node.value) {
      node.rightNode = this.deleteItem(value, node.rightNode);

    } else if (value === node.value) {
        if (node.leftNode === null &&
            node.rightNode === null) {
          return null;
        } else if ((node.leftNode === null && node.rightNode !== null) ||
                  (node.leftNode !== null && node.rightNode === null)) {
          if (node.leftNode !== null) {
            return node.leftNode;
          } else {
            return node.rightNode;
          };
        } else if (node.leftNode !== null && node.rightNode !== null) {
          
          let root = node;
          let i = 0;
          while(root !== null) {
            if (i === 0) {
              root = root.rightNode;
              i++
              if (root.leftNode === null) break;
            } else {
              root = root.leftNode;
              if (root.leftNode === null) break;
            };
          };

          this.deleteItem(root.value, node);
          return node.value = root.value;
        };
    };


    return node;
  };

  deleteItemV2(value) {
    if (this.includes(value) === false) return;

    let parentOfNodeToBeDeleted = this.root;
    let nodeToBeDeleted = this.root;

    function searchForNodeThatWillBeDel(root, value) {
      if (root.value === value) {
        deleteNodeWhenNodeIsLeaf(root, value);
        deleteNodeWhenNodeHas1Child(root, value);
        delteNodeWhenNodeHas2TwoChild(root, value);
        return; 
      } else if (root.value > value) {
        parentOfNodeToBeDeleted = root;
        nodeToBeDeleted = root.leftNode;
        return searchForNodeThatWillBeDel(root.leftNode, value);
      } else if (root.value < value) {
        parentOfNodeToBeDeleted = root;
        nodeToBeDeleted = root.rightNode;
        return searchForNodeThatWillBeDel(root.rightNode, value);
      };
    };
    searchForNodeThatWillBeDel(this.root, value);
   
    function deleteNodeWhenNodeIsLeaf(root, value) {
      if (root.leftNode === null &&
          root.rightNode === null) {
        if (parentOfNodeToBeDeleted.leftNode.value === value) {
          parentOfNodeToBeDeleted.leftNode = null;
        } else {
          parentOfNodeToBeDeleted.rightNode = null;
        };
      } else {
        return;
      };
    };

    function deleteNodeWhenNodeHas1Child(root, value) {
      if ((root.leftNode === null && root.rightNode !== null) ||
          (root.leftNode !== null && root.rightNode === null)) {
        if (parentOfNodeToBeDeleted.leftNode.value === value) {
          if (nodeToBeDeleted.leftNode === null) {
            parentOfNodeToBeDeleted.leftNode = nodeToBeDeleted.rightNode;
          } else {
            parentOfNodeToBeDeleted.leftNode = nodeToBeDeleted.leftNode;
          };
        };
        if (parentOfNodeToBeDeleted.rightNode.value === value) {
          if (nodeToBeDeleted.leftNode === null) {
            parentOfNodeToBeDeleted.rightNode = nodeToBeDeleted.rightNode;
          } else {
            parentOfNodeToBeDeleted.rightNode = nodeToBeDeleted.leftNode;
          }; 
        };
      } else {
        return;
      };
    };

    function delteNodeWhenNodeHas2TwoChild(root, value) {
      if (root.leftNode !== null &&
          root.rightNode !== null) {

        const parentOftheSuccesorOfNodeToBeDeleted = findTheSuccesorOfNode(nodeToBeDeleted).parentOfTheSuccesor;    
        const theSuccesorOfNodeToBeDeleted = findTheSuccesorOfNode(nodeToBeDeleted).theSuccesor;
              
        let oldParentOfNodeToBeDeleted = parentOfNodeToBeDeleted;
        let oldNodeToBeDeleted = nodeToBeDeleted;

        parentOfNodeToBeDeleted = parentOftheSuccesorOfNodeToBeDeleted;
        nodeToBeDeleted = theSuccesorOfNodeToBeDeleted;

        searchForNodeThatWillBeDel(nodeToBeDeleted, nodeToBeDeleted.value);

        console.log(theSuccesorOfNodeToBeDeleted, parentOftheSuccesorOfNodeToBeDeleted);

        theSuccesorOfNodeToBeDeleted.leftNode = oldNodeToBeDeleted.leftNode;
        theSuccesorOfNodeToBeDeleted.rightNode = oldNodeToBeDeleted.rightNode;

        if (oldParentOfNodeToBeDeleted.leftNode.value === oldNodeToBeDeleted.value) {
          oldParentOfNodeToBeDeleted.leftNode = theSuccesorOfNodeToBeDeleted;
        } else {
          oldParentOfNodeToBeDeleted.rightNode = theSuccesorOfNodeToBeDeleted;
        }
        //
        
      } else {
        return;
      };
    };

    function findTheSuccesorOfNode(node) {
      let parentOfTheSuccesor = node;
      let theSuccesor = node;

      for (let i = 0;; i++) {
        if (i === 0) {
          parentOfTheSuccesor = theSuccesor;
          theSuccesor = theSuccesor.rightNode;
        };
        if (i > 0) {
          if (theSuccesor.leftNode === null) {
            break;
          }
          parentOfTheSuccesor = theSuccesor;
          theSuccesor = theSuccesor.leftNode;
        };
      };
      return {
        parentOfTheSuccesor,
        theSuccesor,
      };
    };



  };

};

//const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const arr = [10, 5, 20, 15, 21, 23, 29];

const myTree = new Tree(arr);

console.log(myTree.root);
//console.log(myTree.includes(1));
//console.log(myTree.insertRecursively(325));
//console.log(myTree.insertIteratively(22));
//console.log(myTree.deleteItem(20));
myTree.deleteItem(21, myTree.root);
myTree.deleteItem(29, myTree.root);
myTree.deleteItem(20, myTree.root);
myTree.deleteItem(23, myTree.root);
console.log(myTree);