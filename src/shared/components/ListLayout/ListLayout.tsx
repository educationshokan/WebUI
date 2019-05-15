import {Component, ReactNode} from "react";
import * as React from "react";
import CardData from "../../../interfaces/CardData";
import ListElement from "../ListElement/ListElement";

interface ListLayoutProps {
    ids: Array<string>
    action: (id: string) => Promise<CardData>
}

export default class ListLayout extends Component<ListLayoutProps> {

    constructor(props: ListLayoutProps) {
        super(props);
    }

    renderItems(): Array<ReactNode> {
        console.log(this.props.ids);
        return this.props.ids.map( id => {
            return <ListElement id={id} action={this.props.action}/>
        })
    }

    render(): ReactNode {
        return (
            <div className="list-layout">
                { this.renderItems() }
            </div>
        );
    }
}