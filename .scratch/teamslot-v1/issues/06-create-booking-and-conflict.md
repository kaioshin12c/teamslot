# 06: Đặt Booking + Conflict

**What to build:** Member mở form "Đặt lịch" trên `/t/$teamId?date=…`, chọn Room, ngày, giờ bắt đầu và kết thúc (bước 15 phút), nhập tiêu đề (bắt buộc) và ghi chú (tuỳ chọn) để tạo Booking. Trang hiện danh sách Booking của ngày đang chọn, gom theo Room, ghi tiêu đề, giờ và Booker. Lưới lịch thuộc ticket 07. Hệ thống không bao giờ để hai Active Booking của cùng một Room chồng lên nhau, kể cả khi hai người bấm cùng lúc (ADR-0002). Mọi giờ hiển thị theo Team Time Zone.

**Blocked by:** 05 (Quản lý Room)

**Status:** ready-for-agent

- [ ] Module Time thuần, có test đơn vị: chuyển giờ địa phương sang UTC và ngược lại theo Team Time Zone, kiểm tra căn bước 15 phút, `floor15`/`ceil15`, kiểm tra "cùng ngày địa phương" (cho phép `end` đúng 00:00 hôm sau), khoảng UTC của một ngày địa phương (đúng cả ngày chuyển DST, vd America/New_York).
- [ ] Schema `booking` đầy đủ theo spec: status, các cột về huỷ, CHECK `starts_at < ends_at`, CHECK nhất quán giữa các cột huỷ, các index. Exclusion constraint `btree_gist` trên `(room_id, tstzrange(starts_at, ends_at, '[)'))` chỉ áp khi `status = 'active'`.
- [ ] Có service `createBooking` và `listTeamDay(teamId, localDate)`.
- [ ] Validate khi tạo, mỗi lỗi có test riêng: `SlotNotAligned`, `InvalidTimeRange`, `BookingInPast` (cho phép `start >= floor15(now)`, tức lúc 9:07 đặt được 9:00–10:00), `BookingCrossesMidnight`, `BookingTooFarAhead` (quá 60 ngày), `RoomArchived`, tiêu đề rỗng, `NotMember`.
- [ ] Test Conflict: chồng hoàn toàn và chồng một phần thì bị chặn. Nối đuôi, khác Room, hoặc chồng với Cancelled Booking (tạo trực tiếp trong test) thì được phép.
- [ ] Test đặt song song: hai lệnh `createBooking` chạy đồng thời vào cùng khung giờ thì đúng một lệnh thành công, lệnh kia nhận `BookingConflict`.
- [ ] Vi phạm constraint (SQLSTATE `23P01`) được ánh xạ thành `BookingConflict`. Bước kiểm tra trước cho biết Booking bị trùng khi tìm được.
- [ ] UI: gặp `BookingConflict` thì hiện thông báo trùng với Booking nào, hoặc "Khung giờ này vừa có người đặt", rồi tải lại dữ liệu ngày. Đặt thành công thì Booking mới hiện ngay.
- [ ] Form ghi rõ Team Time Zone đang dùng.
