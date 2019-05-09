import { Component, ReactNode } from "react";
import * as React from "react";
import "./Main.css";
import logo from "./logo.svg";
import BlockArea from "../BlockArea/BlockArea";
import Card from "../Card/Card";
import TwoColumnLayout from "../TwoColumnLayout/TwoColumnLayout";
import FilesWrapper from "../FilesWrapper/FilesWrapper";
import BlockWrapper from "../BlockWrapper/BlockWrapper";


export default class Main extends Component<{}> {

    constructor(props: {}) {
        super(props);
    }

    render(): ReactNode {
        return (
            <div>
                <BlockWrapper/>
            </div>
        );
    }

}