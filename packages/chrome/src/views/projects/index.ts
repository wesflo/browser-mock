import {property, queryAll, state} from 'lit/decorators.js';
import {html, LitElement, nothing} from 'lit';
import {defaultStyle} from "../../util/style/defaultStyle";
import {style} from "./style";
import "../../component/button";
import "../../component/collapse";
import "../../component/toast";
import "../../component/option-picker";
import "./component/project-form";
import CollapseComponent from "../../component/collapse";
import {textStyle} from "../../util/style/textStyle";

export class Component extends LitElement {
    @property({type: String}) error: string = '';

    @queryAll('wf-collapse') collapses: NodeListOf<CollapseComponent>;


    static styles = [defaultStyle, textStyle, style];

    render() {
        return html`
            <header>
                <h1>Projects</h1>
                <div class="buttons">
                    <wf-button @click="${this.addNewProject}">Add new Project</wf-button>
                </div>
            </header>
            <wf-project-form @onSubmit="${this.handleFormSubmit}"></wf-project-form>
        `;
    }

    handleFormSubmit = () => {
        console.log( 1 )
    }

    addNewProject = () => {
        console.log( 1 )
    }
}

if (!customElements.get('wf-view-projects')) {
    customElements.define('wf-view-projects', Component);
}