import '../css/components/a.less'

export function componentA () {
    let ul = document.createElement('ul')

    ul.innerHTML = `
        <li>11</li>
        <li>23</li>
        <li>33</li>
        <li>33</li>
    `

    return ul
}