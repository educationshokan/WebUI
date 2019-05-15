import {Component, ReactNode} from "react";
import * as React from "react";

interface SketchAreaProps {

}

interface SketchAreaState {

}

export default class SketchArea extends Component<SketchAreaProps, SketchAreaState> {

    constructor(props: SketchAreaProps){
        super(props);
    }

    render(): ReactNode {
        return (
            <div>
                <canvas id="canvas"/>
            </div>
        );
    }
}