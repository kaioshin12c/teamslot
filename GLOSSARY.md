# Teamslot

Ứng dụng web cho nhóm nhỏ đặt lịch dùng phòng họp chung, tránh trùng giờ.

## Language

### Tổ chức

**Team** (Nhóm):
Một nhóm người dùng chung một tập Room, có đúng một Owner và một múi giờ cố định.
_Avoid_: Workspace, Organization, Group

**Owner** (Chủ nhóm):
Thành viên duy nhất của Team có quyền quản lý Room, Member và Invite Code; quyền này chuyển được cho Member khác.
_Avoid_: Admin, Manager

**Member** (Thành viên):
Người dùng đã tham gia một Team và được đặt Booking trong các Room của Team đó. Owner cũng là một Member.
_Avoid_: User (khi đang nói trong phạm vi một Team), Participant

**Invite Code** (Mã mời):
Mã dùng để một người dùng tự tham gia vào một Team cụ thể. Mỗi Team chỉ có một Invite Code đang hiệu lực; Owner có thể đổi mã, mã cũ mất hiệu lực ngay.
_Avoid_: Join code, Invitation

**Invite Link** (Link mời):
Đường dẫn chứa sẵn Invite Code, là một cách khác để chia sẻ cùng một Invite Code.
_Avoid_: Join link

**Team Time Zone** (Múi giờ nhóm):
Múi giờ dùng để hiển thị và diễn giải mọi giờ giấc trong Team.

### Đặt lịch

**Room** (Phòng):
Một phòng họp thuộc một Team, là đơn vị được đặt lịch.
_Avoid_: Space, Resource

**Archived Room** (Phòng đã lưu trữ):
Room đã bị Owner ngừng sử dụng: không nhận Booking mới, nhưng vẫn giữ lịch sử và có thể khôi phục.
_Avoid_: Deleted room, Disabled room

**Booking** (Lịch đặt):
Một khoảng thời gian một Member giữ một Room, có tiêu đề, nằm trọn trong một ngày theo Team Time Zone.
_Avoid_: Reservation, Meeting, Event, Appointment

**Cancelled Booking** (Lịch đã huỷ):
Booking đã bị Booker hoặc Owner huỷ (hoặc bị huỷ tự động); vẫn được giữ trong lịch sử nhưng không còn giữ Room.
_Avoid_: Deleted booking

**Cancellation Reason** (Lý do huỷ):
Nguồn gốc của một Cancelled Booking: huỷ bởi Booker, huỷ bởi Owner, tự động do Room bị lưu trữ, hoặc tự động do Booker rời hay bị xoá khỏi Team.

**End Early** (Kết thúc sớm):
Thao tác dừng một Booking đang diễn ra bằng cách rút giờ kết thúc về hiện tại; Booking vẫn là Active Booking, không trở thành Cancelled Booking.
_Avoid_: Cancel (khi Booking đã bắt đầu)

**Active Booking** (Lịch hiệu lực):
Booking chưa bị huỷ. Chỉ Active Booking mới có thể gây Conflict.

**My Schedule** (Lịch của tôi):
Tập hợp mọi Booking mà một người dùng là Booker, gộp qua tất cả Team, cả sắp tới lẫn đã qua.
_Avoid_: My bookings, History

**Booker** (Người đặt):
Member đã tạo ra một Booking.
_Avoid_: Organizer, Host

**Conflict** (Trùng lịch):
Tình huống hai Active Booking của cùng một Room có khoảng thời gian giao nhau. Hai Booking nối đuôi nhau (một cái kết thúc đúng lúc cái kia bắt đầu) không tính là Conflict.
_Avoid_: Overlap, Clash
