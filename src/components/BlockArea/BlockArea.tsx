import { Component, ReactNode } from "react";
import * as Blockly from  "node-blockly/browser";
import * as React from "react";
import "./BlockArea.css";

export default class BlockArea extends Component<{}> {

    constructor(props: {}) {
        super(props);
    }

    componentDidMount() {
        const editor = Blockly.inject("blockArea", {
            toolbox: document.getElementById("toolbox")
        });
    }

    static xmlToolbar() {
        return {
            __html: `
            <xml id="toolbox" style="display: none">
                <block type="controls_if"></block>
                <block type="controls_repeat_ext"></block>
                <block type="logic_compare"></block>
                <block type="math_number"></block>
                <block type="math_arithmetic"></block>
                <block type="text"></block>
                <block type="text_print"></block>
            </xml>`
        };
    }

    render(): ReactNode {
        return (
            <div>
                <span dangerouslySetInnerHTML={ BlockArea.xmlToolbar() }/>
                <div id="blockArea"/>
            </div>
        );
    }

}