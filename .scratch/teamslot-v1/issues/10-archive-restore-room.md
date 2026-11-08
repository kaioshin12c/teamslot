# 10: Archive / restore Room

**What to build:** Owner lưu trữ một Room trên `/t/$teamId/rooms`. Trước khi xác nhận, Owner thấy có bao nhiêu Booking tương lai sẽ bị huỷ. Khi lưu trữ, các Booking chưa bắt đầu của Room đó bị huỷ tự động (lý do `room_archived`), Booking đang diễn ra được End Early, Booking đã qua giữ nguyên. Archived Room biến mất khỏi lịch đặt và form đặt, nhưng Booking cũ của nó vẫn có trong lịch sử. Owner xem được danh sách Archived Room và khôi phục được Room. Khôi phục không khôi phục lại các Booking đã bị huỷ.

**Blocked by:** 05 (Quản lý Room), 08 (Sửa / huỷ / End Early)

**Status:** ready-for-agent

- [ ] Có service `archiveRoom`, `restoreRoom` và bước xem trước số Booking bị ảnh hưởng, test qua tầng service với Clock giả.
- [ ] Huỷ tự động và End Early chạy trong cùng transaction với việc lưu trữ. Test kiểm tra đủ ba nhóm Booking như ticket 09.
- [ ] `createBooking`/`updateBooking` vào Archived Room thì nhận `RoomArchived`.
- [ ] `listRooms` mặc định bỏ qua Archived Room, có tuỳ chọn để lấy chúng.
- [ ] Lịch ngày của một ngày đã qua vẫn hiện Booking của Room nay đã lưu trữ (cột Room đó chỉ hiện khi ngày đó có Booking của nó).
- [ ] Khôi phục xong thì Room đặt được lại. Các Booking đã huỷ vẫn ở trạng thái Đã huỷ.
- [ ] Chỉ Owner lưu trữ và khôi phục được (`NotOwner`).
