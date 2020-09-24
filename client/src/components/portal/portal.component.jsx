import { Component } from "react";
import ReactDOM from "react-dom";

// Portal renders children into a DOM node that exists outside
// the DOM hierarchy of the parent component (#root).

const portalRoot = document.getElementById("portal-root");

export default class Portal extends Component {
  constructor() {
    super();
    // create container for content to go inside
    this.portalContainer = document.createElement("div");
  }

  // add container to the portal root when portal mounts/unmounts so children have something to go into
  componentDidMount = () => {
    portalRoot.appendChild(this.portalContainer);
  };

  componentWillUnmount = () => {
    portalRoot.removeChild(this.portalContainer);
  };

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.portalContainer);
  }
}
