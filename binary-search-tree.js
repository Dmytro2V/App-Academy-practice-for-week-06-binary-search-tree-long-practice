// Before starting, copy and paste your guided practice work from
// `binary-search-tree.js` into this file

// Your code here

// Do not change this
class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }
  
  class BinarySearchTree {
  
    constructor() {
      // Your code here
      this.root = null;
    }
  
    insert(val, currentNode=this.root) {
      // Your code here
      if (this.root === null ) { //empty tree, need to set tree root;
        this.root = new TreeNode(val);
        return;
      }   
  
      if (val < currentNode.val) { // left recursive searching null
        if (currentNode.left === null) { // no node left, setting
          currentNode.left = new TreeNode(val)              
        } else {     
          this.insert(val, currentNode.left) // if left node, recurse;
        }       
        return // need return after recursive!
           
      } else if (val > currentNode.val) { // right
        if (currentNode.right === null) { // no node right, setting
          currentNode.right = new TreeNode(val)              
        } else {     
          this.insert(val, currentNode.right) // if right node, recurse;
        }       
        return // need return after recursive!    
      }   
      
    }
  
    search(val, currentNode=this.root) {
      // Your code here
      if (currentNode === null) return false;
      if (currentNode.val === val) return true;
      if (val < currentNode.val) { // left recursive searching null
          return this.search(val, currentNode.left)        
      } else if (val > currentNode.val) { // right
          return this.search(val, currentNode.right)
      }
  
    }
  
  
    preOrderTraversal(currentNode = this.root) {
      // Your code here
      if (currentNode === null) return;
      console.log(currentNode.val);
      
      if (currentNode.left) {
        this.preOrderTraversal(currentNode.left)
      }  
      if (currentNode.right) {
        this.preOrderTraversal(currentNode.right)
      }
      return
    }
  
  
    inOrderTraversal(currentNode = this.root) {
      // Your code here
      if (currentNode === null) return;
      
      if (currentNode.left) {
        this.inOrderTraversal(currentNode.left)      
      }  
      console.log(currentNode.val);
   
      if (currentNode.right) {
        this.inOrderTraversal(currentNode.right)
              
      }
      return
    }
    
  
  
    postOrderTraversal(currentNode = this.root) {
      // Your code here
      if (currentNode === null) return;
          
      if (currentNode.left) {
        this.postOrderTraversal(currentNode.left)
      }  
      if (currentNode.right) {
        this.postOrderTraversal(currentNode.right)
      }
      console.log(currentNode.val);
  
      return
    }
  
      // Breadth First Traversal - Iterative
    breadthFirstTraversal() {
      // your code here
      // doing with queue (FILO) through array
      let queue = [];
      
      // adding head
      queue.push(this.root);
  
      // go while queue
      while(queue.length > 0) {
        // for every node in queue need to print it, extract and add 0-1-2 childrens to the end;
        let currentNode = queue.shift()
        console.log(currentNode.val);
        if (currentNode.left) queue.push(currentNode.left)
        if (currentNode.right) queue.push(currentNode.right);
      }
  
    }
  
    // Depth First Traversal - Iterative
    depthFirstTraversal() {
      // your code here
      // can use FIFO (stack) with array
      let stack = [];
      
      // adding head
      stack.push(this.root);
  
      // go while stack
      while(stack.length > 0) {
        // for every node in stack need to print it, extract, and add 0-1-2 childrens to the end;
        let currentNode = stack.pop()
        console.log(currentNode.val);
        if (currentNode.left) stack.push(currentNode.left)
        if (currentNode.right) stack.push(currentNode.right);
      }
    }
  }
  
  module.exports = { BinarySearchTree, TreeNode };