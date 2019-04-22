import { Component, ReactNode } from "react";
import * as React from "react";
import "./Main.css";
import logo from "./logo.svg";


export default class Main extends Component<{}> {

    constructor(props: {}) {
        super(props);
    }

    render(): ReactNode {
        return (
            <div>
                <img src={ logo } className="App-logo" alt="React Logo"/>
                <span> I am the Senate! </span>
            </div>
        );
    }

}