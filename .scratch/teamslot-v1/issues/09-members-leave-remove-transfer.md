# 09: Member: xem, rời, xoá, chuyển quyền Owner

**What to build:** `/t/$teamId/members` liệt kê mọi Member (tên, avatar, ai là Owner) cho mọi Member xem. Member rời được Team. Owner xoá được Member khác và chuyển được quyền Owner cho một Member hiện tại; sau khi chuyển, Owner cũ thành Member thường. Owner bấm rời Team thì được báo phải chuyển quyền trước. Khi một người rời hoặc bị xoá: các Booking chưa bắt đầu của họ trong Team bị huỷ tự động (lý do `member_left` / `member_removed`), Booking đang diễn ra được End Early, còn Booking đã qua giữ nguyên trong lịch sử. Người bị xoá vẫn có thể quay lại nếu có Invite Code đang hiệu lực.

**Blocked by:** 04 (Invite Code + Invite Link), 08 (Sửa / huỷ / End Early)

**Status:** ready-for-agent

- [ ] Có service `listMembers`, `leaveTeam`, `removeMember`, `transferOwnership`, test qua tầng service.
- [ ] Owner gọi `leaveTeam` thì nhận `OwnerCannotLeave`. Owner không tự xoá được chính mình bằng `removeMember`.
- [ ] `transferOwnership` chỉ chấp nhận người nhận là Member hiện tại. Sau khi chuyển, `owner_id` đổi và Owner cũ vẫn là Member.
- [ ] Huỷ tự động và End Early chạy trong cùng transaction với việc xoá Member. Test kiểm tra đủ ba nhóm: Booking chưa bắt đầu (bị huỷ, đúng lý do, `cancelled_by` null), Booking đang diễn ra (được End Early), Booking đã qua (giữ nguyên).
- [ ] Người đã rời hoặc bị xoá không đọc được dữ liệu Team nữa (`NotMember`). Join lại bằng mã hiện tại thì thành công.
- [ ] Member thường gọi `removeMember`/`transferOwnership` thì nhận `NotOwner`.
- [ ] UI có bước xác nhận trước khi rời, xoá Member hoặc chuyển quyền.
