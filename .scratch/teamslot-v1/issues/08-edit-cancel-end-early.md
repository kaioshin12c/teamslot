# 08: Sửa / huỷ / End Early

**What to build:** Từ trang chi tiết của một Booking, Booker sửa được tiêu đề, ghi chú, Room và giờ nếu Booking chưa bắt đầu, và huỷ được (có hỏi xác nhận). Với Booking đang diễn ra, Booker chỉ đổi được tiêu đề, ghi chú và giờ kết thúc (kéo dài hoặc rút ngắn), và bấm được End Early. Owner huỷ được Booking chưa bắt đầu và End Early được Booking đang diễn ra của bất kỳ ai, nhưng không sửa nội dung Booking của người khác. Booking đã kết thúc hoặc đã huỷ thì không thao tác được nữa. Cancelled Booking giữ lại Cancellation Reason (`by_booker`/`by_owner`) và người đã huỷ.

**Blocked by:** 06 (Đặt Booking + Conflict)

**Status:** ready-for-agent

- [ ] Có service `updateBooking`, `cancelBooking`, `endEarly`, test qua tầng service với Clock giả.
- [ ] Sửa Booking chưa bắt đầu áp đủ các quy tắc của `createBooking`, kể cả Conflict (bỏ qua chính Booking đang sửa).
- [ ] Booking đang diễn ra: đổi giờ bắt đầu hoặc Room thì nhận `BookingAlreadyStarted`. Giờ kết thúc mới phải `>= ceil15(now)`, căn bước 15 phút, cùng ngày địa phương, không gây Conflict.
- [ ] End Early đặt `end = ceil15(now)`. Booking vẫn là Active Booking và không có Cancellation Reason.
- [ ] Huỷ Booking đã bắt đầu thì bị từ chối (phải dùng End Early). Thao tác với Booking đã kết thúc thì nhận `BookingAlreadyEnded`, với Booking đã huỷ thì nhận `BookingCancelled`.
- [ ] Sau khi huỷ, khung giờ đó đặt lại được (constraint chỉ áp cho Active Booking).
- [ ] Test ma trận quyền cho từng thao tác với người ngoài Team, Member khác, Booker và Owner. Riêng Owner sửa nội dung Booking của người khác thì nhận `NotBooker`.
- [ ] Cancelled Booking lưu `cancelled_at`, `cancelled_by`, `cancellation_reason` đúng.
- [ ] UI: trên lịch, nút sửa, huỷ, End Early chỉ hiện khi người dùng có quyền và trạng thái của Booking cho phép.
