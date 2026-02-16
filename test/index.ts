import { test } from '@substrate-system/tapzero'
import { waitFor } from '@substrate-system/dom'
import '../src/index.js'

test('example test', async t => {
    document.body.innerHTML += `
        <password-input class="test">
        </password-input>
    `

    const el = await waitFor('password-input')

    t.ok(el, 'should find an element')
})

test('renders a label element when label is present', async t => {
    document.body.innerHTML = `
        <password-input label="Account Password"></password-input>
    `

    const el = await waitFor('password-input')
    const label = el?.querySelector('label')
    const labelContent = el?.querySelector('.label-content')
    const input = el?.querySelector('input')

    t.ok(label, 'should render a label element')
    t.equal(
        labelContent?.textContent?.trim(),
        'Account Password',
        'should render label text'
    )
    t.equal(
        label?.getAttribute('for'),
        input?.getAttribute('id'),
        'should associate label with input id'
    )
    t.equal(
        label?.querySelector('button'),
        null,
        'should not nest toggle button inside label'
    )
})

test('moves host id to inner input id', async t => {
    document.body.innerHTML = `
        <password-input id="moved-id" label="Password"></password-input>
    `

    const el = await waitFor('password-input')
    const input = el?.querySelector('input')

    t.equal(el?.getAttribute('id'), null, 'should remove id from host element')
    t.equal(input?.getAttribute('id'), 'moved-id', 'should assign id to inner input')
})

test('moves host aria-describedby to inner input', async t => {
    document.body.innerHTML = `
        <password-input aria-describedby="help-text"></password-input>
    `

    const el = await waitFor('password-input')
    const input = el?.querySelector('input')

    t.equal(
        el?.getAttribute('aria-describedby'),
        null,
        'should remove aria-describedby from host element'
    )
    t.equal(
        input?.getAttribute('aria-describedby'),
        'help-text',
        'should assign aria-describedby to inner input'
    )
})

test('moves all host aria-* attrs to inner input', async t => {
    document.body.innerHTML = `
        <password-input
            aria-label="Create a password"
            aria-invalid="true"
            aria-required="true"></password-input>
    `

    const el = await waitFor('password-input')
    const input = el?.querySelector('input')

    t.equal(el?.getAttribute('aria-label'), null, 'should remove aria-label from host')
    t.equal(el?.getAttribute('aria-invalid'), null, 'should remove aria-invalid from host')
    t.equal(el?.getAttribute('aria-required'), null, 'should remove aria-required from host')
    t.equal(input?.getAttribute('aria-label'), 'Create a password', 'should set aria-label on input')
    t.equal(input?.getAttribute('aria-invalid'), 'true', 'should set aria-invalid on input')
    t.equal(input?.getAttribute('aria-required'), 'true', 'should set aria-required on input')
})

test('updates inner input when aria-* attrs change on host', async t => {
    document.body.innerHTML = `
        <password-input></password-input>
    `

    const el = await waitFor('password-input')
    const input = el?.querySelector('input')

    el?.setAttribute('aria-label', 'Initial label')
    t.equal(
        input?.getAttribute('aria-label'),
        'Initial label',
        'should update input aria-label when host aria-label is set'
    )
    t.equal(
        el?.getAttribute('aria-label'),
        null,
        'should remove aria-label from host after transfer'
    )

    el?.setAttribute('aria-label', 'Updated label')
    t.equal(
        input?.getAttribute('aria-label'),
        'Updated label',
        'should update input aria-label when host aria-label changes'
    )
})

test('updates inner input when forwarded attrs change on host', async t => {
    document.body.innerHTML = `
        <password-input autocomplete="new-password" minlength="8"></password-input>
    `

    const el = await waitFor('password-input')
    const input = el?.querySelector('input')

    t.equal(
        input?.getAttribute('autocomplete'),
        'new-password',
        'should set initial autocomplete on input'
    )
    t.equal(
        input?.getAttribute('minlength'),
        '8',
        'should set initial minlength on input'
    )

    el?.setAttribute('autocomplete', 'current-password')
    el?.setAttribute('minlength', '12')

    t.equal(
        input?.getAttribute('autocomplete'),
        'current-password',
        'should update autocomplete on input'
    )
    t.equal(
        input?.getAttribute('minlength'),
        '12',
        'should update minlength on input'
    )

    el?.removeAttribute('autocomplete')
    el?.removeAttribute('minlength')

    t.equal(input?.getAttribute('autocomplete'), null, 'should remove autocomplete from input')
    t.equal(input?.getAttribute('minlength'), null, 'should remove minlength from input')
})

test('visibility toggle button has button semantics and state', async t => {
    document.body.innerHTML = `
        <password-input></password-input>
    `

    const el = await waitFor('password-input')
    const button = el?.querySelector('.pw-visibility') as HTMLButtonElement | null
    const input = el?.querySelector('input')

    t.equal(button?.getAttribute('type'), 'button', 'should render a non-submit button')
    t.equal(button?.getAttribute('aria-pressed'), 'false', 'should start unpressed')
    t.equal(button?.getAttribute('aria-controls'), input?.getAttribute('id'), 'should reference input')

    button?.click()
    t.equal(button?.getAttribute('aria-pressed'), 'true', 'should update state after toggle')
})

test('emits show and hide events when visibility changes', async t => {
    document.body.innerHTML = `
        <password-input></password-input>
    `

    const el = await waitFor('password-input')
    const button = el?.querySelector('.pw-visibility') as HTMLButtonElement | null
    const seen:string[] = []

    el?.addEventListener('password-input:show', () => {
        seen.push('show')
    })

    el?.addEventListener('password-input:hide', () => {
        seen.push('hide')
    })

    button?.click()
    button?.click()

    t.equal(seen.join(','), 'show,hide', 'should emit show then hide')
})

test('all done', () => {
    // @ts-expect-error tests
    window.testsFinished = true
})
