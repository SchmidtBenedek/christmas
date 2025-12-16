/**
 * @type {{what: string, who1: string, who2?: string, shift1: string, shift2?: string}[]}
 */

const arr = [
    {
        what: 'Logisztika',
        who1: 'Kovács Máté',
        shift1: 'Délelőttös',
        who2: 'Kovács József',
        shift2: 'Délutános'
    },
    {
        what: 'Könyvelés',
        who1: 'Szabó Anna',
        shift1: 'Éjszakai'
    },
    {
        what: 'Játékfejlesztés',
        who1: 'Varga Péter',
        shift1: 'Délutános',
        who2: 'Nagy Eszter',
        shift2: 'Éjszakai'
    }
]

const fejlec = ['Osztály', 'Manó', 'Műszak']



const jsDiv = document.createElement('div')
jsDiv.id = 'jssection'
document.body.appendChild(jsDiv)
jsDiv.classList.add('hide')

const jsTable = renderTable(arr, fejlec)
jsTable.id = 'jstable'
jsDiv.appendChild(jsTable)


const jsform = document.createElement('form');
jsform.id = 'jsform';
jsDiv.appendChild(jsform);


const formArr = [
    {
        id: 'osztaly',
        txt: 'Osztály',
        type: 'text'
    },
    {
        id: 'mano1',
        txt: 'Manó 1',
        type: 'text'
    },
    {
        id: 'muszak1',
        txt: 'Manó 1 műszak',
        type: 'select',
        options: [
            { value: '', label: 'Válassz műszakot!'},
            { value: '1', label: 'Délelöttös' },
            { value: '2', label: 'Délutános' },
            { value: '3', label: 'Éjszakai' }
        ]
    },
    {
        id: 'masodikmano',
        txt: 'Két manót veszek fel',
        type: 'checkbox'
    },
    {
        id: 'mano2',
        txt: 'Manó 2',
        type: 'text'
    },
    {
        id: 'muszak2',
        txt: 'Manó 2 műszak',
        type: 'select',
        options: [
            { value: '', label: 'Válassz műszakot!'},
            { value: '1', label: 'Délelöttös' },
            { value: '2', label: 'Délutános' },
            { value: '3', label: 'Éjszakai' }
        ]
    }
];

for (const mezo of formArr) {
    const div = document.createElement('div');
    jsform.appendChild(div);
    
    if (mezo.type === 'checkbox') {
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = mezo.id;
        input.name = mezo.id;
        div.appendChild(input);
        
        const label = document.createElement('label');
        label.htmlFor = mezo.id;
        label.innerText = mezo.txt;
        div.appendChild(label);
    } else {
        const label = document.createElement('label');
        label.htmlFor = mezo.id;
        label.innerText = mezo.txt;
        div.appendChild(label);
        
        div.appendChild(document.createElement('br'));
        
        if (mezo.type === 'select') {
            const select = document.createElement('select');
            select.id = mezo.id;
            select.name = mezo.id;
            div.appendChild(select);
            
            for (const option of mezo.options) {
                const optionElem = document.createElement('option');
                optionElem.value = option.value;
                optionElem.innerText = option.label;
                select.appendChild(optionElem);
            }
        } else {
            const input = document.createElement('input');
            input.type = mezo.type;
            input.id = mezo.id;
            input.name = mezo.id;
            div.appendChild(input);
        }
        
        div.appendChild(document.createElement('br'));
    }
    
    const span = document.createElement('span');
    span.classList.add('error');
    div.appendChild(span);
}
const button = document.createElement('button');
button.innerText = 'Hozzáadás';
button.type = 'submit';
jsform.appendChild(button);