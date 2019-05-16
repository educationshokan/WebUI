import {Component, ReactNode} from "react";
import * as React from "react";
import SketchArea from "../../shared/components/SketchArea/SketchArea";
import { RouteComponentProps } from "react-router";
import { boundMethod } from "autobind-decorator";

interface SketchWrapperProps extends RouteComponentProps<any> {

}

interface SketchWrapperState {

}

export default class SketchWrapper extends Component<SketchWrapperProps, SketchWrapperState> {

    constructor(props: SketchWrapperProps) {
        super(props);
    }

    @boundMethod
    private goToProjects() {
        this.props.history.push("/project")
    }

    render(): ReactNode {
        return (
            <div className="tool-wrapper">
                <h1>Sketch</h1>
                <button>Guardar</button>
                <button onClick={ this.goToProjects }>Cerrar</button>
                <SketchArea/>
            </div>
        );
    }
}