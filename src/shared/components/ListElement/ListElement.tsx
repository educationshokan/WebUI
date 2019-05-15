import {Component, ReactNode} from "react";
import * as React from "react";
import CardData from "../../../interfaces/CardData";

interface ListElementProps {
    id: string,
    action: (id: string) => Promise<CardData>
}

interface ListElementState extends CardData { }


export default class ListElement extends Component<ListElementProps, ListElementState> {

    constructor(props: ListElementProps) {
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
            <div className="list-layout-el">
                <h4>{ this.state.name }</h4>
                <span>{ this.state.desc }</span>
            </div>
        );
    }


}