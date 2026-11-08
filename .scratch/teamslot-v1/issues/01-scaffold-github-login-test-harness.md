# 01: Scaffold + đăng nhập GitHub + bộ test

**What to build:** Khung dự án TanStack Start (TypeScript) chạy được local với Postgres qua Docker Compose, Drizzle cùng migration, better-auth với GitHub provider. Khách vào `/` thấy nút "Đăng nhập với GitHub". Đăng nhập xong thì vào `/teams` (trang còn trống) và thấy tên, avatar GitHub của mình, có nút đăng xuất. Trang cần đăng nhập mà mở khi chưa đăng nhập thì chuyển sang đăng nhập, xong quay về đúng trang. Có sẵn bộ test Vitest chạy trên Postgres thật và cơ chế inject Clock, làm nền cho mọi ticket sau. Xem spec `.scratch/teamslot-v1/spec.md` và ADR-0001.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [x] Có Docker Compose khởi động Postgres local và tài liệu ngắn cách chạy dev (biến môi trường mẫu, gồm cả GitHub OAuth client id/secret).
- [x] Có Drizzle schema và migration cho các bảng của better-auth.
- [x] Đăng nhập GitHub chạy end-to-end. Tên và avatar trong `user` được đồng bộ từ GitHub mỗi lần đăng nhập.
- [x] Đăng xuất được.
- [x] Route cần đăng nhập chuyển sang đăng nhập rồi quay về đúng URL ban đầu.
- [x] `/` chuyển thẳng sang `/teams` khi đã đăng nhập.
- [x] Có khung tầng service: hàm nhận `actor`, có kiểu lỗi domain có mã, có `Clock` inject được. Server function chỉ là lớp mỏng, validate bằng zod.
- [x] Vitest chạy trên Postgres thật (Testcontainers hoặc DB test riêng). Migration chạy trước suite, mỗi test có dữ liệu sạch. Có ít nhất một test mẫu qua tầng service dùng Clock giả.
- [x] Giao diện tiếng Việt.

## Comments

- 2026-11-08 (agent): Đã triển khai. Đăng nhập, chuyển hướng, đăng xuất đã kiểm tra qua HTTP với session seed sẵn; lỗi OAuth quay về `/` kèm thông báo tiếng Việt. Chưa chạy vòng đăng nhập GitHub thật (cần trình duyệt), nên việc đồng bộ tên/avatar (`overrideUserInfoOnSignIn`) cần xác nhận bằng một lần đăng nhập thật. Chưa có server function nào nhận input; mẫu `.inputValidator(zod)` sẽ xuất hiện ở ticket 03.
