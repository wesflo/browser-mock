import {property, queryAll} from 'lit/decorators.js';
import {css, html, LitElement} from 'lit';
import {defaultStyle} from "../../util/style/defaultStyle";
import {style} from "./style";
import {buttonsWrapperStyles} from "../../component/button/style";
import {openAllCollapses} from "../../component/collapse/util/openAllCollapses";
import {closeAllCollapses} from "../../component/collapse/util/closeAllCollapses";

import "../../component/button";
import "../../component/switch";
import "../../component/select";
import "../../component/input";
import "../../component/options";
import "../../component/textarea";
import "../../component/file";
import "../../component/collapse";
import {FormController} from "../../util/formController";
import {IFormValues} from "./interface";
import {inputFieldTypes} from "../../util/formController/constant";
import {required} from "../../util/formController/validators/required";
import {minLength} from "../../util/formController/validators/minLength";
import {resizeCollapses} from "../../component/collapse/util/resizeCollapses";
import CollapseComponent from "../../component/collapse";

export class ViewDefault extends LitElement {
    @property({type: String}) error: string = '';

    @queryAll('wf-collapse') collapses: NodeListOf<CollapseComponent>;
    @queryAll(inputFieldTypes.join(',')) inputFields: NodeListOf<HTMLElement>;

    form: FormController<IFormValues, ViewDefault> = new FormController(this, {
        text: [required, minLength],
    });

    static styles = [defaultStyle, buttonsWrapperStyles, style];

    render() {
        return html`
            <div class="buttons">
                <wf-button .onClick="${this.handleOpenAll}">Open All</wf-button>
                <wf-button .onClick="${this.handleCloseAll}">Close All</wf-button>
            </div>
            <wf-collapse title="Collapse Dummy" isOpen >
                <wf-switch name="switch">Label switch</wf-switch>
                
                <wf-input name="text" min-length="5" label="Label text" required></wf-input>
                <wf-input naem="pwd" type="password" label="Label password" required></wf-input>
                
                <wf-select name="select" label="Label select" required @onBlur="${() => console.log( 'blur' )}" @onChange="${() => console.log( 'change' )}" >
                    <wf-option value="">Eins auswählen</wf-option>
                    <wf-option value="1">Foo 1</wf-option>
                    <wf-option value="2">Foo 2</wf-option>
                    <wf-option value="3">Foo 3</wf-option>
                    <wf-option value="4">Foo 4</wf-option>
                    <wf-option value="5">Foo 5</wf-option>
                </wf-select>
                
                <wf-textarea name="textarea" label="Textarea Label" required @onBlur="${() => console.log( 'blur' )}" @onChange="${() => console.log( 'change' )}" ></wf-textarea>

                <wf-options name="checkboxes" label="Checkboxes" multiple required @onBlur="${() => console.log( 'blur' )}" @onChange="${() => console.log( 'change' )}" >
                    <wf-option value="1">Label checkbox 1</wf-option>
                    <wf-option value="2">Label checkbox 2</wf-option>
                </wf-options>
                <wf-options name="radio" label="Radios" required @onBlur="${() => console.log( 'blur' )}" @onChange="${() => console.log( 'change' )}" >
                    <wf-option value="1">Label radio 1</wf-option>
                    <wf-option value="2">Label radio 2</wf-option>
                </wf-options>
                
                <wf-file name="file" label="Label File" accept=".png,.pdf" multiple required></wf-file>

                <wf-button @onClick="${this.handleFormSubmit}">Label Button </wf-button>
            </wf-collapse>
            <wf-collapse title="Collapse Dummy">
                <h1>Stet clita kasd gubergren</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
            </wf-collapse>
            <wf-collapse title="Collapse Dummy">
                <h1>Stet clita kasd gubergren</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
            </wf-collapse>
            <wf-collapse title="Collapse Dummy">
                <h1>Stet clita kasd gubergren</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
            </wf-collapse>
            <wf-collapse title="Collapse Dummy">
                <h1>Stet clita kasd gubergren</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
            </wf-collapse>
            <wf-collapse title="Collapse Dummy">
                <h1>Stet clita kasd gubergren</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
            </wf-collapse>
        `;
    }

    handleFormSubmit = () => {
        console.log( this.form.validate() )
        resizeCollapses(this.collapses);
    }

    handleOpenAll = () => openAllCollapses(this.collapses)
    handleCloseAll = () => closeAllCollapses(this.collapses)
}

if (!customElements.get('wf-view-config')) {
    customElements.define('wf-view-config', ViewDefault);
}