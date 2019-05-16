import {Component, ReactNode} from "react";
import * as React from "react";
import { boundMethod } from "autobind-decorator";
import { RouteComponentProps } from "react-router";
import './Challenge.css';

export default class Challenge extends Component<RouteComponentProps<any>>{

    @boundMethod
    private goToInspire() {
        this.props.history.push("/challange/inspire");
    }

    render(): ReactNode {
        return (
            <div>
                <div className="wallpaper"/>
                <div className="content">
                    <h1>Desperdicio de Alimentos</h1>
                    <p>Millones de toneladas de comida son tirados a la basura cada día en México y en el mundo. En
                        Guadalajara, más de 200 toneladas de comida son tiradas en el mercado de abastos cada semana.</p>
                    <button onClick={ this.goToInspire }>Comenzar</button>
                </div>
            </div>
        );
    }
}