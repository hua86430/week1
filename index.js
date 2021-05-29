const addBtn = document.querySelector("#addProduct");
const title = document.querySelector("#title");
const originPrice = document.querySelector("#origin_price");
const price = document.querySelector("#price");
const productList = document.querySelector("#productList");
const productCount = document.querySelector("#productCount");

let productData = [];

// 渲染畫面
function renderData (data) {
  let str = "";
  data.forEach((item) => {
    str += `<tr>
    <th>${item.productTitle}</th>
    <th width="120">
    ${item.productOriginPrice}
    </th>
    <th width="120">
    ${item.productPrice}
    </th>
    <th width="150">
    <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="${item.id}" ${item.productOnOff ? 'checked' : ''} data-id="${item.id}" data-action="status">
          <label class="form-check-label" for="${item.id}">${item.productOnOff ? '啟用' : '未啟用'}</label>
        </div>
    </th>
    <th width="120">
        <button type="button" class="btn btn-sm btn-danger" data-id="${item.id}" data-action="remove"> 刪除 </button>
    </th>
</tr>`;
  });
  productList.innerHTML = str;
  productCount.textContent = data.length;
}

// 新增資料
function addData () {
  if (title.value !== "") {
    productData.push({
      "productTitle": title.value,
      "productOriginPrice": originPrice.value,
      "productPrice": price.value,
      "productOnOff": false,
      "id": Date.now()
    });
  }
  renderData(productData);
  title.value = "";
  originPrice.value = "";
  price.value = "";
}

addBtn.addEventListener('click', addData);


// 切換狀態

function statusToggle (id) {
  productData.forEach((item) => {
    if (id == item.id) {
      item.productOnOff = !item.productOnOff;
    }
  });
  renderData(productData);
}

// 刪除單筆資料

function removeData (id) {
  let index = 0;
  productData.forEach((item, i) => {
    if (id == item.id) {
      index = i;
    }
  });
  productData.splice(index, 1);
  renderData(productData);
}

// 切換,刪除單筆事件
function clickEvent (e) {
  const action = e.target.dataset.action;
  const id = e.target.dataset.id;
  if (action === "remove") {
    removeData(id);
  } else if (action === "status") {
    statusToggle(id);
  }
}
productList.addEventListener('click', clickEvent);

// 刪除全部資料

const clearAllBtn = document.querySelector("#clearAll");
function clearAllData (e) {
  e.preventDefault();
  productData = [];
  renderData(productData);
}
clearAllBtn.addEventListener('click', clearAllData);
