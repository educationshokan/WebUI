import {Component, ReactNode} from "react";
import * as React from "react";
import SketchArea from "../../shared/components/SketchArea/SketchArea";
import { RouteComponentProps } from "react-router";
import { boundMethod } from "autobind-decorator";

interface SketchWrapperProps extends RouteComponentProps<{new: string}> {

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
        const random = Math.round(Math.random() * 10000 + 1);
        console.log(random);
        const fileId = await this.uploadFile(bytes, random);
        if (this.props.match.params.new === "newProject") {
            await this.newProject(fileId, random);
        }
        this.goToProjects();
    }

    private async uploadFile(bytes: string, random: number): Promise<string> {
        const res = await fetch("http://educationshokan.ddns.net:8080/media", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fileName: `sketch${random}.png`
            })
        });
        const location = res.headers.get("Location")!;
        const fileId = location.split("/")[location.split("/").length - 1];
        const uploadRes = await fetch(`http://educationshokan.ddns.net:8080${location}?encoded=true`, {
            method: "POST",
            headers: { "Content-Type": "application/upload" },
            body: Buffer.from(bytes)
        });
        return fileId;
    }

    private async newProject(fileId: string, random: number) {
        const projRes = await fetch(`http://educationshokan.ddns.net:8080/project`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: `NuevoProjecto${random}`,
                description: "Un nuevo proyecto"
            })
        });
        const loc = projRes.headers.get("Location")!;
        const projectId = loc.split("/")[loc.split("/").length - 1];
        await fetch(`http://educationshokan.ddns.net:8080/project/${projectId}/addFile`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: fileId
            })
        });
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