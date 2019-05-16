import {Component, ReactNode} from "react";
import * as React from "react";
import TwoColumnLayout from "../../shared/components/TwoColumnLayout/TwoColumnLayout";
import SuccessResponse from "../../interfaces/SuccessResponse";
import CardData from "../../interfaces/CardData";
import FileMetadata from "../../interfaces/FileMetadata";
import CardsWrapper from "../../interfaces/CardsWrapper";

interface  FilesWrapperProps { }

interface FilesWrapperState {
    filesIds: string[]
}

export default class FilesWrapper extends Component<FilesWrapperProps, FilesWrapperState> implements CardsWrapper{

    constructor(props: FilesWrapperProps){
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
            <div className="cards-wrapper">
                <h1>Mis Archivos</h1>
                <TwoColumnLayout ids={ this.state.filesIds } action={ this.retrieveCardData }/>
            </div>
        );
    }

}