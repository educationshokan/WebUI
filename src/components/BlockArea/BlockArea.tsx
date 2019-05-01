import { Component, ReactNode } from "react";
import * as Blockly from "node-blockly/browser";
import * as React from "react";
import "./BlockArea.css";

interface BlockAreaProps {
    divName: string;
}

export default class BlockArea extends Component<BlockAreaProps> {

    private editor: any;

    constructor(props: BlockAreaProps) {
        super(props);
    }

    componentDidMount() {
        this.editor = Blockly.inject(this.props.divName, {
            toolbox: BlockArea.xmlToolbar()
        });
        setInterval(() => {
            const code = Blockly.JavaScript.workspaceToCode(this.editor);
            console.log(code);
        }, 10000);
    }

    static xmlToolbar() {
        return `
            <xml id="toolbox" style="display: none">
                <category name="Variables" colour="100">
                    <block type="variables_get"/>
                    <block type="variables_set"/>
                </category>
                <category name="Control">
                    <block type="controls_if"/>
                    <block type="controls_repeat_ext"/>
                </category>
                <category name="Lists" colour="200">
                    <block type="lists_create_empty"/>
                    <block type="lists_isEmpty"/>
                    <block type="lists_length"/>
                    <block type="lists_create_with"/>
                </category>
                <category name="Other">
                    <block type="logic_compare"/>
                    <block type="math_number"/>
                    <block type="math_arithmetic"/>
                    <block type="text"/>
                    <block type="text_print"/>
                </category>
            </xml>
        `;
    }

    render(): ReactNode {
        return (
            <div>
                <div id={ this.props.divName }/>
            </div>
        );
    }

}