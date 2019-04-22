import * as React from "react";
import * as ReactDom from "react-dom";
import Main from "./components/Main/Main";
import * as serviceWorker from "./serviceWorker";

ReactDom.render(<Main/>, document.getElementById("root"));

serviceWorker.unregister();