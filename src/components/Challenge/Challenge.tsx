import {Component, ReactNode} from "react";
import * as React from "react";

export default class Challenge extends Component<{}>{

    render(): ReactNode {
        return (
            <div>
                <div className="wallpaper"/>
                <h4>Desperdicio de Alimentos</h4>
                <p>Millones de toneladas de comida son tirados a la basura cada día en México y en el mundo.</p>
                <button>Comenzar</button>
            </div>
        );
    }
}