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

let errID = document.querySelector("#codeError");
let errName = document.querySelector("#nameError");

let cateId = document.querySelector("#code");
let cateName = document.querySelector("#name");
let valueId = cateId.value?.trim();
let valueName = cateName.value?.trim();

let btnEditItem = document.querySelector("#editItem");
let indexEdit = -1;

cateId.addEventListener("input", function () {
    valueId ? errID.classList.add("d-none") : errID.classList.remove("d-none");
})
cateName.addEventListener("input", function () {
    valueName ? errID.classList.add("d-none") : errID.classList.remove("d-none");
})

const renderData = () => {
    // listData.innerHTML = "";

    listData.innerHTML = arrCategories.map((item, index) => {
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
renderData();


function addCategory() {
    if (valueId && valueName) {
        let valueStatus = document.getElementById("active").checked ? true : false;

        let objCat = {
            id: valueId,
            name: valueName,
            status: valueStatus
        }

        arrCategories.push(objCat);
        localStorage.setItem("arrCategories", JSON.stringify(arrCategories));
        renderData();

        cateId.value = "";
        cateName.value = "";
        document.getElementById("active").checked = true;

    } else {
        valueId ? errID.classList.add("d-none") : errID.classList.remove("d-none");
        valueName ? errName.classList.add("d-none") : errName.classList.remove("d-none");
    }
}

function delItem(index) {
    let check = confirm(`Có chắc chắn xóa danh mục: ${arrCategories[index].name}?`);

    if (check) {
        arrCategories.splice(index, 1);
        localStorage.setItem("arrCategories", JSON.stringify(arrCategories));
        renderData();
    }
}

let cateIdEdit = document.querySelector("#codeEdit");
let cateNameEdit = document.querySelector("#nameEdit");

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
    let errIDEdit = document.querySelector("#codeError");
    let errNameEdit = document.querySelector("#nameError");

    cateIdEdit.addEventListener("input", function () {
        valueIdEdit ? errIDEdit.classList.add("d-none") : errID.classList.remove("d-none");
    })
    cateNameEdit.addEventListener("input", function () {
        valueNameEdit ? errNameEdit.classList.add("d-none") : errID.classList.remove("d-none");
    })

    if (valueIdEdit && valueNameEdit) {
        let valueStatusEdit = document.getElementById("activeEdit").checked ? true : false;

        let objCat = {
            id: valueIdEdit,
            name: valueNameEdit,
            status: valueStatusEdit
        }

        arrCategories[indexEdit] = objCat;
        localStorage.setItem("arrCategories", JSON.stringify(arrCategories));
        renderData();

        let modalElement = document.querySelector("#modalEditCategory");
        let modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
    } else {
        valueIdEdit ? errID.classList.add("d-none") : errID.classList.remove("d-none");
        valueNameEdit ? errName.classList.add("d-none") : errName.classList.remove("d-none");
    }
});

