# 05: Quản lý Room (tạo/sửa/xem)

**What to build:** Owner thêm Room với tên, sức chứa (tuỳ chọn) và mô tả (tuỳ chọn), và sửa được thông tin Room tại `/t/$teamId/rooms`. Member mở được trang này để xem danh sách Room (tên, sức chứa, mô tả) nhưng không có thao tác sửa. Archive và restore thuộc ticket 10.

**Blocked by:** 03 (Tạo Team + danh sách Team)

**Status:** ready-for-agent

- [ ] Có schema `room`, gồm cả cột `archived_at` (nullable) để ticket 10 dùng.
- [ ] Service `createRoom`, `updateRoom`, `listRooms` có test qua tầng service.
- [ ] Tên Room rỗng thì bị từ chối. Sức chứa nếu có phải là số nguyên dương.
- [ ] Member thường gọi `createRoom`/`updateRoom` thì nhận `NotOwner`. Người ngoài Team gọi `listRooms` thì nhận `NotMember`.
- [ ] Không sửa được Room của Team khác dù biết id (ngoài Team thì nhận `NotFound` hoặc `NotMember`).
