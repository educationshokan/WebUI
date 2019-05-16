import {Component, ReactNode} from "react";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { boundMethod } from "autobind-decorator";
import "./Home.css";

export default class Home extends Component<RouteComponentProps<any>> {

    @boundMethod
    private goToChallange() {
        this.props.history.push("/challange");
    }

    render(): ReactNode {
        return (
            <div>
                <div className="welcome">
                    <h1><span>¡Bienvenido!</span><br/><span>Selecciona un Reto</span></h1>
                </div>
                <div className="content">
                    <div id="challenge-1" className="card" onClick={ this.goToChallange }>
                        <div className="card-icon"/>
                        <h4>Desperdicio de Alimentos</h4>
                        <p>Millones de toneladas de comida son tirados a la basura cada día en México y en el mundo.</p>
                    </div>
                </div>
            </div>
        );
    }
}