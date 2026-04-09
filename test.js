let reservations = [];

    function addReservation() {
      const name = document.getElementById("name").value;
      const date = document.getElementById("date").value;

      if (!name || !date) {
        alert("入力してください");
        return;
      }

      reservations.push({ name, date });
      render();
      showToast();
    }

    function deleteReservation(index) {
      reservations.splice(index, 1);
      render();
    }

    function render() {
      const list = document.getElementById("list");
      list.innerHTML = "";

      reservations.forEach((r, i) => {
        const item = document.createElement("div");
        item.className = "item";

        item.innerHTML = `
          <div>
            <strong>${r.name}</strong><br>
            <small>${r.date}</small>
          </div>
          <button class="delete" onclick="deleteReservation(${i})">削除</button>
        `;

        list.appendChild(item);
      });
    }

    function showToast() {
      const toast = document.getElementById("toast");
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
      }, 2000);
    }