# 12: My Schedule

**What to build:** Trang `/me` hiện My Schedule: mọi Booking do người dùng đặt, gộp từ mọi Team mà họ **đang là Member**, chia hai mục "Sắp tới" (gồm cả Booking đang diễn ra, sớm nhất ở trên) và "Đã qua" (mới nhất ở trên, có phân trang). Mỗi dòng có Team, Room, ngày giờ (theo Team Time Zone của Team đó), tiêu đề và trạng thái. Cancelled Booking hiện kèm Cancellation Reason ("Bạn đã huỷ", "Owner đã huỷ", "Tự động huỷ do phòng bị lưu trữ", "Tự động huỷ do rời Team"). Lọc được theo Team. Bấm vào một Booking thì mở đúng ngày đó trên lịch của Team.

**Blocked by:** 08 (Sửa / huỷ / End Early)

**Status:** ready-for-agent

- [ ] Có service `listMySchedule(actor, { section, teamId?, page })`, test qua tầng service với Clock giả.
- [ ] Gộp đúng Booking từ nhiều Team. Không bao giờ hiện Booking của người khác.
- [ ] Booking của Team mà người dùng đã rời hoặc bị xoá thì không hiện (theo quy tắc "phải là Member mới thấy dữ liệu Team" trong spec). Quay lại Team thì thấy lại.
- [ ] Phân loại đúng: Booking đang diễn ra nằm ở "Sắp tới", Booking có `end <= now` nằm ở "Đã qua". Cancelled Booking nằm theo thời gian ban đầu của nó.
- [ ] Phân trang "Đã qua" ổn định (thứ tự xác định khi nhiều Booking trùng `starts_at`).
- [ ] Lọc theo `teamId` của một Team mà người dùng không phải Member thì nhận `NotMember`.
- [ ] Mỗi Booking hiện giờ theo Team Time Zone của Team chứa nó, kể cả khi các Team khác múi giờ nhau.
- [ ] Có liên kết từ header hoặc điều hướng chung tới `/me`.
