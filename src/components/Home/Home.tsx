import {Component, ReactNode} from "react";
import * as React from "react";

export default class Home extends Component<{}>{

    render(): ReactNode {
        return (
            <div>
                <div>
                    <h1>¡Bienvenido!<br/>Selecciona un Reto</h1>
                </div>
                <div className="row">
                    <div className="column">
                        <div className="card">
                            <div className="card-icon"/>
                            <h4>Desperdicio de Alimentos</h4>
                            <p>Millones de toneladas de comida son tirados a la basura...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}