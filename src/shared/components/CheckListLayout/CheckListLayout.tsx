import {Component, ReactNode} from "react";
import * as React from "react";
import CardData from "../../../interfaces/CardData";
import CheckListElement from "../CheckListElement/CheckListElement";

interface CheckListLayoutProps {
    ids: Array<string>
    action: (id: string) => Promise<CardData>
}

export default class CheckListLayout extends Component<CheckListLayoutProps> {

    constructor(props: CheckListLayoutProps) {
        super(props);
    }

    renderItems(): Array<ReactNode> {
        console.log(this.props.ids);
        return this.props.ids.map( id => {
            return <CheckListElement id={id} action={this.props.action}/>
        })
    }

    render(): ReactNode {
        return (
            <div className="checklist-layout">
                <ol>
                    { this.renderItems() }
                </ol>
            </div>
        );
    }
}