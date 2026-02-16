import { define } from '@substrate-system/web-component/util'
import { define as slashDefine } from '@substrate-system/icons/eye-slash'
import { define as regularDefine } from '@substrate-system/icons/eye-regular'
// import Debug from '@substrate-system/debug'
// const debug = Debug('password-input')

slashDefine()
regularDefine()

// for docuement.querySelector
declare global {
    interface HTMLElementTagNameMap {
        'password-input':PasswordInput
    }
}

export class PasswordInput extends HTMLElement {
    static TAG = 'password-input'
    static INPUT_ATTRIBUTES = [
        'accept',
        'alt',
        'autocomplete',
        'autocapitalize',
        'autocorrect',
        'autofocus',
        'capture',
        'dirname',
        'disabled',
        'enterkeyhint',
        'form',
        'inputmode',
        'list',
        'max',
        'maxlength',
        'min',
        'minlength',
        'multiple',
        'name',
        'pattern',
        'placeholder',
        'readonly',
        'required',
        'size',
        'spellcheck',
        'step',
        'tabindex',
        'title',
        'value'
    ]

    static ARIA_ATTRIBUTES = [
        'aria-activedescendant',
        'aria-atomic',
        'aria-autocomplete',
        'aria-braillelabel',
        'aria-brailleroledescription',
        'aria-busy',
        'aria-checked',
        'aria-colcount',
        'aria-colindex',
        'aria-colindextext',
        'aria-colspan',
        'aria-controls',
        'aria-current',
        'aria-describedby',
        'aria-description',
        'aria-details',
        'aria-disabled',
        'aria-dropeffect',
        'aria-errormessage',
        'aria-expanded',
        'aria-flowto',
        'aria-grabbed',
        'aria-haspopup',
        'aria-hidden',
        'aria-invalid',
        'aria-keyshortcuts',
        'aria-label',
        'aria-labelledby',
        'aria-level',
        'aria-live',
        'aria-modal',
        'aria-multiline',
        'aria-multiselectable',
        'aria-orientation',
        'aria-owns',
        'aria-placeholder',
        'aria-posinset',
        'aria-pressed',
        'aria-readonly',
        'aria-relevant',
        'aria-required',
        'aria-roledescription',
        'aria-rowcount',
        'aria-rowindex',
        'aria-rowindextext',
        'aria-rowspan',
        'aria-selected',
        'aria-setsize',
        'aria-sort',
        'aria-valuemax',
        'aria-valuemin',
        'aria-valuenow',
        'aria-valuetext'
    ]

    static observedAttributes = (['visible', 'label', 'id'])
        .concat(PasswordInput.INPUT_ATTRIBUTES)
        .concat(PasswordInput.ARIA_ATTRIBUTES)

    inputId:string|null = null
    inputAriaAttributes:Record<string, string> = {}
    ignoredAriaCallbackNames:Set<string> = new Set()
    ignoredIdCallback = false

    // empty string = is visible
    // null = not visible
    handleChange_visible (_, _newValue) {
        this.reRender()
    }

    handleChange_label (_oldValue, _newValue) {
        this.render()
        this._listen()
    }

    handleChange_aria (
        name:string,
        _oldValue:string|null,
        newValue:string|null
    ) {
        if (this.ignoredAriaCallbackNames.has(name)) {
            this.ignoredAriaCallbackNames.delete(name)
            return
        }

        if (newValue === null) {
            delete this.inputAriaAttributes[name]
            this.querySelector('input')?.removeAttribute(name)
            return
        }

        this.inputAriaAttributes[name] = newValue
        this.querySelector('input')?.setAttribute(name, newValue)

        if (this.hasAttribute(name)) {
            this.ignoredAriaCallbackNames.add(name)
            this.removeAttribute(name)
        }
    }

    handleChange_id (_oldValue:string|null, newValue:string|null) {
        if (this.ignoredIdCallback) {
            this.ignoredIdCallback = false
            return
        }

        if (newValue === null) {
            this.inputId = null
            this.querySelector('input')?.removeAttribute('id')
            return
        }

        this.inputId = newValue
        this.querySelector('input')?.setAttribute('id', newValue)

        if (this.hasAttribute('id')) {
            this.ignoredIdCallback = true
            this.removeAttribute('id')
        }
    }

    handleChange_inputAttribute (name:string, newValue:string|null) {
        const input = this.querySelector('input')
        if (!input) return

        if (newValue === null) {
            input.removeAttribute(name)
            return
        }

        input.setAttribute(name, newValue)
    }

    /**
     * Listen for change in visiblity.
     *
     * @param  {string} name     The attribute name
     * @param  {string} oldValue The old attribute value
     * @param  {string} newValue The new attribute value
     */
    async attributeChangedCallback (
        name:string,
        oldValue:string,
        newValue:string
    ) {
        if (name === 'id') {
            this.handleChange_id(oldValue, newValue)
            return
        }

        if (name.startsWith('aria-')) {
            this.handleChange_aria(name, oldValue, newValue)
            return
        }

        if (PasswordInput.INPUT_ATTRIBUTES.includes(name)) {
            this.handleChange_inputAttribute(name, newValue)
            return
        }

        if (this[`handleChange_${name}`]) {
            this[`handleChange_${name}`](oldValue, newValue)
        }
    }

    connectedCallback () {
        this.render()
        this._listen()
    }

    _listen () {
        const btn = this.querySelector('button')!
        btn.addEventListener('click', (ev) => {
            ev.preventDefault()
            this.isVisible = !this.isVisible
        })
    }

    getType ():'text'|'password' {
        return this.isVisible ? 'text' : 'password'
    }

    set isVisible (value:boolean) {
        if (value) {
            this.setAttribute('visible', '')
        } else {
            this.removeAttribute('visible')
        }
    }

    get isVisible ():boolean {
        return this.hasAttribute('visible')
    }

    set label (value:string|null) {
        if (value === null) {
            this.removeAttribute('label')
            return
        }

        this.setAttribute('label', value)
    }

    get label ():string|null {
        return this.getAttribute('label')
    }

    getButtonContent () {
        return (this.isVisible ?
            '<eye-regular></eye-regular><span class="visually-hidden">Hide</span>' :
            '<eye-slash></eye-slash><span class="visually-hidden">Show</span>')
    }

    /**
     * Change the visibility button state.
     */
    reRender () {
        const btn = this.querySelector('.pw-visibility')
        btn!.innerHTML = this.getButtonContent()
        this.setAttribute('type', this.getType())
        this.querySelector('input')?.setAttribute('type', this.getType())
    }

    render () {
        const name = this.getAttribute('name')
        const label = this.getAttribute('label')
        const hostId = this.getAttribute('id')
        const hostAriaAttributes = Array.from(this.attributes)
            .filter(attr => attr.name.startsWith('aria-'))

        if (hostId !== null) {
            this.inputId = hostId
        }

        for (const attr of hostAriaAttributes) {
            this.inputAriaAttributes[attr.name] = attr.value
        }

        // create string from attributes
        const attrs = Array.from(this.attributes)
            .filter(attr =>
                attr.name !== 'label' &&
                attr.name !== 'id' &&
                !attr.name.startsWith('aria-')
            )
            .map(attr => attr.name + (attr.value === '' ?
                '' :
                ('=' + `"${attr.value}"`))
            )
            .join(' ')

        const classes = (this.getAttribute('class') ?? '').split(' ')
            .concat(['password', 'input', name || ''])
            .filter(Boolean)
            .join(' ')

        const idAttribute = this.inputId ? `id="${this.inputId}"` : ''
        const ariaAttributes = Object.entries(this.inputAriaAttributes)
            .map(([attrName, attrValue]) => {
                return (attrName + (attrValue === '' ?
                    '' :
                    ('=' + `"${attrValue}"`)))
            })
            .join(' ')

        this.innerHTML = label ? `
            <label class="${classes}">
                <span class="label-content">${label}</span>
                <span class="input">
                    <input
                        ${idAttribute}
                        ${ariaAttributes}
                        ${attrs}
                        type=${this.getType()} />
                    <button class="pw-visibility">
                        ${this.getButtonContent()}
                    </button>
                </span>
            </label>
        ` : `
            <div class="${classes}">
                <span class="input">
                    <input
                        ${idAttribute}
                        ${ariaAttributes}
                        ${attrs}
                        type=${this.getType()} />
                    <button class="pw-visibility">
                        ${this.getButtonContent()}
                    </button>
                </span>
            </div>
        `

        if (this.hasAttribute('id')) {
            this.ignoredIdCallback = true
            this.removeAttribute('id')
        }
        for (const attr of hostAriaAttributes) {
            this.ignoredAriaCallbackNames.add(attr.name)
            this.removeAttribute(attr.name)
        }
    }
}

define(PasswordInput.TAG, PasswordInput)
