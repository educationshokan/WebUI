import {Component, ReactNode} from "react";
import * as React from "react";
import CardData from "../../../interfaces/CardData";
import projectImage from "../../assets/img/project-es.jpg";
import drawingImage from "../../assets/img/drawing-es.jpg";
import docImage from "../../assets/img/doc-es.jpg";

interface CardProps {
    id: string,
    action: (id: string) => Promise<CardData>,
    goTo?: (target: string) => void
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
        };
    }

    async componentWillMount() {
        const {id, action} = this.props;
        const data = await action(id);

        this.setState(data);
        this.setCardIcon();
    }

    setCardIcon(){
        let icon = document.getElementById(`${this.props.id}`) as HTMLElement;
        switch (this.state.type) {
            case "project": {
                icon.style.backgroundImage = `url(${projectImage})`;
                break;
            }
            case "image/png": {
                icon.style.backgroundImage = `url(${drawingImage})`;
                break;
            }
            default:
                break;

        }
    }

    render(): ReactNode {
        return (
            <div className="card" onClick={ () => (this.props.goTo !== undefined) ? this.props.goTo!(this.state.name) : "" }>
                <div id={this.props.id} className="card-icon"/>
                <h4>{ this.state.name }</h4>
                <p>{ this.state.desc }</p>
            </div>
        );
    }


}