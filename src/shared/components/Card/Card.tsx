import {Component, ReactNode} from "react";
import * as React from "react";
import CardData from "../../../interfaces/CardData";

interface CardProps {
    id: string,
    action: (id: string) => Promise<CardData>
}

interface CardState extends CardData { }


export default class Card extends Component<CardProps, CardState> {

    constructor(props: CardProps) {
        console.log(props);
        super(props);

        this.state = {
            name: "",
            type: "",
            desc: ""
        }
    }

    async componentWillMount() {
        const {id, action} = this.props;
        const data = await action(id);

        this.setState(data);
    }

    render(): ReactNode {
        return (
            <div className="card">
                <div className="card-icon"/>
                <h4>{ this.state.name }</h4>
                <h2>{ this.state.type }</h2>
                <p>{ this.state.desc }</p>
            </div>
        );
    }


}