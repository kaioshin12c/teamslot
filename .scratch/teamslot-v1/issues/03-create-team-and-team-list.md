# 03: Tạo Team + danh sách Team

**What to build:** Người dùng đăng nhập tạo được Team với tên và Team Time Zone (mặc định Asia/Ho_Chi_Minh, chọn từ danh sách múi giờ IANA) và tự động trở thành Owner kiêm Member. `/teams` liệt kê mọi Team người dùng đang tham gia, kèm vai trò (Owner/Member). Người chưa có Team nào thấy hai lựa chọn "Tạo Team" và "Nhập Invite Code" (ô nhập mã chỉ được nối vào ở ticket 04). Bấm vào một Team thì mở `/t/$teamId`, lúc này mới là khung trang có tên Team và điều hướng tới các trang con. Người không phải Member mở `/t/$teamId` thì bị chặn.

**Blocked by:** 01 (Scaffold + đăng nhập GitHub + bộ test)

**Status:** ready-for-agent

- [ ] Có schema `team` và `team_member`. Invite Code được sinh ngay khi tạo Team (8 ký tự, bảng chữ bỏ 0/O/1/I, duy nhất), dù UI để xem mã thuộc ticket 04.
- [ ] Service `createTeam`, `listMyTeams`, `getTeam` có test qua tầng service.
- [ ] Tên Team rỗng (sau khi trim) hoặc Team Time Zone không hợp lệ thì bị từ chối.
- [ ] `team.owner_id` là người tạo và người đó có trong `team_member`.
- [ ] Người không phải Member gọi `getTeam` thì nhận lỗi `NotMember`. UI hiện trang báo không có quyền hoặc không tìm thấy.
- [ ] `/teams` hiện đúng vai trò của người dùng trong từng Team.
