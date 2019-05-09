import {Component, ReactNode} from "react";
import * as React from "react";
import TwoColumnLayout from "../TwoColumnLayout/TwoColumnLayout";
import SuccessResponse from "../../interfaces/SuccessResponse";
import CardData from "../../interfaces/CardData";
import FileMetadata from "../../interfaces/FileMetadata";

interface  FilesWrapperProps {

}

interface FilesWrapperState {
    filesIds: string[]
}

export default class FilesWrapper extends Component<FilesWrapperProps, FilesWrapperState> {

    constructor(props: FilesWrapperProps){
        super(props);
        this.state = {
            filesIds: []
        }
    }

    async componentWillMount() {
        const res = await fetch("http://educationshokan.ddns.net:8080/media", {
            method: "GET"
        });

        const {status, data}: SuccessResponse = await res.json();
        console.log(data);
        const ids = data as Array<string>;
        this.setState({
            filesIds: ids
        });
    }

    static async retrieveFile(id: string): Promise<CardData> {
        const res = await fetch(`http://educationshokan.ddns.net:8080/media/${id}`, {
            method: "GET"
        });

        const {status, data}: SuccessResponse = await res.json();
        const cardMetadata = data as FileMetadata;

        return {
            name: cardMetadata.fileName,
            type: cardMetadata.mimeType,
            desc: cardMetadata.description
        };
    }

    render(): ReactNode {
        return (
            <div className="cards-wrapper">
                <h1>Mis Archivos</h1>
                <TwoColumnLayout ids={ this.state.filesIds } action={ FilesWrapper.retrieveFile }/>
            </div>
        );
    }

}