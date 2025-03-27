let arrlinks = JSON.parse(localStorage.getItem("ss35Lt2")) || [];

console.log("arrlinks: ", arrlinks);


const btnAdd = document.querySelector(".btnAdd");
let overLay = document.querySelector(".overlay");
let closeModal = document.querySelector("#closeModal");
let btnSave = document.querySelector("#btnSave");

let nameWeb = document.querySelector("#name");
let url = document.querySelector("#url");
let errName = document.querySelector("#errName");
let errUrl = document.querySelector("#errUrl");
let listData = document.querySelector(".listData");

const renderData = () => {
    listData.innerHTML = "";

    listData.innerHTML = arrlinks.map((item, index) => {
        return `
            <div class="item">
                <p class="icon-close"><span onclick="delItem(${index})">✖︎</span></p>

                <div class="item-data">
                    <a href="${item.url}" target="_blank">
                    ${item.name}
                    </a>
                </div>
            </div>
        `;
    }).join("");
}
renderData();

btnAdd.addEventListener("click", function () {
    overLay.style.display = "block";
});

closeModal.addEventListener("click", function () {
    overLay.style.display = "none";
});

nameWeb.addEventListener("input", function () {
    nameWeb.value.trim() ? errName.style.display = "none" : errName.style.display = "block";
});
url.addEventListener("input", function () {
    url.value.trim() ? errUrl.style.display = "none" : errUrl.style.display = "block";
});

btnSave.addEventListener("click", function () {
    if (nameWeb.value.trim()) {
        if (url.value.trim()) {
            newObj = {
                name: nameWeb.value.trim(),
                url: url.value.trim()
            }

            arrlinks.push(newObj);
            localStorage.setItem("ss35Lt2", JSON.stringify(arrlinks));
            renderData();

            nameWeb.value = "";
            url.value = "";

            overLay.style.display = "none";
        } else {
            errUrl.style.display = "block";
        }
    } else {
        errName.style.display = "block";
    }
})

function delItem(index) {
    let check = confirm(`Có chắn chắn xóa: ${arrlinks[index].name}`);
    if (check) {
        arrlinks.splice(index, 1);
        localStorage.setItem("ss35Lt2", JSON.stringify(arrlinks));
        renderData();
    }
}




