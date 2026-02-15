import { define } from '@substrate-system/web-component/util'
import { define as eyeDefine } from '@substrate-system/icons/eye-slash'
import { define as regularDefine } from '@substrate-system/icons/eye-regular'
import Debug from '@substrate-system/debug'
const debug = Debug('password-input')

eyeDefine()
regularDefine()

// for docuement.querySelector
declare global {
    interface HTMLElementTagNameMap {
        'password-input':PasswordInput
    }
}

export class PasswordInput extends HTMLElement {
    static TAG = 'password-input'
    static observedAttributes = ['visible']

    // empty string = is visible
    // null = not visible
    handleChange_visible (_, _newValue) {
        this.reRender()
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
            debug('clicking...')
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

    getButtonContent () {
        return (this.isVisible ?
            '<eye-slash></eye-slash><span class="visually-hidden">Hide</span>' :
            '<eye-regular></eye-regular><span class="visually-hidden">Show</span>')
    }

    reRender () {
        const btn = this.querySelector('.pw-visibility')
        btn!.innerHTML = this.getButtonContent()
        this.setAttribute('type', this.getType())
        this.querySelector('input')?.setAttribute('type', this.getType())
    }

    render () {
        const name = this.getAttribute('name')

        // create object from attributes
        const attrs = Array.from(this.attributes)
            .map(attr => attr.name + (attr.value === '' ?
                '' :
                ('=' + `"${attr.value}"`))
            )
            .join(' ')

        const classes = (this.getAttribute('class') ?? '').split(' ')
            .concat(['password', 'input', name || ''])
            .filter(Boolean)
            .join(' ')

        this.innerHTML = `<div class="${classes}">
            <input ${attrs} type=${this.getType()} />

            <button class="pw-visibility">
                ${this.getButtonContent()}
            </button>
        </div>`
    }
}

define(PasswordInput.TAG, PasswordInput)
