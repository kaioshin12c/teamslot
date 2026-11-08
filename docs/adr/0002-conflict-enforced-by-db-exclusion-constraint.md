# Conflict được chặn bằng exclusion constraint của Postgres

Quy tắc "hai Active Booking của cùng một Room không được giao nhau" được bảo đảm bằng exclusion constraint (`btree_gist`) trên `(room_id, tstzrange(starts_at, ends_at, '[)'))` với điều kiện chỉ áp cho Booking chưa huỷ, thay vì chỉ kiểm tra trong code ứng dụng. Kiểm tra trong code (đọc rồi ghi) có race condition khi hai Member đặt cùng lúc; constraint ở DB là nguồn sự thật duy nhất, còn code chỉ kiểm tra trước để hiển thị lỗi thân thiện và bắt lỗi vi phạm constraint để báo "Khung giờ này vừa có người đặt".

## Consequences

- Không được đổi sang database không hỗ trợ exclusion constraint (vd SQLite, MySQL) nếu không thay cơ chế khác tương đương.
- Range dùng biên `[)` nên hai Booking nối đuôi nhau không bị coi là Conflict.
- Test cho quy tắc Conflict phải chạy trên Postgres thật, không mock DB.
