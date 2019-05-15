import {Component, ReactNode} from "react";
import * as React from "react";
import SketchArea from "../../shared/components/SketchArea/SketchArea";
import { RouteComponentProps } from "react-router";

interface SketchWrapperProps extends RouteComponentProps<any>{

}

interface SketchWrapperState {

}

export default class SketchWrapper extends Component<SketchWrapperProps, SketchWrapperState> {

    constructor(props: SketchWrapperProps) {
        super(props);
    }

    render(): ReactNode {
        return (
            <div className="tool-wrapper">
                <h1>Sketch</h1>
                <button>Guardar</button>
                <SketchArea/>
            </div>
        );
    }
}