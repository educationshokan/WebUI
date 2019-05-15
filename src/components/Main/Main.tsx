import { Component, ReactNode } from "react";
import * as React from "react";
import "./Main.css";
import Home from "../Home/Home";


export default class Main extends Component<{}> {

    constructor(props: {}) {
        super(props);
    }

    render(): ReactNode {
        return (
            <div>
                <Home/>
            </div>
        );
    }

}