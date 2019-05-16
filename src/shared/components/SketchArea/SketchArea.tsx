import { Component, ReactNode } from "react";
import ReactDOM from "react-dom";
import CanvasArea  from "react-canvas-draw";
import * as React from "react";
import { boundMethod } from "autobind-decorator";
import html2canvas from "html2canvas";
import "./SketchArea.css";

interface SketchAreaProps {

}

interface SketchAreaState {

}

export default class SketchArea extends Component<SketchAreaProps, SketchAreaState> {

    private canvasArea: CanvasArea | null = null;

    constructor(props: SketchAreaProps) {
        super(props);
    }

    @boundMethod
    async save(): Promise<string> {
        const canvas = await html2canvas(ReactDOM.findDOMNode(this.canvasArea) as HTMLElement);
        return canvas.toDataURL("image/png");
    }

    render(): ReactNode {
        return (
            <div className="sketch-wrapper">
                <p>¡Dibuja tus ideas!</p>
                <CanvasArea id="canvasArea" ref={ canvas => this.canvasArea = canvas } lazyRadius={3}/>
            </div>
        );
    }
}