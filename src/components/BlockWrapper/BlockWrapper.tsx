import {Component, ReactNode} from "react";
import * as React from "react";
import BlockArea from "../../shared/components/BlockArea/BlockArea";
import { RouteComponentProps } from "react-router";
import { boundMethod } from "autobind-decorator";

interface BlockWrapperProps extends RouteComponentProps<any> {

}

interface BlockWrapperState {

}

export default class BlockWrapper extends Component<BlockWrapperProps, BlockWrapperState> {

    private blockArea: BlockArea | null = null;

    constructor(props: BlockWrapperProps) {
        super(props);
    }

    @boundMethod
    private async saveBlocks() {
        const code = this.blockArea!.generateCode();
        await this.uploadFile(code);
        this.props.history.push("/project")
    }

    private async uploadFile(payload: string) {
        const res = await fetch("http://educationshokan.ddns.net:8080/media", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fileName: `index.html`
            })
        });
        const location = res.headers.get("Location")!;
        const fileId = location.split("/")[location.split("/").length - 1];
        const uploadRes = await fetch(`http://educationshokan.ddns.net:8080${location}`, {
            method: "POST",
            headers: { "Content-Type": "application/upload" },
            body: Buffer.from(payload)
        });
    }

    render(): ReactNode {
        return (
            <div className="tool-wrapper">
                <h1>Block</h1>
                <button onClick={ this.saveBlocks }>Guardar</button>
                <BlockArea ref={ area => this.blockArea = area } divName="block"/>
            </div>
        );
    }

}