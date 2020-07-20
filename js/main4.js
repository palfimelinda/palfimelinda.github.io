//USers kulcsok

let keys = ["id", "name", "email"];

//Adat fogadás a szerverről

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
    function startGetUsers() {
        getServerData("http://localhost:3000/users").then(
           data => fillDataTable(data, "userTable"));
      }
    
    document.querySelector("#getDataBtn").addEventListener("click", startGetUsers);
  
    //Feltölteni a táblázatot a szerver adatokkal

   function fillDataTable(data, tableID) {
    let table = document.querySelector(`#${tableID}`);
    if (!table) {
        console.error(`Table "${tableID}" is not found.`);
        return;
    }
    
    // UJ felhasználói sor hozzáadása a táblához

    let tBody = table.querySelector("tbody");
    tBody.innerHTML = "";
    let newRow = newUserRow();
    tBody.appendChild(newRow);
        for (let row of data) {
            let tr = createAnyElement("tr");
            for (let k of keys) {
                let td = createAnyElement("td");
                let input = createAnyElement("input", {
                    class: "form-control",
                    value: row[k],
                    name: k
                });
                if (k == "id") {
                   input.setAttribute("readonly", true);
               }
                td.appendChild(input);
                tr.appendChild(td);

            }
            let btnGroup = createBtnGroup();
            tr.appendChild(btnGroup);
            tBody.appendChild(tr);
        }

    }
   

//Egy segéd függvény amivel html elemeket lehet gyártani

function createAnyElement(name, attributes) {
    let element = document.createElement(name);
    for (let k in attributes) {
        element.setAttribute(k, attributes[k]);
    }
    return element;
}

// A gombcsoport létrehozása

function createBtnGroup() {
    let group = createAnyElement("div", {class: "btn btn-group"});
    let infoBtn = createAnyElement("button", {onclick: "setRow(this)", class: "btn btn-info"});
    infoBtn.innerHTML = `<i class="fa fa-refresh" aria-hidden="true"></i>`; 
    let delBtn = createAnyElement("button", {onclick: "delRow(this)", class: "btn btn-danger"});
    delBtn.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;

    group.appendChild(infoBtn);
    group.appendChild(delBtn);

    let td = createAnyElement("td");
    td.appendChild(group);
    return td;
    
}
// A törlő gomb üzembe helyzése
function delRow(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    let id = tr.querySelector("td:first-child").innerHTML;
    let fetchOptions = {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache"
    };

    fetch(`http://localhost:3000/users/${id}`, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        data => {
            startGetUsers();

        }
    );

}



//Uj felhasználó létrehozása

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

    let newBtn = createAnyElement("button", { 
        class: "btn btn-success", 
        onclick: "createUser(this)"
    });
        newBtn.innerHTML = `<i class="fa fa-plus-circle" aria-hidden="true"></i>`
        let td = createAnyElement("td");
        td.appendChild(newBtn);
        tr.appendChild(td);

    return tr;
}

// Az új felhasználó

function createUser(btn) {
    let tr = btn.parentElement.parentElement; 
    let data = getRowData(tr);
    delete data.id;
    let fetchOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    
 fetch(`http://localhost:3000/users`, fetchOptions).then(
    resp => resp.json(),
    err => console.error(err)
).then(
    data => startGetUsers()
);
}

//

function getRowData(tr) {
    let inputs = tr.querySelectorAll("input.form-control");
    let data = {};
    for (let i = 0; i < inputs.length; i++) {
        data[inputs[i].name] = inputs[i].value;
    }
    return data;
}



//Adat beállítás

function setRow(btn){
    let tr = btn.parentElement.parentElement.parentElement;
    let data = getRowData(tr);
    let fetchOptions = {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    return fetch(`http://localhost:3000/users/${data.id}`, fetchOptions).then(
        response => response.json(),
        err => console.error(err)
    ).then(
        data => startGetUsers()
    );

}