import '../src/index.css'
import '../src/index.js'

if (import.meta.env.DEV || import.meta.env.MODE === 'staging') {
    localStorage.setItem('DEBUG', 'password-input')
} else {
    localStorage.removeItem('DEBUG')
}

document.body.innerHTML += `
    <form>
        <password-input name="example" id="example" placeholder="Example">
        </password-input>
    </form>
`
