import { Component, ReactNode } from "react";
import * as Blockly from "node-blockly/browser";
import HtmlBlocks from "../../../libraries/htmlBlockly/htmlBlocks";
import HtmlGenerator from "../../../libraries/htmlBlockly/htmlGenerator";
import * as React from "react";
import "./BlockArea.css";
import { boundMethod } from "autobind-decorator";

interface BlockAreaProps {
    divName: string;
}

interface BlockAreaState {
    files: MediaFile[];
}

interface Success {
    status: "success";
    data: Array<any> | any;
}

interface MediaFile {
    id: string;
    fileName: string;
    mimeType: string;
    description: string;
}

export default class BlockArea extends Component<BlockAreaProps, BlockAreaState> {

    private editor: any;

    constructor(props: BlockAreaProps) {
        super(props);
        this.state = {
            files: []
        };
        HtmlBlocks(Blockly);
        HtmlGenerator(Blockly);
        Blockly.HtmlGenerator['Media'] = this.generateMediaCode;
    }

    @boundMethod
    private generateMediaCode(block: any) {
        const width = block.getFieldValue("widthField");
        const height = block.getFieldValue("heightField");
        const selected = block.getFieldValue("dropdownField");
        const mediaFile = this.state.files.find(file => file.id == selected)!!;
        const url = `http://educationshokan.ddns.net:8080/publish/<id>/${mediaFile.id}`;
        switch (mediaFile.mimeType) {
            case "image/jpg":
            case "image/png":
                return `<img src="${url}" alt=""/>`;
            case "audio/mp3":
            case "audio/mpeg":
                return `
                    <audio controls>
                        <source src="${url}" type="${mediaFile.mimeType}">
                    </audio>
                `;
            case "video/mp4":
                return `
                    <video width="${width}px" height="${height}px" controls>
                        <source src="${url}" type="${mediaFile.mimeType}">
                    </video>
                `;
            case "application/pdf":
                return `<iframe width="${width}px" height="${height}px" frameborder="0" src="${url}"></iframe>`
        }
        return `<div><span>Wtf</span></div>`;
    }

    async componentWillMount() {
        await this.getAvailableFiles();
        this.initBlocks();
    }

    async getAvailableFiles() {
        const response = await fetch("http://educationshokan.ddns.net:8080/media");
        const ids: Array<String> = (await response.json() as Success).data;
        const files = await Promise.all(ids.map(async (id) => {
            const res = await fetch(`http://educationshokan.ddns.net:8080/media/${ id }`);
            const json = await res.json() as Success;
            return json.data as MediaFile;
        }));
        this.setState({
            files: files
        });
    }

    private initBlocks() {
        const options = this.state.files.map(file => [file.fileName, file.id]);
        Blockly.Blocks["Media"] = {
            init: function () {
                const dropdown = new Blockly.FieldDropdown(options.length > 0 ? options : ["no data", ""]);
                this.appendDummyInput()
                    .appendField("select file:")
                    .appendField(dropdown, 'dropdownField')
                    .appendField("height: ")
                    .appendField(new Blockly.FieldNumber(640), "heightField")
                    .appendField("width: ")
                    .appendField(new Blockly.FieldNumber(480), "widthField");
                this.setColour(160);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
            }
        };
        this.editor = Blockly.inject(this.props.divName, {
            toolbox: BlockArea.xmlToolbar()
        });
        setInterval(() => {
            const code = Blockly.HtmlGenerator.workspaceToCode(this.editor);
            console.log(code);
        }, 10000);
    }

    @boundMethod
    generateCode(): string {
        return Blockly.HtmlGenerator.workspaceToCode(this.editor);
    }

    static xmlToolbar() {
        return `
        <xml>
            <id="toolbox" style="display: none">
                <category name="Estructura">
                    <block type="Media"/>
                    <block type="html"/>
                    <block type="body"/>
                    <block type="body_attributes"/>
                    <block type="head"/>
                    <block type="title"/>
                    <block type="script"/>
                </category>
                <category name="Programación" colour="100">
                    <block type="variables_get"/>
                    <block type="variables_set"/>
                    <block type="controls_if"/>
                    <block type="controls_repeat_ext"/>
                    <block type="lists_create_empty"/>
                    <block type="lists_isEmpty"/>
                    <block type="lists_length"/>
                    <block type="lists_create_with"/>
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