let arrCategories = JSON.parse(localStorage.getItem("arrCategories")) ||
    [
        { id: 'DM001', name: 'Quần áo', status: true },
        { id: 'DM002', name: 'Kính mắt', status: false },
        { id: 'DM003', name: 'Giày dép', status: true },
        { id: 'DM004', name: 'Thời trang nam', status: false },
        { id: 'DM005', name: 'Thời trang nữ', status: false },
        { id: 'DM006', name: 'Hoa quả', status: false },
        { id: 'DM007', name: 'Rau', status: true },
        { id: 'DM008', name: 'Điện thoại', status: false },
    ];

let listData = document.querySelector("#listData");
let select = document.querySelector("#selectStatus");

let errID = document.querySelector("#codeError");
let errName = document.querySelector("#nameError");

let cateId = document.querySelector("#code");
let cateName = document.querySelector("#name");


let btnEditItem = document.querySelector("#editItem");
let indexEdit = -1;

const renderData = (arr) => {
    // listData.innerHTML = "";

    listData.innerHTML = arr.map((item, index) => {
        return `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td><span class="${item.status ? 'badge-success' : 'badge-danger'}">${item.status ? '● Đang hoạt động' : '● Ngừng hoạt động'}</span></td>
                <td>
                    <button class="icon-btn" onclick="delItem(${index})">
                        <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                        width="20" /> 
                    </button>
                    <button class="icon-btn"  onclick="editItem(${index})" data-bs-toggle="modal"
                        data-bs-target="#modalEditCategory">
                        <img src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
                        width="20" />
                    </button>
                </td>
            </tr>
        `;
    }).join("");
}
renderData(arrCategories);

select.addEventListener("change", function () {
    let newArr = [];

    if (select.value === "true") {
        newArr = arrCategories.filter(item => item.status === true);
    } else {
        newArr = arrCategories.filter(item => item.status === false);
    }
    renderData(newArr);
})

cateId.addEventListener("input", function () {
    cateId.value.trim() ? errID.classList.add("d-none") : errID.classList.remove("d-none");
});
cateName.addEventListener("input", function () {
    cateName.value.trim() ? errName.classList.add("d-none") : errName.classList.remove("d-none");
});

function addCategory() {
    let valueId = cateId.value?.trim();
    let valueName = cateName.value?.trim();
    if (valueId) {
        if (valueName) {
            let valueStatus = document.getElementById("active").checked ? true : false;

            let objCat = {
                id: valueId,
                name: valueName,
                status: valueStatus
            }

            arrCategories.push(objCat);
            localStorage.setItem("arrCategories", JSON.stringify(arrCategories));
            renderData(arrCategories);

            cateId.value = "";
            cateName.value = "";
            document.getElementById("active").checked = true;
        } else {
            errName.classList.remove("d-none");
        }
    } else {
        errID.classList.remove("d-none");
    }
}

function delItem(index) {
    let check = confirm(`Có chắc chắn xóa danh mục: ${arrCategories[index].name}?`);

    if (check) {
        arrCategories.splice(index, 1);
        localStorage.setItem("arrCategories", JSON.stringify(arrCategories));
        renderData(arrCategories);
    }
}

let cateIdEdit = document.querySelector("#codeEdit");
let cateNameEdit = document.querySelector("#nameEdit");
let errIDEdit = document.querySelector("#codeErrorEdit");
let errNameEdit = document.querySelector("#nameErrorEdit");

cateIdEdit.addEventListener("input", function () {
    cateIdEdit.value.trim() ? errIDEdit.classList.add("d-none") : errIDEdit.classList.remove("d-none");
})
cateNameEdit.addEventListener("input", function () {
    cateNameEdit.value.trim() ? errNameEdit.classList.add("d-none") : errNameEdit.classList.remove("d-none");
})

function editItem(index) {
    indexEdit = index;
    cateIdEdit.value = arrCategories[index].id;
    cateNameEdit.value = arrCategories[index].name;

    arrCategories[index].status
        ? document.getElementById("activeEdit").checked = true
        : document.getElementById("inactiveEdit").checked = true;
}
btnEditItem.addEventListener("click", function () {
    let valueIdEdit = cateIdEdit.value?.trim();
    let valueNameEdit = cateNameEdit.value?.trim();

    if (valueIdEdit) {
        if (valueNameEdit) {
            let valueStatusEdit = document.getElementById("activeEdit").checked ? true : false;

            let objCat = {
                id: valueIdEdit,
                name: valueNameEdit,
                status: valueStatusEdit
            }

            arrCategories[indexEdit] = objCat;
            localStorage.setItem("arrCategories", JSON.stringify(arrCategories));
            renderData(arrCategories);

            let modalElement = document.querySelector("#modalEditCategory");
            let modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance.hide();

        } else {
            errNameEdit.classList.remove("d-none");
        }
    } else {
        errIDEdit.classList.remove("d-none");
    }
});




