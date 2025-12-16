/**
 * @type {{what: string, who1: string, who2?: string, shift1: string, shift2?: string}[]}
 */

const arr = [
    {
        what: "Logisztika",
        who1: "Kovács Máté",
        shift1: "Délelőttös",
        who2: "Kovács József",
        shift2: "Délutános"
    },
    {
        what: "Könyvelés",
        who1: "Szabó Anna",
        shift1: "Éjszakai"
    },
    {
        what: "Játékfejlesztés",
        who1: "Varga Péter",
        shift1: "Délutános",
        who2: "Nagy Eszter",
        shift2: "Éjszakai"
    }
]

const fejlec = ['Osztály', 'Manó', 'Műszak']
/**
 * 
 * @param {HTMLElement} parent
 * @param {string} text 
 * @param {'td' | 'th'} type
 * @returns {HTMLTableCellElement}
 */
function createCell(parent, text, type){
    const cell = document.createElement(type)
    cell.innerText = text
    parent.appendChild(cell)

    return cell
}


/**
 * 
 * @param {HTMLTableSectionElement} thead 
 * @param {string[]} fejlec 
 */
function createHeader(thead, fejlec){
    const tr = document.createElement('tr')
    thead.appendChild(tr)

    for(const x of fejlec){
        createCell(tr, x, 'th')
    }
}

/**
 * 
 * @param {HTMLTableSectionElement} tbody 
 * @param {arr} data 
 */
function createRow(tbody, data){
    const tr1 = document.createElement('tr')
    tbody.appendChild(tr1)

    const tdWhat = createCell(tr1, data.what, 'td')
    createCell(tr1, data.who1, 'td')
    createCell(tr1, data.shift1, 'td')

    if(data.who2 != undefined && data.shift2 != undefined){
        tdWhat.rowSpan = 2

        const tr2 = document.createElement('tr')
        tbody.appendChild(tr2)
        createCell(tr2, data.who2, 'td')
        createCell(tr2, data.shift2, 'td')
    }
}

/**
 * 
 * @param {arr} arr 
 * @param {string[]} fejlec 
 * @returns {HTMLTableElement}
 */
function renderTable(arr, fejlec){
    const table = document.createElement('table')
    const thead = document.createElement('thead')
    const tbody = document.createElement('tbody')

    table.appendChild(thead)
    table.appendChild(tbody)

    createHeader(thead, fejlec)

    for(const x of arr){
        createRow(tbody, x)
    }

    return table
}


const jsDiv = document.createElement('div')
jsDiv.id = 'jssection'
document.body.appendChild(jsDiv)
jsDiv.classList.add('hide')

const jsTable = renderTable(arr, fejlec)
jsTable.id = 'jstable'
jsDiv.appendChild(jsTable)




