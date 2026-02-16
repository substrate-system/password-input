import '../src/index.css'
import '../src/index.js'

if (import.meta.env.DEV || import.meta.env.MODE === 'staging') {
    localStorage.setItem('DEBUG', 'password-input')
} else {
    localStorage.removeItem('DEBUG')
}

document.body.innerHTML += `
    <form>
        <password-input
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
