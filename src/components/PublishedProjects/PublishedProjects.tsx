import {Component, ReactNode} from "react";
import * as React from "react";
import CardsWrapper from "../../interfaces/CardsWrapper";
import CardData from "../../interfaces/CardData";
import SuccessResponse from "../../interfaces/SuccessResponse";
import ProjectMetadata from "../../interfaces/ProjectMetadata";
import ListLayout from "../../shared/components/ListLayout/ListLayout";

interface PublishedProjectsProps { }

interface PublishedProjectsState {
    projectsIds: string[]
}

export default class PublishedProjects extends Component<PublishedProjectsProps, PublishedProjectsState> implements CardsWrapper{


    constructor(props: PublishedProjectsProps) {
        super(props);
        this.state = {
            projectsIds: []
        }
    }

    async componentWillMount() {
        const res = await fetch(`http://educationshokan.ddns.net:8080/projects`, {
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
        const project = data as ProjectMetadata;

        return {
            name: project.name,
            type: "project",
            desc: project.description
        };
    }

    render(): ReactNode {
        return (
            <div className="cards-wrapper">
                <h1>Proyectos Publicados</h1>
                <ListLayout ids={ this.state.projectsIds } action={ this.retrieveCardData }/>
            </div>
        );
    }

}