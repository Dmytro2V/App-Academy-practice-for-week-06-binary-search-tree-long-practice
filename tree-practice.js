const { BinarySearchTree, TreeNode } = require('./binary-search-tree.js');
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees


 // for check - Initialize Binary Search Trees


  //      4
  //    /   \
  //   2     6
  //  / \   / \
  // 1   3 5   7
  bstRoot = new TreeNode(4);
  bstRoot.left = new TreeNode(2);
  bstRoot.left.left = new TreeNode(1);
  bstRoot.left.right = new TreeNode(3);
  bstRoot.right = new TreeNode(6);
  bstRoot.right.left = new TreeNode(5);
  //bstRoot.right.right = new TreeNode(7);

console.log(bstRoot);
  console.log('result: ');
  console.log(deleteNodeBST(bstRoot, 6));
  console.log(bstRoot);
  console.log('end of result.');

function findMinBST (rootNode) { // lets make recursive O(log(n))
  // Your code here
  //if (rootNode === null) return null
  if (rootNode.left) return findMinBST(rootNode.left);

  return rootNode.val
}

function findMaxBST (rootNode) { // iteractive O(log(n))
  // Your code here
  while (rootNode.right) rootNode = rootNode.right

  return rootNode.val
}

function findMinBT (rootNode) { //iteractive - breadth-first O(n)
  // Your code here  
  let queue = [rootNode]; // making dynamical list of all nodes
  let min = rootNode.val      // tracking min

  while (queue.length > 0) { // traversing
    let currentNode = queue.shift(); // removing first and adding up to 2 children
    if (currentNode.val < min) min = currentNode.val
    if (currentNode.left) queue.push(currentNode.left);
    if (currentNode.right) queue.push(currentNode.right);
  }
  return min;
}

function findMaxBT (rootNode) { // recursive O(n)
  // Your code here
  let max = rootNode.val;
  if (rootNode.left) {
    let leftMax = findMaxBT(rootNode.left);
    if (leftMax > max) max = leftMax 
  }
  if (rootNode.right) {
    let rightMax = findMaxBT(rootNode.right);
    if (rightMax > max) max = rightMax 
  }
  return max;
}

function getHeight (rootNode) {//recursive
  // Your code here
  if (rootNode === null) return -1;
  let maxHeight = 0 // height = number of levels from 0, so null tree => -1 height
  
  if (rootNode.left) {
    let leftHeight = getHeight(rootNode.left);
    if (leftHeight >= maxHeight) maxHeight = leftHeight + 1
  }
  if (rootNode.right) {
    let rightHeight = getHeight(rootNode.right);
    if (rightHeight >= maxHeight) maxHeight = rightHeight + 1
  }
  return maxHeight;
}

function balancedTree (rootNode) { // wrong descriotion in readme - only left|right tree should be balanced
                                   // in tests - all of subtrees
  // Your code here
  if (rootNode.left === null && rootNode.right === null) return true;
  else if (rootNode.left===null || rootNode.right===null) { // one branch is null, need to check other
    if (Math.abs(getHeight(rootNode.left) - getHeight(rootNode.right)) <= 1) return true;
    return false;
  }
  return balancedTree(rootNode.left) && balancedTree(rootNode.right);
}


function countNodes (rootNode) {
  // Your code here
  if (rootNode === null) return 0 // zero nodes;
  return countNodes (rootNode.left) + countNodes (rootNode.right) + 1;
}

function getParentNode (rootNode, target) { // ret. null if target = root, undefined if not found
  
  if (rootNode === null) return undefined // didn't meet target and on bottom/ leaf
  if (rootNode.val === target) return null;  // case with no parent, only first root possible
  if (rootNode.left && rootNode.left.val === target || 
      rootNode.right && rootNode.right.val === target ) return rootNode; // if any child = target      
  //if (rootNode.left === null && rootNode.right === null) return undefined // bottom/leaf and no target
  return getParentNode(rootNode.left, target) || getParentNode(rootNode.right, target);
}


function inOrderPredecessor (rootNode, target) {//_binary tree_  If the target is the first value in an in-order traversal, return `null`.  
  // works good, even for BS. But uses function inside with outer variables
  // Your code here
  let previous = null;
  let result = null
  inOrderPredecessorTraversal (rootNode, target);
  return result;
  
  function inOrderPredecessorTraversal (rootNode, target) {

    if (rootNode === null) return;
  
    if (rootNode.left) inOrderPredecessorTraversal(rootNode.left, target);
    //console.log('rootNode.val, previous');console.log(rootNode.val);console.log(previous);
    if (rootNode.val === target) result = previous
    previous = rootNode.val
    if (rootNode.right) inOrderPredecessorTraversal(rootNode.right, target);
  }
}

function inOrderPredecessor_ (rootNode, target, previous = null, result) {//_binary tree_  If the target is the first value in an in-order traversal, return `null`.  
  // Your code here // this is for testing purposes, trying to make it in one function. But wrong sequences and results :'(
    
    if (rootNode === null) return;
  
    if (rootNode.left) inOrderPredecessor(rootNode.left, target, previous, result);
    console.log('rootNode.val, previous');console.log(rootNode.val);console.log(previous);
    if (rootNode.val === target) result = previous
    previous = rootNode.val
    console.log('result0-' + result);
    if (rootNode.right) inOrderPredecessor(rootNode.right, target, previous, result);
    console.log('result-' + result);
}


function inOrderPredecessor_ (rootNode, target) { // very nice, but works with BST, not BS
  // Your code here
  if(rootNode == null){
    return null;
  }
  if(target <= rootNode.val){
    return inOrderPredecessor(rootNode.left,target);
  }
  else{
    const res = inOrderPredecessor(rootNode.right,target);
    if(res){
      return res;
    }
    else{
      return rootNode.val;
    }
  }
}

function deleteNodeBST(rootNode, target) {
  // Do a traversal to find the node. Keep track of the parent
  let parent = getParentNode (rootNode, target)
  
  // Undefined if the target cannot be found
  if (parent === undefined) return undefined;

  // Set target based on parent
  let targetNode;
  if (parent === null) targetNode = rootNode;
  else targetNode = (parent.left && parent.left.val === target)? parent.left: parent.right; 
  let children = ( Number(targetNode.left !== null) + Number(targetNode.right !== null)) // true = 1, false = 0,  converts to number

  switch(children) {
    case 0 :
      // Case 0: Zero children and no parent:
      //   return null
      if (parent === null) return null;
      
      // Case 1: Zero children:
      //   Set the parent that points to it to null
      (parent.left && parent.left.val === target)? parent.left = null : parent.right = null;
    
    break
    case 2:
      // Case 2: Two children:
      //  Set the value to its in-order predecessor, then delete the predecessor -
      let inoPredVal = inOrderPredecessor(rootNode, target);
      
      deleteNodeBST(rootNode, inoPredVal) // better deleting first, because then we can use deleteNodeBST correctly
      targetNode.val = inoPredVal;

      //  (Replace target node with the left most child on its right side, 
      //  or the right most child on its left side.
      //  Then delete the child that it was replaced with.) - already done
    break
    case 1:
      // Case 3: One child:
      //   Make the parent point to the child
      let child = targetNode.left? targetNode.left: targetNode.right; // no-null one
      (parent.left && parent.left.val === target)? parent.left = child : parent.right = child;
    break
  }
}

module.exports = {
    findMinBST,
    findMaxBST,
    findMinBT,
    findMaxBT,
    getHeight,
    countNodes,
    balancedTree,
    getParentNode,
    inOrderPredecessor,
    deleteNodeBST
}