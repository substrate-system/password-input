import '../src/index.css'
import { PasswordInput } from '../src/index.js'

if (import.meta.env.DEV || import.meta.env.MODE === 'staging') {
    localStorage.setItem('DEBUG', 'password-input')
} else {
    localStorage.removeItem('DEBUG')
}

document.body.innerHTML += `
    <form>
        <password-input
            autocomplete="new-password"
            name="example"
            aria-describedby="label-explanation"
            id="example"
            label="New Password"
            placeholder="Abc123!"
        ></password-input>
        <div id="label-explanation">
            This label is passed in as an attribute.
        </div>
    </form>

    ${/* no label attribute */''}
    <form>
        <label for="nolabel">No label attribute</label>
        <password-input
            autocomplete="new-password"
            id="nolabel"
            placeholder="my secret string"
            aria-describedby="explanation"
        ></password-input>
        <div id="explanation">
            The label here is created in the application code, not passed
            in as an attribute.
        </div>
    </form>
`

// Listen for the component's visibility events and keep every
// <password-input> on the page in sync. Clicking either input's eye button
// shows or hides both. The events bubble, so a single delegated listener on
// `document` covers all of them.
function syncVisibility (ev:Event) {
    const visible = (ev.target as PasswordInput).isVisible
    document.querySelectorAll<PasswordInput>('password-input')
        .forEach(el => { el.isVisible = visible })
}

document.addEventListener(PasswordInput.event('show'), syncVisibility)
document.addEventListener(PasswordInput.event('hide'), syncVisibility)
