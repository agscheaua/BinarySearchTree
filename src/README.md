deleteItem(value, node) - public method {
arguments:
value - a value to be searched and then deleted, if the value does not exist it will return nothing.
node - a tree, where each node has a value propery, a leftNode property pointing at the left node or null, and a rightNode property pointing at the right node or null.

execution:
It recursively search the tree, comparing the value searched to the current node value, and based on values comparation it will search the left or right node, it will continue this procces till it find the value that needs to be deleted.
It will start from the root of the tree, then it will assign to its right or left subtree, the return of the execution of that node left or right subtree based on the value that node has in comparation to the value searched, and afterwords the whole subtree with its mofified changes.

We have A and we find that A.leftNode contain the value that we need to delete, we assing A.leftNode = the retunrn of the deleteItem(val, A.leftNode), the the A.leftNode will be modified, and afterword, as we have also call deleteItem(val, A), where A is left or right node to some other node, we return A, with is left subtree now modified, an so on till we reach the root of the whole tree. So we return the tree in the new form with the node deleted.
};

levelOrderForEach(callBack), levelOrderForEachRecur(callBack) {
argument:
callBack - a function UNINVOKED, without parantheses.

execution:
There are 2 variants for this method, iteratively and recursively, they conceptually do the same thing.
We create a empty array, and we will be using it as a queue, we take the first node and enqueue its value, we call the callBack function on it, then we enqueue its left and right node, after words we dequeue the first value, and repeat repeat the procces, we take the first value witch is the left node val of the last node that we dequeu, we run the callBack on its value we enqueue its left and right nodes (if it has), and we dequeu it, we then take the new first val witch is the right node of the first node that we dequeue, and this is in part the general ideea, code implementation can varry.
};

inOrderForEach(callBack), preOrderForEach(callBack), and postOrderForEach(callBack) {
arguments:
callBack - a function UNINVOKED, without parantheses.

execution:
inside each method is a function that travers the tree in the specified order in, pre, or post. We recursively travers the node, till we find a null node, after witch the recursion depth stops and revers to the top, reading each node and its subtree in its specified way in the algorith. Some nodes can be read as we travers the tree, as in preorder, where the root is read first before left and right subtrees.
};

height(value) {
argumet:
value - the value of the node to witch we need to get its height, or undefined.

execution:
It checks to see if any node in the tree contains the value search. It gets that node iteratively, traversing the tree till it finds it and assigne it to a variable. A node height is the longest path from that node till a leaf node. If a node has no subtrees, it return -1. EVERY SUBTREES OF A NODE, WILL END IN A LEAF NODE, EVEN IF THAT NODE OR ITS SUBTREES WILL NOT END IN A LEAF NODE, SOMEWHERE IT WILL. We check each node height and return it each node can be a left or right subtree of another node and so on, we take the biggest height of the two and we add 1 and we return the height of that node, node witch can be the left or right node of the node we need to finds it height.
}
