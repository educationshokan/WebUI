import {Component, ReactNode} from "react";
import * as React from "react";
import CardsWrapper from "../../interfaces/CardsWrapper";
import CardData from "../../interfaces/CardData";
import SuccessResponse from "../../interfaces/SuccessResponse";
import FileMetadata from "../../interfaces/FileMetadata";
import CheckListLayout from "../../shared/components/CheckListLayout/CheckListLayout";

interface PublisherWrapperProps {
    projectName: string
}

interface PublisherWrapperState {
    filesIds: string[]
}

export default class PublisherPopup extends Component<PublisherWrapperProps, PublisherWrapperState> implements CardsWrapper {

    constructor(props: PublisherWrapperProps) {
        super(props);

        this.state = {
            filesIds: []
        }
    }

    async componentWillMount() {
        const res = await fetch("http://localhost:8080/media", {
            method: "GET"
        });

        const {status, data}: SuccessResponse = await res.json();
        console.log(data);
        const ids = data as Array<string>;
        this.setState({
            filesIds: ids
        });
    }

    async retrieveCardData(id: string): Promise<CardData>  {
        const res = await fetch(`http://localhost:8080/media/${id}`, {
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
            <div className="publish-wrapper">
                <h3>Proyecto {this.props.projectName }</h3>
                <CheckListLayout ids={ this.state.filesIds } action={ this.retrieveCardData }/>
            </div>
        );
    }



}