# 04: Invite Code + Invite Link

**What to build:** Owner thấy Invite Code hiện tại của Team, sao chép Invite Link (`/join/$code`) bằng một cú bấm, và đổi sang mã mới (mã cũ mất hiệu lực ngay). Người dùng nhập mã ở `/teams` hoặc mở Invite Link, thấy tên Team, bấm xác nhận là vào Team ngay với vai trò Member, không cần duyệt. Khách chưa đăng nhập mở Invite Link thì đi qua đăng nhập GitHub rồi quay lại đúng trang tham gia.

**Blocked by:** 03 (Tạo Team + danh sách Team)

**Status:** ready-for-agent

- [ ] Có service `previewInviteCode`, `joinByInviteCode`, `rotateInviteCode` với test qua tầng service.
- [ ] Input được chuẩn hoá trước khi so khớp: trim, upper-case, bỏ khoảng trắng và gạch ngang. Ví dụ ` abcd-2345 ` khớp với mã `ABCD2345`.
- [ ] Mã sai hoặc mã cũ thì báo lỗi `InvalidInviteCode`, UI hiện "Mã mời không hợp lệ".
- [ ] Join là idempotent: người đã là Member dùng lại mã thì được đưa vào Team, không báo lỗi, không tạo bản ghi trùng.
- [ ] Chỉ Owner xem và đổi được mã. Member thường gọi `rotateInviteCode` thì nhận `NotOwner`.
- [ ] Sau khi đổi mã, mã cũ không dùng được nữa. Member đã vào trước đó không bị ảnh hưởng.
- [ ] Luồng Invite Link khi chưa đăng nhập hoạt động end-to-end và quay về đúng `/join/$code`.
