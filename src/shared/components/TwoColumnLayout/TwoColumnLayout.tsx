import {Component, ReactNode} from "react";
import * as React from "react";
import Card from "../Card/Card";
import CardData from "../../../interfaces/CardData";

interface TwoColumnLayoutProps {
    ids: Array<string>;
    action: (id: string) => Promise<CardData>;
    goTo?: (target: string) => void;
}

export default class TwoColumnLayout extends Component<TwoColumnLayoutProps> {

    constructor(props: TwoColumnLayoutProps) {
        super(props);
    }

    renderCards(): Array<ReactNode> {
        console.log(this.props.ids);
        return this.props.ids.map( id => {
            return <Card id={id} action={this.props.action} goTo={this.props.goTo}/>
        })
    }

    render(): ReactNode {
        return (
            <div className="two-column-layout">
                <div className="container">
                    { this.renderCards() }
                </div>
            </div>
        );
    }
}