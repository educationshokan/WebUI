import {Component, ReactNode} from "react";
import * as React from "react";
import { boundMethod } from "autobind-decorator";
import { RouteComponentProps } from "react-router";

export default class Challenge extends Component<RouteComponentProps<any>>{

    @boundMethod
    private goToInspire() {
        this.props.history.push("/challange/inspire");
    }

    render(): ReactNode {
        return (
            <div>
                <div className="wallpaper"/>
                <h4>Desperdicio de Alimentos</h4>
                <p>Millones de toneladas de comida son tirados a la basura cada día en México y en el mundo.</p>
                <button onClick={ this.goToInspire }>Comenzar</button>
            </div>
        );
    }
}