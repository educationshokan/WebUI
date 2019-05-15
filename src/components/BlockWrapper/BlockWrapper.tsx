import {Component, ReactNode} from "react";
import * as React from "react";
import BlockArea from "../../shared/components/BlockArea/BlockArea";
import { RouteComponentProps } from "react-router";

interface BlockWrapperProps extends RouteComponentProps<any>{

}

interface BlockWrapperState {

}

export default class BlockWrapper extends Component<BlockWrapperProps, BlockWrapperState> {

    constructor(props: BlockWrapperProps) {
        super(props);
    }

    render(): ReactNode {
        return (
            <div className="tool-wrapper">
                <h1>Block</h1>
                <button>Guardar</button>
                <BlockArea divName="block"/>
            </div>
        );
    }
}