import { Component, ReactNode } from "react";
import * as React from "react";
import "./Main.css";
import ProjectFilesWrapper from "../ProjectFilesWrapper/ProjectFilesWrapper";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SketchWrapper from "../SketchWrapper/SketchWrapper";
import BlockWrapper from "../BlockWrapper/BlockWrapper";
import FilesWrapper from "../FilesWrapper/FilesWrapper";
import ProjectsWrapper from "../ProjectsWrapper/ProjectsWrapper";
import PublishedProjects from "../PublishedProjects/PublishedProjects";
import Home from "../Home/Home";
import Challenge from "../Challenge/Challenge";
import Inspire from "../Inspire/Inspire";


export default class Main extends Component<{}> {

    constructor(props: {}) {
        super(props);
    }

    render(): ReactNode {
        return (
            <div>
                { Main.router() }
            </div>
        );
    }

    private static router(): ReactNode {
        return (
            <Router>
                <Route
                    exact path="/"
                    render={ routeProps => <Home {...routeProps}/> }
                />
                <Route
                    exact path="/challange"
                    render={ routeProps => <Challenge {...routeProps}/> }
                />
                <Route
                    exact path="/challange/inspire"
                    render={ routeProps => <Inspire {...routeProps}/> }
                />
                <Route
                    path="/sketchbook/:new"
                    render={ routeProps => <SketchWrapper {...routeProps}/> }
                />
                <Route
                    exact path="/blocks"
                    render={ routeProps => <BlockWrapper {...routeProps}/> }
                />
                <Route
                    exact path="files"
                    render={ routeProps => <FilesWrapper {...routeProps}/> }
                />
                <Route
                    exact path="/project"
                    render={ routeProps => <ProjectsWrapper {...routeProps}/> }
                />
                <Route
                    exact path="/project/:name"
                    render={ routeProps => <ProjectFilesWrapper {...routeProps}/> }
                />
                <Route
                    exact path="/publications"
                    render={ routeProps => <PublishedProjects {...routeProps}/> }
                />
            </Router>
        );
    }

}