// /*
// !1 get total
// ? great products
// todo:save local storage
// ? clear input
// ? reed
// ?count
// ?delete
// ?updTE
// ?search
// ?clean data
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("create");
let mod = e = "create";
let tem;
function getTotal() {
    if (price.value != "") {
        let result =
            +price.value +
            (+taxes.value || 0) +
            (+ads.value || 0) -
            (+discount.value || 0);
        total.innerHTML = result;
        total.style.background = "#040";
    } else {
        total.innerHTML = "";
        total.style.background = "#a00";
    }
}

let dataPro = [];
if (localStorage.products != null) {
    dataPro = JSON.parse(localStorage.products);
}

submit.onclick = function () {
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    if(title.value != "" && price.value != "" && count.value <= 50 && category.value != "") {
        if (mod === "create") {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    dataPro.push(newpro);
                }
            } else {
                dataPro.push(newpro);
            }
            clearInput();
        } else {
            dataPro[tem] = newpro;
            mod = "create";
            submit.innerHTML = "create";
            count.style.display = "block";
        }
    }
    else {
        dataPro[tem] = newpro;
        mod = "create";
        submit.innerHTML = "create";
        count.style.display = "block";
    }
    localStorage.setItem("products", JSON.stringify(dataPro));
    showData();
}

function clearInput() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

function showData() {
    getTotal();
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})">update</button></td>
            <td><button onclick="deleteData(${i})">delete</button></td>
        </tr>`;
    }
    document.getElementById("tbody").innerHTML = table;
    let deleteAllBtn = document.getElementById("deleteALL");
    if(dataPro.length > 0) {
        deleteAllBtn.innerHTML = `
        <button onclick="deleteAll()">delete All(${dataPro.length}) </button>`;
    }

}

showData();
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.products = JSON.stringify(dataPro);
    showData();
 }

function deleteAll() {
        localStorage.clear();
        dataPro.splice(0);
        showData();
}


function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = "none";
    submit.innerHTML = "update";
    let updateBtn = document.getElementById("update");
    // updateBtn.setAttribute("onclick", `saveUpdate(${i})`);
    mod = "update";
    scroll({
        top: 0,
        behavior: "smooth",
    });
    tem = i;
}let searchMOod = "title";

function getSearchMode(id) {
    let search = document.getElementById("search");
    if (id == "searchtotal") {
        searchMOod = "title";
    } else {
        searchMOod = "category";
    }
    search.placeholder = "search by " + searchMOod;
    search.focus();
    search.value = "";

}
function searchData(value) {
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMOod == "title") {

            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})">update</button></td>
            <td><button onclick="deleteData(${i})">delete</button></td>
        </tr>`;
            }
        }
            else {
                if (dataPro[i].category.includes(value.toLowerCase())) {
                    table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})">update</button></td>
            <td><button onclick="deleteData(${i})">delete</button></td>
        </tr>`;
                }
            }
            document.getElementById("tbody").innerHTML = table;
        }
    }