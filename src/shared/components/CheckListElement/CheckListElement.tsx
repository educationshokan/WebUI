import {Component, ReactNode} from "react";
import * as React from "react";
import CardData from "../../../interfaces/CardData";

interface CheckListElementProps {
    id: string,
    action: (id: string) => Promise<CardData>
}

interface CheckListElementState extends CardData { }


export default class CheckListElement extends Component<CheckListElementProps, CheckListElementState> {

    constructor(props: CheckListElementProps) {
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
            <li className="checklist-layout-el">
                <label>
                    <input type="checkbox" value="${ this.props.id }"/>
                    <h4>{ this.state.name }</h4>
                    <p>{ this.state.desc }</p>
                </label>
            </li>
        );
    }


}