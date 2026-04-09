let reservations = [];

/* ===== 初期読み込み ===== */
window.onload = function () {
  const saved = localStorage.getItem("reservations");
  if (saved) {
    reservations = JSON.parse(saved);
  }
  renderReservations();
};

/* ===== 追加 ===== */
function addReservation() {
  const name = document.getElementById("name").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (!name || !date || !time) {
    alert("すべて入力してください");
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  if (date < today) {
    alert("過去の日付は選べません");
    return;
  }

  const exists = res2rvations.some(res => res.date === date && res.time === time);
  if (exists) {
    alert("その時間はすでに予約されています");
    return;
  }

  reservations.push({ name, date, time });

  saveData();
  renderReservations();
  clearForm();
}

/* ===== 表示 ===== */
function renderReservations() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  if (reservations.length === 0) {
    list.innerHTML = '<div class="empty">予約がありません</div>';
    return;
  }

  reservations.forEach((res, index) => {
    const div = document.createElement("div");
    div.className = "reservation";

    div.innerHTML = `
      <div>
        <strong>${res.name}</strong><br>
        ${res.date} / ${res.time}
      </div>
      <button class="button button-danger" onclick="deleteReservation(${index})">削除</button>
    `;

    list.appendChild(div);
  });
}

/* ===== 削除 ===== */
function deleteReservation(index) {
  if (confirm("削除しますか？")) {
    reservations.splice(index, 1);
    saveData();
    renderReservations();
  }
}

/* ===== 保存 ===== */
function saveData() {
  localStorage.setItem("reservations", JSON.stringify(reservations));
}

/* ===== リセット ===== */
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("date").value = "";
  document.getElementById("time").value = "";
}