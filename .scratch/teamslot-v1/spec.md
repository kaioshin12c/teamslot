# Teamslot v1: đặt phòng họp cho nhóm nhỏ

Status: ready-for-agent

Thuật ngữ theo `GLOSSARY.md`. Quyết định kiến trúc: `docs/adr/0001-tanstack-start-better-auth-drizzle.md`, `docs/adr/0002-conflict-enforced-by-db-exclusion-constraint.md`.

## Problem Statement

Các nhóm nhỏ (CLB, team dự án, công ty vài chục người) dùng chung vài phòng họp nhưng đang giữ lịch bằng chat hoặc bảng tính. Hậu quả là hai người đặt trùng giờ, không ai biết phòng nào đang trống, và không xem lại được ai đã dùng phòng lúc nào. Người quản lý nhóm cũng không có chỗ nào để quản lý danh sách phòng và kiểm soát ai được đặt.

## Solution

Một web app đăng nhập bằng GitHub. Bất kỳ ai cũng tạo được một Team và trở thành Owner của Team đó. Owner thêm các Room, rồi chia sẻ Invite Code (hoặc Invite Link) để người khác tự tham gia Team với vai trò Member. Member xem lịch theo ngày của mọi Room trong Team và đặt Booking vào khung trống theo bước 15 phút. Hệ thống không bao giờ cho hai Active Booking của cùng một Room chồng lên nhau. Mỗi người có trang My Schedule để xem lại mọi Booking của mình, cả sắp tới lẫn đã qua. Lịch của Team cũng cho xem lùi về quá khứ. Giao diện tiếng Việt, mọi giờ giấc hiển thị theo Team Time Zone.

## User Stories

### Đăng nhập và danh tính

1. Là khách, tôi muốn đăng nhập bằng tài khoản GitHub để khỏi phải tạo thêm một mật khẩu mới.
2. Là người dùng, tôi muốn tên và avatar GitHub của mình được dùng làm danh tính trong app để Member khác nhận ra tôi.
3. Là người dùng, tôi muốn tên và avatar tự cập nhật mỗi lần đăng nhập để khớp với GitHub khi tôi đổi profile.
4. Là người dùng, tôi muốn đăng xuất để bảo vệ tài khoản trên máy dùng chung.
5. Là khách, khi mở bất kỳ trang nào cần đăng nhập, tôi muốn được đưa sang trang đăng nhập rồi quay về đúng trang đã mở để không phải tìm lại.

### Team

6. Là người dùng, tôi muốn tạo Team với tên và Team Time Zone (mặc định Asia/Ho_Chi_Minh) để bắt đầu quản lý phòng cho nhóm mình.
7. Là người tạo Team, tôi muốn tự động trở thành Owner và Member của Team đó để dùng được ngay.
8. Là người dùng, tôi muốn xem danh sách mọi Team mình đang tham gia, kèm vai trò của mình trong từng Team, để chuyển qua lại giữa các Team.
9. Là người dùng chưa có Team nào, tôi muốn thấy rõ hai lựa chọn "Tạo Team" và "Nhập Invite Code" để biết phải làm gì tiếp.
10. Là Owner, tôi muốn đổi tên Team để sửa lỗi gõ hoặc khi nhóm đổi tên.
11. Là Owner, tôi muốn đổi Team Time Zone và được cảnh báo trước rằng giờ hiển thị của các Booking hiện có sẽ thay đổi, để không vô tình làm rối lịch.
12. Là Owner, tôi muốn xoá hẳn Team sau khi gõ đúng tên Team để xác nhận, để dọn dữ liệu khi nhóm giải tán mà không lỡ tay xoá nhầm.

### Invite Code và tham gia Team

13. Là Owner, tôi muốn xem Invite Code hiện tại của Team để gửi cho người cần mời.
14. Là Owner, tôi muốn sao chép Invite Link chỉ với một cú bấm để dán vào chat.
15. Là Owner, tôi muốn đổi sang Invite Code mới để mã cũ mất hiệu lực ngay khi bị lộ hoặc khi không muốn ai vào thêm.
16. Là người dùng, tôi muốn nhập Invite Code không phân biệt hoa thường để khỏi lo gõ sai kiểu chữ.
17. Là người dùng, tôi muốn mã không chứa các ký tự dễ nhầm (0/O, 1/I) để đọc và gõ lại không bị sai.
18. Là người dùng, tôi muốn vào Team ngay sau khi nhập mã đúng, không phải chờ duyệt, để bắt đầu đặt phòng.
19. Là khách bấm vào Invite Link, tôi muốn được đưa qua đăng nhập GitHub rồi tự quay về trang tham gia Team, để chỉ cần bấm một lần.
20. Là người dùng, tôi muốn thấy tên Team trước khi bấm xác nhận tham gia từ Invite Link để chắc mình vào đúng Team.
21. Là người dùng nhập mã sai hoặc mã đã bị đổi, tôi muốn thấy thông báo rõ ràng "Mã mời không hợp lệ".
22. Là Member đã ở trong Team, khi tôi dùng lại Invite Code của Team đó, tôi muốn được đưa thẳng vào Team, không bị báo lỗi.
23. Là người từng bị xoá khỏi Team, tôi muốn tham gia lại được nếu vẫn có Invite Code đang hiệu lực.

### Member

24. Là Member, tôi muốn xem danh sách Member của Team (tên, avatar, ai là Owner) để biết ai đang dùng chung phòng.
25. Là Owner, tôi muốn xoá một Member khỏi Team để thu hồi quyền đặt phòng của người đó.
26. Là Owner, tôi muốn chuyển quyền Owner cho một Member khác để giao lại việc quản lý; sau khi chuyển, tôi trở thành Member thường.
27. Là Member, tôi muốn rời Team khi không còn cần dùng nữa.
28. Là Owner, tôi muốn được báo rằng phải chuyển quyền Owner trước khi rời Team để Team không bị mất người quản lý.
29. Là Member rời Team hoặc bị xoá, tôi muốn mọi Booking tương lai của mình bị huỷ tự động để phòng được trả lại cho người khác.
30. Là Owner, tôi muốn các Booking đã qua của một Member đã rời vẫn còn trong lịch sử Team để tra cứu ai đã dùng phòng.

### Room

31. Là Owner, tôi muốn thêm Room với tên, sức chứa (tuỳ chọn) và mô tả (tuỳ chọn) để Member biết phòng nào phù hợp.
32. Là Owner, tôi muốn sửa thông tin Room.
33. Là Owner, tôi muốn lưu trữ một Room không còn dùng để nó biến mất khỏi lịch đặt nhưng vẫn giữ lịch sử.
34. Là Owner lưu trữ một Room, tôi muốn biết trước có bao nhiêu Booking tương lai sẽ bị huỷ tự động để quyết định có lưu trữ hay không.
35. Là Owner, tôi muốn xem danh sách Archived Room và khôi phục một Room để dùng lại.
36. Là Member, tôi muốn thấy sức chứa và mô tả của từng Room khi đặt để chọn đúng phòng.

### Xem lịch Team

37. Là Member, trên màn hình rộng, tôi muốn xem lịch theo ngày với mỗi Room là một cột trên lưới 15 phút để thấy ngay chỗ trống.
38. Là Member, tôi muốn lưới mặc định cuộn tới khung 07:00–21:00 nhưng vẫn xem được đủ 24 giờ.
39. Là Member, tôi muốn chuyển sang ngày trước hoặc ngày sau, chọn ngày bất kỳ, và quay về "Hôm nay" nhanh.
40. Là Member, tôi muốn xem lịch của những ngày đã qua để tra cứu ai đã dùng phòng.
41. Là Member, tôi muốn mỗi Booking trên lịch hiện tiêu đề, giờ và Booker (tên, avatar).
42. Là Member, tôi muốn bấm vào một Booking để xem chi tiết, gồm cả ghi chú.
43. Là Member, tôi muốn phân biệt được Booking của mình với Booking của người khác ngay trên lịch.
44. Là Member, tôi muốn lịch có thể hiện (hoặc bật hiện) các Cancelled Booking với kiểu hiển thị riêng để biết lịch nào đã bị huỷ.
45. Là Member, tôi muốn thấy vạch "bây giờ" trên lịch của hôm nay.
46. Là Member dùng điện thoại, tôi muốn xem danh sách Booking của ngày gom nhóm theo Room, kèm nút "Đặt lịch", vì lưới nhiều cột không vừa màn hình nhỏ.
47. Là Member, tôi muốn mọi giờ hiển thị theo Team Time Zone, kèm ghi chú múi giờ, để không nhầm khi máy tôi đặt múi giờ khác.

### Đặt Booking

48. Là Member, tôi muốn kéo chuột trên các ô trống của một Room để mở form đặt với Room và giờ đã điền sẵn.
49. Là Member, tôi muốn có nút "Đặt lịch" mở form để tự chọn Room, ngày, giờ bắt đầu và giờ kết thúc.
50. Là Member, tôi muốn giờ chỉ chọn được theo bước 15 phút.
51. Là Member, tôi muốn bắt buộc nhập tiêu đề và có thể thêm ghi chú để người khác biết phòng đang dùng vào việc gì.
52. Là Member, tôi muốn bị chặn khi đặt vào khung giờ có Conflict, kèm thông báo đang trùng với Booking nào.
53. Là Member, tôi muốn đặt được một Booking bắt đầu đúng lúc một Booking khác kết thúc.
54. Là Member, tôi muốn bị chặn khi đặt trong quá khứ.
55. Là Member, tôi muốn bị chặn khi đặt qua nửa đêm (theo Team Time Zone).
56. Là Member, tôi muốn bị chặn khi đặt xa hơn 60 ngày tới.
57. Là Member, tôi muốn bị chặn khi đặt vào Archived Room.
58. Là Member bấm đặt cùng lúc với người khác, tôi muốn thấy "Khung giờ này vừa có người đặt" và lịch tự làm mới, thay vì lỗi khó hiểu.
59. Là Member, sau khi đặt thành công tôi muốn thấy Booking mới hiện ngay trên lịch.

### Sửa, huỷ, kết thúc sớm

60. Là Booker, tôi muốn sửa tiêu đề, ghi chú, Room và giờ của một Booking chưa bắt đầu, với cùng các quy tắc như khi đặt mới.
61. Là Booker, tôi muốn huỷ một Booking chưa bắt đầu để trả phòng.
62. Là Booker của một Booking đang diễn ra, tôi muốn kéo dài hoặc rút ngắn giờ kết thúc (không sớm hơn hiện tại, không gây Conflict) khi cuộc họp kéo dài hoặc xong sớm.
63. Là Booker của một Booking đang diễn ra, tôi muốn End Early để trả phòng ngay cho người khác.
64. Là Booker, tôi muốn sửa tiêu đề và ghi chú của Booking đang diễn ra.
65. Là Owner, tôi muốn huỷ bất kỳ Booking nào chưa bắt đầu, và End Early bất kỳ Booking nào đang diễn ra, để xử lý khi có người giữ phòng sai.
66. Là Member, tôi muốn không sửa, huỷ được Booking của người khác (trừ khi là Owner).
67. Là bất kỳ ai, tôi muốn Booking đã kết thúc không còn sửa hay huỷ được để lịch sử luôn đúng.
68. Là Booker, tôi muốn được hỏi xác nhận trước khi huỷ.

### My Schedule và lịch sử

69. Là người dùng, tôi muốn trang My Schedule hiện mọi Booking do tôi đặt, gộp từ mọi Team, chia hai mục "Sắp tới" và "Đã qua".
70. Là người dùng, tôi muốn mỗi dòng trong My Schedule hiện Team, Room, ngày giờ (theo Team Time Zone của Team đó), tiêu đề và trạng thái.
71. Là người dùng, tôi muốn mục "Đã qua" được phân trang, mới nhất ở trên, để xem lại lịch sử dài.
72. Là người dùng, tôi muốn thấy các Cancelled Booking của mình kèm Cancellation Reason ("Bạn đã huỷ", "Owner đã huỷ", "Tự động huỷ do phòng bị lưu trữ", "Tự động huỷ do rời Team").
73. Là người dùng, tôi muốn lọc My Schedule theo Team.
74. Là người dùng, tôi muốn bấm vào một Booking sắp tới trong My Schedule để mở đúng ngày đó trên lịch của Team.

## Implementation Decisions

### Stack và hạ tầng

- TanStack Start (TypeScript), better-auth (chỉ GitHub provider), Drizzle ORM, PostgreSQL. Deploy Vercel, database Neon hoặc Supabase. Chạy local bằng Postgres qua Docker Compose. Xem ADR-0001.
- Server logic chạy qua server function của TanStack Start. Mọi input được validate bằng zod ở biên server function.
- Giao diện tiếng Việt, chưa có i18n. Chuỗi hiển thị viết thẳng trong UI.

### Module (seam chính là tầng service)

Domain logic nằm trong các module service, độc lập với UI và với TanStack Start. Mỗi hàm nhận `actor` (userId của người đang gọi) và tự kiểm tra quyền. Server function chỉ là lớp mỏng: lấy session, gọi service, ánh xạ lỗi domain thành thông báo cho UI. Thời gian lấy từ một `Clock` được inject vào để test kiểm soát được "bây giờ".

- **Teams**: `createTeam`, `updateTeam` (tên, Team Time Zone), `deleteTeam` (bắt buộc truyền tên Team để xác nhận), `listMyTeams`, `getTeam`, `listMembers`, `joinByInviteCode`, `previewInviteCode` (trả tên Team cho trang Invite Link), `rotateInviteCode`, `leaveTeam`, `removeMember`, `transferOwnership`.
- **Rooms**: `createRoom`, `updateRoom`, `archiveRoom` (kèm thao tác xem trước số Booking tương lai sẽ bị huỷ), `restoreRoom`, `listRooms` (mặc định chỉ Room đang hoạt động, có tuỳ chọn lấy Archived Room).
- **Bookings**: `createBooking`, `updateBooking`, `cancelBooking`, `endEarly`, `listTeamDay(teamId, localDate)`, `listMySchedule(actor, { section: upcoming|past, teamId?, page })`.
- **Time**: module thuần duy nhất xử lý Team Time Zone, gồm: chuyển ngày giờ địa phương sang UTC và ngược lại, kiểm tra căn bước 15 phút, kiểm tra "cùng một ngày địa phương", tính khoảng UTC của một ngày địa phương (để query `listTeamDay`, đúng cả với ngày có DST). Danh sách múi giờ hợp lệ lấy theo IANA.
- **Lỗi domain**: kiểu lỗi có mã, gồm `NotAuthenticated`, `NotMember`, `NotOwner`, `NotBooker`, `InvalidInviteCode`, `OwnerCannotLeave`, `TeamNameMismatch`, `RoomArchived`, `BookingConflict` (kèm Booking bị trùng nếu biết), `BookingInPast`, `BookingCrossesMidnight`, `BookingTooFarAhead`, `SlotNotAligned`, `InvalidTimeRange`, `BookingAlreadyEnded`, `BookingAlreadyStarted` (khi cố sửa giờ bắt đầu hoặc Room của Booking đang diễn ra), `BookingCancelled`, `NotFound`.

### Quy tắc nghiệp vụ

- **Quyền**: chỉ Member của Team mới đọc được dữ liệu của Team. Chỉ Owner được quản lý Room, Member, Invite Code và thông tin Team. Booker sửa, huỷ, End Early được Booking của mình. Owner huỷ và End Early được mọi Booking, nhưng không sửa nội dung Booking của người khác.
- **Tạo hoặc sửa Booking chưa bắt đầu**:
  - `start < end`, cả hai căn theo bước 15 phút.
  - `start >= floor15(now)`: được đặt cho slot 15 phút hiện tại. Ví dụ lúc 9:07 vẫn đặt được 9:00–10:00.
  - `end <= start + 60 ngày`.
  - `start` và `end` cùng một ngày địa phương theo Team Time Zone. `end` được phép đúng 00:00 của ngày hôm sau (tức Booking kết thúc lúc nửa đêm).
  - Room phải đang hoạt động, không gây Conflict, có tiêu đề không rỗng sau khi trim.
- **Booking đang diễn ra** (`start <= now < end`, chưa huỷ): chỉ đổi được tiêu đề, ghi chú và giờ kết thúc. Giờ kết thúc mới phải căn bước 15 phút, `>= ceil15(now)`, không gây Conflict, và vẫn cùng ngày địa phương. End Early đặt `end = ceil15(now)`. Booking vẫn là Active Booking, không có Cancellation Reason.
- **Booking đã kết thúc** (`end <= now`) hoặc đã huỷ thì không thao tác được nữa.
- **Huỷ tự động**:
  - `archiveRoom`: huỷ mọi Booking chưa bắt đầu của Room đó (lý do `room_archived`) và End Early Booking đang diễn ra (nếu có). Toàn bộ chạy trong một transaction.
  - `leaveTeam` / `removeMember`: làm tương tự với Booking của người đó trong Team (lý do `member_left` / `member_removed`).
  - `restoreRoom` không khôi phục các Booking đã bị huỷ.
- **Owner**: `team.owner_id` luôn trỏ tới một Member của Team. `transferOwnership` chỉ chấp nhận người nhận là Member hiện tại. Owner gọi `leaveTeam` thì bị báo `OwnerCannotLeave`. Owner không tự xoá được chính mình bằng `removeMember`.
- **Invite Code**: 8 ký tự từ bảng chữ `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` (bỏ 0, O, 1, I). Lưu dạng chữ hoa, duy nhất toàn hệ thống. Input được chuẩn hoá (trim, upper-case, bỏ khoảng trắng và gạch ngang) trước khi so khớp. Mã được sinh khi tạo Team và khi `rotateInviteCode`. `joinByInviteCode` là idempotent: nếu người dùng đã là Member thì trả về Team đó, không báo lỗi.
- **Đổi Team Time Zone**: Booking cũ giữ nguyên thời điểm tuyệt đối. Quy tắc cùng ngày chỉ được kiểm tra khi tạo hoặc sửa.
- **Xoá Team**: xoá cascade Team, Member, Room, Booking.

### Schema (Drizzle, Postgres)

- Các bảng của better-auth (`user`, `session`, `account`, `verification`) theo schema mặc định của better-auth. `user` có `name` và `image`, đồng bộ từ GitHub mỗi lần đăng nhập.
- `team`: `id`, `name`, `time_zone` (IANA), `invite_code` (unique), `owner_id` → user, `created_at`.
- `team_member`: `team_id` → team (cascade), `user_id` → user, `joined_at`. Khoá chính là `(team_id, user_id)`.
- `room`: `id`, `team_id` → team (cascade), `name`, `capacity` (int, nullable), `description` (nullable), `archived_at` (nullable), `created_at`.
- `booking`: `id`, `team_id` → team (cascade, lưu trùng để query nhanh), `room_id` → room, `booker_id` → user, `title`, `note` (nullable), `starts_at` và `ends_at` (timestamptz, UTC), `status` (`active` | `cancelled`), `cancelled_at`, `cancelled_by` → user (nullable, null khi huỷ tự động), `cancellation_reason` (`by_booker` | `by_owner` | `room_archived` | `member_left` | `member_removed`), `created_at`, `updated_at`.
- Constraint:
  - `CHECK (starts_at < ends_at)`.
  - Extension `btree_gist` cùng exclusion constraint `EXCLUDE USING gist (room_id WITH =, tstzrange(starts_at, ends_at, '[)') WITH &&) WHERE (status = 'active')`. Xem ADR-0002.
  - `CHECK` để `cancellation_reason` và `cancelled_at` khác null khi và chỉ khi `status = 'cancelled'`.
- Index: `booking(room_id, starts_at)`, `booking(booker_id, starts_at)`, `booking(team_id, starts_at)`.
- Vi phạm exclusion constraint (SQLSTATE `23P01`) được ánh xạ thành `BookingConflict`. Service vẫn kiểm tra trước để trả về Booking bị trùng trong thông báo.

### Route (URL)

- `/`: landing có nút "Đăng nhập với GitHub". Nếu đã đăng nhập thì chuyển sang `/teams`.
- `/teams`: danh sách Team, tạo Team, nhập Invite Code.
- `/join/$code`: xem trước tên Team, bấm xác nhận để tham gia. Nếu chưa đăng nhập thì đi qua đăng nhập GitHub rồi quay lại trang này.
- `/t/$teamId?date=YYYY-MM-DD`: lịch ngày của Team (mặc định hôm nay theo Team Time Zone).
- `/t/$teamId/rooms`: quản lý Room (chỉ Owner sửa được, Member chỉ xem).
- `/t/$teamId/members`: danh sách Member, kèm thao tác của Owner.
- `/t/$teamId/settings`: tên Team, Team Time Zone, Invite Code và Invite Link, xoá Team (chỉ Owner).
- `/me`: My Schedule.

### UI

- Lịch ngày dạng lưới 15 phút, mỗi Room là một cột. Kéo chuột trên ô trống để mở form đặt đã điền sẵn. Breakpoint mobile chuyển sang dạng danh sách gom theo Room.
- Cancelled Booking mặc định ẩn trên lưới, có công tắc "Hiện lịch đã huỷ".
- Sau khi tạo, sửa, huỷ thì invalidate dữ liệu của ngày đó. Gặp `BookingConflict` thì hiện thông báo và tải lại lịch.
- Chưa có cập nhật realtime. Dữ liệu được làm mới khi chuyển trang, khi focus lại tab, và sau mỗi thao tác.

## Testing Decisions

- **Seam duy nhất là tầng service** (Teams, Rooms, Bookings). Test gọi đúng các hàm public như server function sẽ gọi, rồi assert trên kết quả trả về hoặc lỗi domain và trên dữ liệu đọc lại qua chính service. Không assert vào câu SQL, cấu trúc bảng hay chi tiết bên trong.
- **Vitest + Postgres thật** chạy qua Docker (Testcontainers hoặc container Compose dành riêng cho test). Migration Drizzle được chạy trước suite, mỗi test có dữ liệu sạch (truncate hoặc schema riêng). Không mock database, vì Conflict được bảo đảm bởi constraint (ADR-0002).
- **Clock được inject** để cố định "bây giờ" trong các test về quá khứ, Booking đang diễn ra, giới hạn 60 ngày và End Early.
- **Module Time** là hàm thuần, được test đơn vị riêng: căn bước 15 phút, kiểm tra cùng ngày, khoảng UTC của ngày địa phương, ngày chuyển DST (vd America/New_York), và kết thúc đúng 00:00.
- **Phải có test cho**:
  - Conflict: chồng hoàn toàn, chồng một phần, nối đuôi (được phép), chồng với Cancelled Booking (được phép), khác Room (được phép), hai lệnh đặt chạy song song (đúng một lệnh thành công).
  - Mọi lỗi validate khi tạo hoặc sửa.
  - Ma trận quyền: người ngoài Team, Member, Booker, Owner, áp lên từng thao tác.
  - Archive Room: huỷ hoặc End Early đúng Booking, giữ nguyên Booking đã qua; restore không khôi phục Booking đã huỷ.
  - Leave/remove Member: tương tự archive; Owner không rời được; chuyển quyền Owner.
  - Invite Code: chuẩn hoá input, mã cũ mất hiệu lực sau khi đổi, join idempotent, người bị xoá join lại được.
  - My Schedule: gộp nhiều Team, chia sắp tới và đã qua, phân trang, lọc theo Team, có Cancellation Reason.
- **Prior art**: repo mới, chưa có. Bộ test service đầu tiên sẽ làm mẫu cho các bộ sau.
- Chưa có test E2E cho UI ở v1.

## Out of Scope

- Đăng nhập bằng cách khác GitHub (email/mật khẩu, Google, ...).
- Người dự họp (attendee), lời mời họp, chấp nhận hoặc từ chối.
- Booking lặp lại (recurring).
- Email, push notification, nhắc lịch.
- Đồng bộ Google Calendar/Outlook, xuất iCal.
- Nhiều Owner hoặc các vai trò trung gian (admin, viewer).
- Phê duyệt khi tham gia Team, danh sách chặn, Invite Code có hạn dùng hoặc giới hạn lượt dùng.
- Tự xoá tài khoản người dùng.
- Cập nhật lịch realtime.
- Đa ngôn ngữ.
- Rate limiting cho việc thử Invite Code (không gian mã khoảng 31⁸ ≈ 8,5×10¹¹ là đủ cho v1).
- Giới hạn số Booking hay số giờ mỗi Member được đặt.

## Further Notes

- **Đã xác nhận**: sau khi rời hoặc bị xoá khỏi Team, người dùng **không** còn thấy Booking của Team đó trong My Schedule. My Schedule chỉ hiện Booking thuộc các Team mà người dùng đang là Member, để chỉ cần một quy tắc quyền là "phải là Member mới thấy dữ liệu Team". Dữ liệu vẫn còn nên quay lại Team là thấy lại.
- **Đã xác nhận**: quy tắc `start >= floor15(now)` cho phép đặt slot đang diễn ra (lúc 9:07 đặt được 9:00–10:00).
- Thứ tự chia ticket dự kiến (mỗi ticket là một lát dọc chạy được): scaffold, đăng nhập GitHub và Docker Postgres → Team và Invite Code → Room → Booking và Conflict (service, constraint) → lịch ngày của Team → sửa, huỷ, End Early → thao tác của Owner (Member, chuyển quyền, archive, xoá Team) → My Schedule.
