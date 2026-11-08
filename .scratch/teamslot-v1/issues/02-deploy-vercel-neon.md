# 02: Deploy Vercel + Neon

**What to build:** Bản production của Teamslot chạy trên Vercel, dùng Postgres của Neon (hoặc Supabase). Người dùng mở URL production và đăng nhập được bằng GitHub. Migration chạy tự động hoặc theo một lệnh có tài liệu rõ ràng mỗi lần deploy. Ticket này cần người làm vì phải tạo GitHub OAuth app cho production, tài khoản và database Neon, rồi cấu hình biến môi trường trên Vercel.

**Blocked by:** 01 (Scaffold + đăng nhập GitHub + bộ test)

**Status:** ready-for-human

- [ ] Có project Vercel nối với repo, mỗi lần push nhánh chính thì tự deploy.
- [ ] Đã tạo database Neon/Supabase. Connection string và secret của better-auth được đặt trong biến môi trường của Vercel.
- [ ] Có GitHub OAuth app cho production, callback URL trỏ về domain production.
- [ ] Migration Drizzle được áp lên database production, quy trình được ghi trong tài liệu dev.
- [ ] Đăng nhập và đăng xuất hoạt động trên URL production.
- [ ] Extension `btree_gist` được bật trên database production (cần cho ticket 06, xem ADR-0002).
