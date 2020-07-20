/* 1. STEP: json-server elindítása a terminál ablakban: 
C:\Users\Boros Klán\Desktop\Programozás\npm> json-server --watch .\db\db.json

2.STEP: Bootstrep letöltése egy új 2. terminál ablakban (ettől a json server fut a háttérben) 
C:\Users\Boros Klán\Desktop\Programozás\npm>npm i bootstrap (js mappa bootstrap.min.css fájl létrejön és 
ennek a relatív elérési utvonalát kimásolom és elhelyezem a html fejlécében)

3.STEP: Készítek egy táblázatot a tbody részt üresen hagyom, mert azt majd a js-sel fogom feltölteni.

4.STEP: main.js fájl elkészítése és betenni htmlbe. és elkészítem a fech.et.
*/
/* az 5. lépésnél változik:

function getServerData(url) {
    let fetchOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    };

    fetch(url, fetchOptions).then(
        response => response.json(),
        err => console.error(err)
        ).then(data => console.log(data)
    );

    }

    getServerData("http://localhost:3000/users");

    */
   /* 5. STEP: így más fvbe is bele tudom tenni data-t, ez egy próba volt
   */

const { keys } = require( "lodash" );

  /* a 7. lépésnél áltozik:

  function getServerData(url) {
    let fetchOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    };

    return fetch(url, fetchOptions).then(
        response => response.json(),
        err => console.error(err)
    );

    }

    getServerData("http://localhost:3000/users").then(
        data => console.log(data)
    );
*/
    /* 6.STEP: elhelyezek egy gombot. (Mi a container?? És mi a row, mit csinál a kinézettel???)

    7.STEP: Gomb üzembe helyezése
    */
   function getServerData(url) {
    let fetchOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    };

    return fetch(url, fetchOptions).then(
        response => response.json(),
        err => console.error(err)
    );

    }

    /* 9.STEP: a console.log-ot kicserélem a fillDataTable fv-re:

document.querySelector("#getDataBtn").addEventListener("click", function() {
    getServerData("http://localhost:3000/users").then(
        data => console.log(data)
    );});
    */

 /*  a 15. lépésben lett átírva
document.querySelector("#getDataBtn").addEventListener("click", function() { 
    getServerData("http://localhost:3000/users").then(
       data => fillDataTable(data, "userTable"));
  }
);

*/
   function startGetUsers() {
    getServerData("http://localhost:3000/users").then(
       data => fillDataTable(data, "userTable"));
  }

document.querySelector("#getDataBtn").addEventListener("click", startGetUsers());

    /* 8. STEP: a táblázat kitöltése a szerver adatokkal (tableID??? = userTable)

    */

   function fillDataTable(data, tableID) {
    let table = document.querySelector(`#${tableID}`);
    if (!table) {
        console.error(`Table "${tableID}" is not found.`);
        return;
    }


    /* 17. STEP:

    */

    let newRow = newUserRow();
    table.appendChild(newRow);
    /* 11. STEP:
    */

    /* a 11. lépésnél változik (ez a 8as része???)
    
    let tBody = table.querySelector("tbody");
        for (let row of data) {
            console.log(row);
        }
    }
    
    let tBody = table.querySelector("tbody");
    for (let row of data) {
        let tr = createAnyElement("tr");
        for (let k in row) {
            let td = createAnyElement("td");
            td.innerHTML = row[k];
            tr.appendChild(td);
        }
        tBody.appendChild(tr);
    }
    
}
   */
/* 13. STEP:
*/
let tBody = table.querySelector("tbody");
        for (let row of data) {
            let tr = createAnyElement("tr");
            for (let k in row) {
                let td = createAnyElement("td");
                td.innerHTML = row[k];
                tr.appendChild(td);

            }
            let btnGroup = createBtnGroup();
            tr.appendChild(btnGroup);
            tBody.appendChild(tr);
        }

    }
    /* 10. STEP: készítek egy segéd fv-t. (Mi a name??) Ezzel bármilyen html elemet le lehet gyártani.
    */

   function createAnyElement(name, attributes) {
    let element = document.createElement(name);
    for (let k in attributes) {
        element.setAttribute(k, attributes[k]);
    }
    return element;
}

/* 12. STEP: a gombcsoport létrehozása: 
14. lépésnél változik

function createBtnGroup() {
    let group = createAnyElement("div", {class: "btn btn-group"});
    let infoBtn = createAnyElement("button", {class: "btn btn-info"});
    infoBtn.innerHTML = `<i class="fa fa-refresh" aria-hidden="true"></i>`; 
    let delBtn = createAnyElement("button", {class: "btn btn-danger"});
    delBtn.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
    group.appendChild(infoBtn);
    group.appendChild(delBtn);

    let td = createAnyElement("td");
    td.appendChild(group);
    return td;
    
}
   */

/* 14. STEP:
*/ 

function createBtnGroup() {
    let group = createAnyElement("div", {class: "btn btn-group"});
    let infoBtn = createAnyElement("button", {class: "btn btn-info", onclick: "getInfo(this)"});
    infoBtn.innerHTML = `<i class="fa fa-refresh" aria-hidden="true"></i>`; 
    let delBtn = createAnyElement("button", {class: "btn btn-danger", onclick: "delRow(this)"});
    delBtn.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
    
    group.appendChild(infoBtn);
    group.appendChild(delBtn);

    let td = createAnyElement("td");
    td.appendChild(group);
    return td;
    
}
/* 15.STEP:

Próba:

function delRow(el) {
    console.log(el);
}
*/
/* 
function delRow(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    
    console.log( tr );
}
*/
/*
function delRow(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    let id = tr.querySelector("td:first-child").innerHTML;
    console.log( id );
}*/


/* 

15.STEP: fetch:

*/ 
function delRow(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    let id = tr.querySelector("td:first-child").innerHTML;
    let fetchOptions = {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache"
    };

    fetch(`http://localhost:3000/users/${id}`, fetchOptions).then(
        resp => res.json(),
        err => console.error(err)
    ).then(
        data => {
            startGetUsers();

        }
    );

}

/* 16.STEP: új user sor létrehozása: 

*/

function newUserRow(row) {
    let tr = createAnyElement("tr");
    for (let k in {id: "", name: "", email:""}) {
        let td = createAnyElement("td");
        let input = createAnyElement("input", {
            class: "form-control",
            name: k
        });

        td.appendChild(input);
        tr.appendChild(td)
    }

    /* 18. STEP: uj user beviteli gomb: 
    */


   let newBtn = createAnyElement("button", { 
    class: "btn btn-success", 
    onclick: "createUser(this)"
});
    newBtn.innerHTML = `<i class="fa fa-plus-circle" aria-hidden="true"></i>`
    let td = createAnyElement("td");
    td.appendChild(newBtn);
    tr.appendChild(td);

// eddig van a 18-as




    return tr;
}

/* 19.STEP:
*/
function createUser(btn) {
    let tr = btn.parentElement.parentElement; 
    let data = getRowData(tr);
    console.log(data);
}

function getRowData(tr) {
    let inputs = tr.querySelectorAll("input.form-control");
    let data = {};
    for (let i = 0; i < inputs.length; i++) {
        data[inputs[i].name] = inputs[i].value;
    }
    return data;
}

