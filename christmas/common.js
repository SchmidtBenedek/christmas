/**
 * @typedef {{what: string, who1: string, who2?: string}} PartialElf
 */


//HF:

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








/**
 *  Lekérjük a tableselectort, és regisztrálunk egy change eseménykezelőt!
 */

const tableselector = document.getElementById('tableselector')

tableselector.addEventListener('change', function(e){

    const target = e.target

    const jssection = document.getElementById('jssection')
    const htmlsection = document.getElementById('htmlsection')

    if(target.checked){
        if(target.value == 'jssection'){
            jssection.classList.remove('hide')
            htmlsection.classList.add('hide')
        }
        else{
            jssection.classList.add('hide')
            htmlsection.classList.remove('hide')
        }
    }
})



/**
 * Ez a függvény a javascript legvégén fut le, amikor már minden elem betöltött.
 * Első lépésben vizsgáljuk a checkbox értékét, és az alapján beállítjuk a többi elem
 * státuszát (ha nincs bepipálva akkor a mano2 és a muszak2 értéke nem engedélyezett)
 * Aztán feliratkozunk a change eseményre, hogy amikor változik a checkbox értéke,
 * akkor is frissüljenek a státuszok.
 * 
 * @param {HTMLInputElement} checkboxElem ami a formon belül helyezkedik el
 * @returns {void}
 */
function initCheckbox(checkboxElem){
    changeCheckboxValue(checkboxElem)
    checkboxElem.addEventListener('change', () => changeCheckboxValue(checkboxElem))
}

/**
 * 
 * A bemeneti checkbox értéke alapján állítja a formon belüli mano2 és muszak2 disabled
 * értékét. Ha nincs bepipálva a checkbox, akkor a disabled érték igaz lesz, tehát nem
 * módosíthatjuk őket.
 * Ha be van pipálva, akkor a disabled értéke false lesz, tehát a mezők módosíthatóak
 * a checkboxtól a formot a parentElementjének (div) a parentElementjén keresztül érjük
 * el, és a két beviteli mező azonosítója mano2 és muszak2
 * 
 * @param {HTMLInputElement} checkbox egy jelölőnégyzet
 * @returns {void}
 */
function changeCheckboxValue(checkbox){
    
    const mano2 = document.getElementById('mano2')
    const muszak2 = document.getElementById('muszak2')

    if(checkbox.checked){
        mano2.disabled = false
        muszak2.disabled = false
    }
    else{
        mano2.disabled = true
        muszak2.disabled = true
    }

    

    
}

/**
 * Segédfüggvény, aminek a segítségével elkérjük a htmlformon belüli 
 * manochooser azonosítójú elemet, ami tartalmazza az összes rendszerben létező manót
 * 
 * @returns {HTMLSelectElement}
 */
function getSelectElement() {
    const htmlForm = document.getElementById('htmlform');
    const select = htmlForm.querySelector('#manochooser');
    return select;
}

/**
 * 
 * A tömb alapján felépíti a dropdownlist opcióit.
 * Első lépésben töröljük az optionlist tartalmát, majd
 * létrehozunk egy opciót, aminek nincs value értéke,
 * a tartalma pedig "Válassz manót!" utána végigiterálunk
 * a bemeneti tömbön és hozzáfűzük a tömb who1 manóit az
 * optionlisthez. Amennyiben a who2 is definiálva van,
 * azt is hozzáfűzzük.
 * a függvény korán fut le, hiszen a dropdownlist a html-en
 * található 
 * 
 * @param {PartialElf[]} arr az adattömb, ami alapján felépítjük az opciókat
 * @returns {void}
 */
function initSelect(arr) {
    const select = getSelectElement();
    select.innerHTML = '';
    createoption(select, "Válassz Manót!"); // ez a függvény még nincs implementálva, görgess lejjebb
    for(const x of arr){ 
        createoption(select, x.who1, x.who1)
        if(x.who2 != undefined){
            createoption(select, x.who2, x.who2)
        }
    }
    
}

/**
 * Létrehoz és hozzáfűz egy új optiont a selecthez
 * 
 * @param {HTMLSelectElement} selectElement a select element
 * @param {string} label az option tag közötti szöveg
 * @param {string} [value=""] az option value értéke, alapértelmezett értéke üres string
 * @returns {void}
 */
function createoption(selectElement, label, value = "") {
    const optinon = document.createElement('option')
    optinon.value = value
    optinon.innerText = label
    selectElement.appendChild(optinon)
}

/**
 * 
 * Ez a függvény azután fut le az eseménykezelőben,
 * miután a validáció sikeres volt, és összeállítottuk az objektumot.
 * Hasonlóan az inithez, az objektum who1 és a who2 (ha van) tulajdonság
 * alapján fűzzük hozzá a selecthez az új opciókat.
 * Ezután fűzzük hozzá az új elemet a tömb paraméterhez, majd meghívjuk a renderTbody
 * függvényt az array-el (ez a tömb alapján újrarendereli a táblázatot)
 * Végül töröljük az ürlap beviteli mezőinek a tartalmát.
 * Fontos, hogy a reset függvény után meghívjuk a {@link changeCheckboxValue} a checkbox elemmel,
 * mert change esemény nem keletkezik a form resetelésekor.
 * Az objektum abban az esetben, ha a "Két manót veszek fel" jelölő négyzet nincs bepipálva,
 * csak az első manó adatait tartalmazza, a másik manóhoz tartozó tulajdonságok nem definiáltak
 * 
 * @param {PartialElf} obj ez az összerakott elem
 * @param {HTMLFormElement} form az ürlap
 * @param {PartialElf[]} array az adattömb
 * @returns {void}
 */
function createNewElement(obj, form, array) {

    const select = getSelectElement();
    
    createoption(select, obj.who1, obj.who1)
    if (obj.who2 !== undefined){
        createoption(select, obj.who2, obj.who2)
    }

    // ez egy ismerős rész, ehhez nem kell nyúlni
    array.push(obj);
    renderTbody(array);
    form.reset();
    // ismerős rész vége
    
    const checkbox = form.querySelector('#masodikmano');
    changeCheckboxValue(checkbox);

}

/**
 * 
 * Mivel a műszakválasztó 1,2 vagy 3 elemet vesz fel,
 * ezért ezt át kell alakítani olyan értékké, amit a 
 * felhasználónak meg szeretnénk jeleníteni. Ezt a függvényt
 * akkor hívjuk, amikor az objektumot összeállítjuk, mielőtt a
 * tömbbe beleraknánk.
 * Ha 1 az értéke akkor "Délelöttös", ha 2 akkor "Délutános", míg
 * 3 esetén az "Éjszakai" értékkel kell visszatérjen a függvény
 * 
 * @param {string} muszakValue az érték, amit a select optionjéből kapunk
 * @returns {string}
 */
function mapMuszak(muszakValue){
    if (muszakValue === "1") {
        muszakValue = "Délelőttös";
    } else if (muszakValue === "2") {
        muszakValue = "Délutános";
    } else if (muszakValue === "3") {
        muszakValue = "Éjszakai";
    }

    return muszakValue;
}