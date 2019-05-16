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

    private sketch: SketchArea | null = null;

    constructor(props: SketchWrapperProps) {
        super(props);
    }

    @boundMethod
    private async save() {
        const bytes = await this.sketch!.save();
        const res = await fetch("http://localhost:8080/media", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fileName: "canvas.png"
            })
        });
        const location = res.headers.get("Location");
        const uploadRes = await fetch(`http://localhost:8080${location}?encoded=true`, {
            method: "POST",
            headers: { "Content-Type": "application/upload" },
            body: Buffer.from(bytes)
        });
        this.goToProjects();
    }

    @boundMethod
    private goToProjects() {
        this.props.history.push("/project")
    }

    render(): ReactNode {
        return (
            <div className="tool-wrapper">
                <h1>Sketch</h1>
                <button onClick={ this.save }>Guardar</button>
                <button onClick={ this.goToProjects }>Cerrar</button>
                <SketchArea ref={ sketch => this.sketch = sketch }/>
            </div>
        );
    }
}