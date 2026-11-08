# 11: Cài đặt Team: đổi tên, đổi Team Time Zone, xoá Team

**What to build:** Trên `/t/$teamId/settings`, Owner đổi được tên Team và Team Time Zone. Trước khi đổi múi giờ, Owner được cảnh báo rằng giờ hiển thị của các Booking hiện có sẽ thay đổi, còn thời điểm tuyệt đối giữ nguyên. Owner xoá hẳn được Team sau khi gõ đúng tên Team để xác nhận, kéo theo xoá toàn bộ Member, Room và Booking. Trang này cũng là nơi đặt khu Invite Code của ticket 04, nếu ticket đó chưa đặt ở đây.

**Blocked by:** 03 (Tạo Team + danh sách Team)

**Status:** ready-for-agent

- [ ] Có service `updateTeam` và `deleteTeam`, test qua tầng service.
- [ ] Đổi Team Time Zone không thay đổi `starts_at`/`ends_at` đã lưu. Test xác nhận một Booking có sẵn vẫn giữ nguyên thời điểm UTC.
- [ ] `deleteTeam` với tên không khớp thì nhận `TeamNameMismatch`. Khớp thì xoá cascade, test xác nhận không còn Room hay Booking nào của Team đó.
- [ ] Member thường gọi `updateTeam`/`deleteTeam` thì nhận `NotOwner`. Member thường mở trang settings thì chỉ xem được hoặc không thấy các thao tác của Owner.
- [ ] Xoá xong thì chuyển về `/teams`. Team không còn trong danh sách của bất kỳ ai.
