import {Component, ReactNode} from "react";
import * as React from "react";
import { boundMethod } from "autobind-decorator";
import { RouteComponentProps } from "react-router";

export default class Inspire extends Component<RouteComponentProps<any>> {

    @boundMethod
    private goToSketch() {
        this.props.history.push("/sketchbook/newProject");
    }

    render(): ReactNode {
        return (
            <div>
                <div className="video">Video</div>
                <h4>Introducción</h4>
                <button onClick={ this.goToSketch }>Siguiente</button>
            </div>
        );
    }

}