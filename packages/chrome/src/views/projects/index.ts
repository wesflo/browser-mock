import { property, queryAll } from 'lit/decorators.js';
import { html, LitElement} from 'lit';
import {defaultStyle} from "../../util/style/defaultStyle";
import {style} from "./style";
import "../../component/button";
import "../../component/collapse";
import "../../component/toast";
import "../../component/option-picker";
import {toastFactory} from "../../component/toast/util/toastFactory";
import CollapseComponent from "../../component/collapse";
import {textStyle} from "../../util/style/textStyle";

export class ViewDefault extends LitElement {
    @property({type: String}) error: string = '';

    @queryAll('wf-collapse') collapses: NodeListOf<CollapseComponent>;

    static styles = [defaultStyle, textStyle, style];

    render() {
        return html`
            <header>
                <h1>API Calls</h1>
                <div class="buttons">
                    <wf-button @click="${this.addNewProject}">Add new Project</wf-button>
                </div>
            </header>

        `;
    }

    addNewProject = () => {
        console.log( 1 )
    }
}

if (!customElements.get('wf-view-projects')) {
    customElements.define('wf-view-projects', ViewDefault);
}