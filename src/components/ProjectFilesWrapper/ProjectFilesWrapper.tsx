import {Component, ReactNode} from "react";
import * as React from "react";
import TwoColumnLayout from "../../shared/components/TwoColumnLayout/TwoColumnLayout";
import SuccessResponse from "../../interfaces/SuccessResponse";
import CardData from "../../interfaces/CardData";
import CardsWrapper from "../../interfaces/CardsWrapper";
import FileMetadata from "../../interfaces/FileMetadata";
import ProjectMetadata from "../../interfaces/ProjectMetadata";
import { RouteComponentProps } from "react-router";

type UrlParam = {name: string};

interface ProjectFilesWrapperProps extends RouteComponentProps<UrlParam> {
    projectId: string
}

interface ProjectFilesWrapperState {
    name: string
    filesIds: string[]
}

export default class ProjectFilesWrapper extends Component<ProjectFilesWrapperProps, ProjectFilesWrapperState> implements CardsWrapper {

    constructor(props: ProjectFilesWrapperProps) {
        super(props);
        this.state = {
            name: "No name",
            filesIds: []
        }
    }

    async componentWillMount() {
        const res = await fetch(`http://educationshokan.ddns.net:8080/project/${this.props.projectId}`, {
            method: "GET"
        });

        const {status, data}: SuccessResponse = await res.json();
        console.log(data);
        const project = data as ProjectMetadata;
        this.setState({
            name: project.name,
            filesIds: project.files
        });
    }


    async retrieveCardData(id: string): Promise<CardData> {
        const res = await fetch(`http://educationshokan.ddns.net:8080/media/${id}`, {
            method: "GET"
        });

        const {status, data}: SuccessResponse = await res.json();
        const file = data as FileMetadata;

        return {
            name: file.fileName,
            type: file.mimeType,
            desc: file.description
        };
    }

    render(): ReactNode {
        return (
            <div className="cards-wrapper">
                <h1>Proyecto { this.state.name }</h1>
                <TwoColumnLayout ids={ this.state.filesIds } action={ this.retrieveCardData }/>
            </div>
        );
    }

}