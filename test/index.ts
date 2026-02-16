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

    t.ok(label, 'should render a label element')
    t.equal(
        labelContent?.textContent?.trim(),
        'Account Password',
        'should render label text'
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

test('all done', () => {
    // @ts-expect-error tests
    window.testsFinished = true
})
