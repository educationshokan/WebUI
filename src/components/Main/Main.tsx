import { Component, ReactNode } from "react";
import * as React from "react";
import "./Main.css";
import logo from "./logo.svg";
import BlockArea from "../BlockArea/BlockArea";
import Card from "../../shared/components/Card/Card";
import TwoColumnLayout from "../../shared/components/TwoColumnLayout/TwoColumnLayout";
import FilesWrapper from "../FilesWrapper/FilesWrapper";
import BlockWrapper from "../BlockWrapper/BlockWrapper";
import SketchWrapper from "../SketchWrapper/SketchWrapper";
import ProjectsWrapper from "../ProjectsWrapper/ProjectsWrapper";
import ProjectFilesWrapper from "../ProjectFilesWrapper/ProjectFilesWrapper";
import PublisherPopup from "../PublisherPopup/PublisherPopup";
import PublishedProjects from "../PublishedProjects/PublishedProjects";


export default class Main extends Component<{}> {

    constructor(props: {}) {
        super(props);
    }

    render(): ReactNode {
        return (
            <div>
                <PublishedProjects/>
            </div>
        );
    }

}