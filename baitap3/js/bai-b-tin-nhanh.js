/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

const oTimKiem = document.getElementById("o-tim-kiem");
const dsTin = document.getElementById("list");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const nutDang = document.getElementById("nut-dang");
const baoLoi = document.getElementById("bao-loi");

// F1 + F2 + F3. Bộ đếm và Lọc tin khi gõ (sự kiện keyup) + thông báo #khong-thay
function locTin() {
	const tuKhoa = oTimKiem.value.toLowerCase();
	const cacMuc = Array.from(dsTin.querySelectorAll("li"));
	let soHien = 0;

	for (const muc of cacMuc) {
		const h3 = muc.querySelector("h3");
		const p = muc.querySelector("p");
		const tieuDe = h3 ? h3.textContent : "";
		const noiDung = p ? p.textContent : "";
		const vanBan = (tieuDe + " " + noiDung).toLowerCase();

		if (vanBan.includes(tuKhoa)) {
			muc.classList.remove("an");
			soHien++;
		} else {
			muc.classList.add("an");
		}
	}

	if (soHien === 0) {
		khongThay.classList.remove("an");
		khongThay.textContent = `Không tìm thấy tin nào cho "${oTimKiem.value}"`;
	} else {
		khongThay.classList.add("an");
	}

	boDem.textContent = `Đang hiển thị ${soHien}/${cacMuc.length} tin`;
}

// Cập nhật bộ đếm và trạng thái ban đầu khi tải trang
locTin();

// Lắng nghe sự kiện gõ phím trên ô tìm kiếm
oTimKiem.addEventListener("keyup", locTin);

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list
dsTin.addEventListener("click", (e) => {
	if (e.target && e.target.classList.contains("more")) {
		const muc = e.target.closest("li");
		if (!muc) return;
		const doanVan = muc.querySelector("p");
		if (!doanVan) return;

		if (doanVan.classList.contains("day-du")) {
			doanVan.classList.remove("day-du");
			e.target.textContent = "Read more >>";
		} else {
			doanVan.classList.add("day-du");
			e.target.textContent = "Thu gọn <<";
		}
	}
});

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list
nutDang.addEventListener("click", () => {
	const tieuDe = oTieuDe.value.trim();
	const noiDung = oNoiDung.value.trim();

	if (tieuDe === "" || noiDung === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}

	const mucMoi = document.createElement("li");

	const spanTime = document.createElement("span");
	spanTime.className = "time";
	spanTime.textContent = homNay();

	const h3 = document.createElement("h3");
	h3.textContent = oTieuDe.value;

	const p = document.createElement("p");
	p.textContent = oNoiDung.value;

	const btnMore = document.createElement("button");
	btnMore.type = "button";
	btnMore.className = "more";
	btnMore.textContent = "Read more >>";

	mucMoi.append(spanTime, h3, p, btnMore);
	dsTin.prepend(mucMoi);

	oTieuDe.value = "";
	oNoiDung.value = "";
	baoLoi.textContent = "";

	locTin();
});
