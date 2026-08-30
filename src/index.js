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

  // delete a node in the tree recursively

  deleteItem(value) {
    if (this.includes(value) === false) return;

    let tempParentOfRootNode;
    let tempRootNodeOfValSearched = this.root;

    function findNodeAndParentOfNodeToBeDeleted(root) {
      if (root.value !== value) {
        if (root.value > value) {
          tempParentOfRootNode = root; 
          tempRootNodeOfValSearched = root.leftNode;
          return findNodeAndParentOfNodeToBeDeleted(root.leftNode);
        } else {
          tempParentOfRootNode = root; 
          tempRootNodeOfValSearched = root.rightNode;
          return findNodeAndParentOfNodeToBeDeleted(root.rightNode);
        };
      };
    };
    findNodeAndParentOfNodeToBeDeleted(this.root);

    function deleteNodeInTree(rootVal = tempRootNodeOfValSearched.value) {
      if (tempRootNodeOfValSearched.leftNode === null &&
          tempRootNodeOfValSearched.rightNode === null) {
        if (tempParentOfRootNode.leftNode.value === rootVal) {
          tempParentOfRootNode.leftNode = null;
          return;
        };
        if (tempParentOfRootNode.rightNode.value === rootVal) {
          tempParentOfRootNode.rightNode = null;
          return;
        };
      };

      if ((tempRootNodeOfValSearched.leftNode !== null &&
          tempRootNodeOfValSearched.rightNode === null) ||
          (tempRootNodeOfValSearched.leftNode === null &&
          tempRootNodeOfValSearched.rightNode !== null)) {

        if (tempParentOfRootNode.leftNode.value === rootVal) {
          let newNodeToInsert;
          if (tempRootNodeOfValSearched.leftNode === null) {
            newNodeToInsert = tempRootNodeOfValSearched.rightNode; 
          };
          if (tempRootNodeOfValSearched.rightNode === null) {
            newNodeToInsert = tempRootNodeOfValSearched.leftNode;
          };
          tempParentOfRootNode.leftNode = newNodeToInsert;
          return;
        };

        if (tempParentOfRootNode.rightNode.value === rootVal) {
          let newNodeToInsert;
          if (tempRootNodeOfValSearched.leftNode === null) {
            newNodeToInsert = tempRootNodeOfValSearched.rightNode; 
          };
          if (tempRootNodeOfValSearched.rightNode === null) {
            newNodeToInsert = tempRootNodeOfValSearched.leftNode;
          };
          tempParentOfRootNode.rightNode = newNodeToInsert;
          return;
        };
      };

      if (tempRootNodeOfValSearched.leftNode !== null &&
         tempRootNodeOfValSearched.rightNode !== null) {

        let OLDTempParentOfRootNode = tempParentOfRootNode;
        let OLDTempRootNodeOfValSearched = tempRootNodeOfValSearched;

        let parentOfSuccesorOfValSearchToDel;
        let successorOfValSearchToDel = tempRootNodeOfValSearched;
        for (let i = 0;; i++) {
          if (i === 0) {
            parentOfSuccesorOfValSearchToDel = successorOfValSearchToDel;
            successorOfValSearchToDel = successorOfValSearchToDel.rightNode;
            continue; 
          };
          if (i > 0) {
            if (successorOfValSearchToDel.leftNode !== null) {
              parentOfSuccesorOfValSearchToDel = successorOfValSearchToDel;
              successorOfValSearchToDel = successorOfValSearchToDel.leftNode;
              continue;
            };
            if (successorOfValSearchToDel.leftNode === null) break;
          };
        };

        tempParentOfRootNode = parentOfSuccesorOfValSearchToDel;
        tempRootNodeOfValSearched = successorOfValSearchToDel;

        deleteNodeInTree();

        tempRootNodeOfValSearched.leftNode = OLDTempRootNodeOfValSearched.leftNode;
        tempRootNodeOfValSearched.rightNode = OLDTempRootNodeOfValSearched.rightNode; 

        if (OLDTempParentOfRootNode.leftNode.value === OLDTempRootNodeOfValSearched.value) {
          OLDTempParentOfRootNode.leftNode = tempRootNodeOfValSearched;
        };
        if (OLDTempParentOfRootNode.rightNode.value === OLDTempRootNodeOfValSearched.value) {
          OLDTempParentOfRootNode.rightNode = tempRootNodeOfValSearched;
        };


        console.log(OLDTempParentOfRootNode);
        console.log(OLDTempRootNodeOfValSearched);


      };


    };
    deleteNodeInTree();


    console.log(tempParentOfRootNode);
    console.log(tempRootNodeOfValSearched);
  };

};

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const myTree = new Tree(arr);

console.log(myTree.root);
//console.log(myTree.includes(1));
console.log(myTree.insertRecursively(325));
//console.log(myTree.insertIteratively(22));
console.log(myTree.deleteItem(67));