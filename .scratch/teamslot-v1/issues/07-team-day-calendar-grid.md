# 07: Lịch ngày dạng lưới

**What to build:** Trên màn hình rộng, `/t/$teamId?date=…` hiện lịch theo ngày: mỗi Room đang hoạt động là một cột, lưới 15 phút, mặc định cuộn tới 07:00–21:00 nhưng xem được đủ 24 giờ. Member kéo chuột trên các ô trống để mở form đặt (ticket 06) với Room và giờ điền sẵn. Mỗi Booking hiện tiêu đề, giờ và Booker (tên, avatar). Booking của chính mình có màu khác. Bấm vào Booking thì xem chi tiết, kể cả ghi chú. Có nút ngày trước/sau, chọn ngày, "Hôm nay", và vạch "bây giờ" khi xem hôm nay. Có công tắc "Hiện lịch đã huỷ" (mặc định tắt), lịch đã huỷ có kiểu hiển thị riêng. Trên mobile, trang chuyển thành danh sách Booking của ngày gom theo Room, kèm nút "Đặt lịch".

**Blocked by:** 06 (Đặt Booking + Conflict)

**Status:** ready-for-agent

- [ ] Lưới dùng đúng Team Time Zone. Booking hiển thị đúng vị trí và độ dài, cả với Team có múi giờ khác múi giờ của máy.
- [ ] Không kéo chọn được vùng đang có Active Booking. Vùng kéo được căn theo bước 15 phút.
- [ ] Xem được các ngày đã qua. Ô quá khứ không kéo chọn để đặt được.
- [ ] `listTeamDay` có tuỳ chọn lấy kèm Cancelled Booking, có test qua tầng service.
- [ ] Dữ liệu được làm mới khi focus lại tab và sau mỗi thao tác.
- [ ] Ở breakpoint mobile thì hiện danh sách thay cho lưới, có đủ thông tin tương đương.
- [ ] Ngày nằm trong URL (`?date=YYYY-MM-DD`). Mặc định là hôm nay theo Team Time Zone.
