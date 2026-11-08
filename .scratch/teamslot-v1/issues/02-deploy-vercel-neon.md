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

## Comments

**Phần code đã làm (agent):** thêm `nitro` vào `vite.config.ts` (build ra định dạng Vercel), `vercel.json` + `scripts/vercel-build.mjs` (chạy migration khi `VERCEL_ENV=production` rồi build), migration `0001_enable_btree_gist`, `drizzle.config.ts` ưu tiên `DATABASE_URL_UNPOOLED`, và mục "Deploy production" trong README. Typecheck và test xanh.

**Còn lại cho người (cần tài khoản):** làm theo README mục "Deploy production" để tạo Neon, GitHub OAuth App production, project Vercel và biến môi trường, rồi kiểm tra đăng nhập/đăng xuất trên URL production. Các checkbox ở trên chỉ tick sau khi đã kiểm tra thật.
