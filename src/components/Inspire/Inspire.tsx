import {Component, ReactNode} from "react";
import * as React from "react";
import { boundMethod } from "autobind-decorator";
import { RouteComponentProps } from "react-router";
import "./Inspire.css"

export default class Inspire extends Component<RouteComponentProps<any>> {

    @boundMethod
    private goToSketch() {
        this.props.history.push("/sketchbook/newProject");
    }

    render(): ReactNode {
        return (
            <div className="video-wrapper">
                <div className="video"/>
                <div className="content">
                    <button onClick={ this.goToSketch }>Siguiente</button>
                </div>
            </div>
        );
    }

}