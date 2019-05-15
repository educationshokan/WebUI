import {Component, ReactNode} from "react";
import * as React from "react";
import TwoColumnLayout from "../TwoColumnLayout/TwoColumnLayout";
import SuccessResponse from "../../interfaces/SuccessResponse";
import CardData from "../../interfaces/CardData";
import CardsWrapper from "../../interfaces/CardsWrapper";
import ProjectMetadata from "../../interfaces/ProjectMetadata";

class ProjectsWrapperProps {
}

class ProjectsWrapperState {
    projectsIds!: string[];
}

export default class ProjectsWrapper extends Component<ProjectsWrapperProps, ProjectsWrapperState> implements CardsWrapper{

    constructor(props: ProjectsWrapperProps) {
        super(props);

        this.state = {
            projectsIds: []
        }
    }

    async componentWillMount() {
        const res = await fetch("http://educationshokan.ddns.net:8080/projects", {
            method: "GET"
        });

        const {status, data}: SuccessResponse = await res.json();
        console.log(data);
        const ids = data as Array<string>;
        this.setState({
            projectsIds: ids
        });
    }

    async retrieveCardData(id: string): Promise<CardData> {
        const res = await fetch(`http://educationshokan.ddns.net:8080/project/${id}`, {
            method: "GET"
        });

        const {status, data}: SuccessResponse = await res.json();
        const cardMetadata = data as ProjectMetadata;

        return {
            name: cardMetadata.projectName,
            type: "project",
            desc: cardMetadata.description
        };
    }

    render(): ReactNode {
        return (
            <div className="cards-wrapper">
                <h1>Mis Archivos</h1>
                <TwoColumnLayout ids={ this.state.projectsIds } action={ this.retrieveCardData }/>
            </div>
        );
    }

}