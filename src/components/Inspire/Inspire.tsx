import {Component, ReactNode} from "react";
import * as React from "react";

export default class Inspire extends Component<{}>{

    render(): ReactNode {
        return (
            <div>
                <div className="video">Video</div>
                <h4>Introducción</h4>
                <button>Siguiente</button>
            </div>
        );
    }
}