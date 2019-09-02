export default class Tree {
  root;
  nodes = [];

  constructor(nodes) {
    const root = Tree.findRoot(nodes);
    this.root = root;
    this.nodes = [...nodes.filter(node => node.id !== root.id)].map(
      node => new Node(node, nodes)
    );
  }

  get rootId() {
    return this.root.id;
  }

  static findRoot(nodes) {
    const result = nodes.filter(node => !node.hasOwnProperty("parent_id"));

    return result[0];
  }
}

class Node {
  value;
  children = null;
  parent = null;

  constructor(value, nodes) {
    this.value = value;
    this.parent = Node.findParent(value.parent_id, nodes);
  }

  static findParent(parent_id, nodes) {
    const result = nodes.filter(node => (node.parent_id = parent_id));

    return result[0];
  }
}
