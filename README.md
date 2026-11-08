# Teamslot

Đặt phòng họp cho nhóm nhỏ. Stack: TanStack Start, better-auth (GitHub), Drizzle, PostgreSQL (xem `docs/adr/`).

## Chạy local

Cần Node 24+, pnpm, Docker.

1. Tạo GitHub OAuth App tại <https://github.com/settings/developers>:
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
2. Tạo file env và điền giá trị (client id/secret của OAuth App, `BETTER_AUTH_SECRET` sinh bằng `openssl rand -base64 32`):
   ```sh
   cp .env.example .env.local
   ```
3. Khởi động Postgres, chạy migration, chạy app:
   ```sh
   pnpm install
   pnpm db:up
   pnpm db:migrate
   pnpm dev   # http://localhost:3000
   ```

## Deploy production (Vercel + Neon)

Làm một lần:

1. **Neon**: tạo project Postgres tại <https://neon.tech>. Lấy hai connection string: *pooled* (host có `-pooler`) và *direct*. Có thể dùng Neon integration trong Vercel Marketplace, nó tự đặt `DATABASE_URL` và `DATABASE_URL_UNPOOLED`; mặc định nó đặt cho cả Preview và Development, nên hãy bỏ hai scope đó đi.
2. **GitHub OAuth App cho production** (tạo app riêng, không dùng chung với app local) tại <https://github.com/settings/developers>:
   - Homepage URL: `https://<domain-production>`
   - Authorization callback URL: `https://<domain-production>/api/auth/callback/github`
3. **Vercel**: Import repo (Framework Preset: Other/Vite, Vercel đọc `vercel.json`). Kiểm tra Settings → Git → Production Branch là `main`; mỗi lần push `main` sẽ tự deploy.
4. Đặt biến môi trường cho scope **Production** (Project Settings → Environment Variables):

   | Biến | Giá trị |
   | --- | --- |
   | `DATABASE_URL` | connection string pooled của Neon |
   | `DATABASE_URL_UNPOOLED` | connection string direct của Neon (dùng cho migration) |
   | `BETTER_AUTH_SECRET` | `openssl rand -base64 32` (secret riêng cho production) |
   | `BETTER_AUTH_URL` | `https://<domain-production>` (phải khớp đúng origin của callback URL ở bước 2) |
   | `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | của OAuth App production |

   Đừng đặt `DATABASE_URL*` cho scope Preview: preview deploy không chạy migration và không được chạm database production.

Migration chạy tự động ở mỗi lần deploy production: `vercel.json` đặt build command là `scripts/vercel-build.mjs`, script này chạy `pnpm db:migrate` (chỉ khi `VERCEL_ENV=production`) rồi `pnpm build`. Migration lỗi thì deploy lỗi và bản cũ vẫn chạy. Migration `0001_enable_btree_gist` bật extension `btree_gist` (ADR-0002).

Chạy migration tay (ví dụ lần đầu, hoặc để kiểm tra), từ máy local:

```sh
DATABASE_URL_UNPOOLED='<direct connection string>' pnpm db:migrate
```

Sau lần deploy đầu, kiểm tra:

- Extension đã bật: `select extname from pg_extension where extname = 'btree_gist';` trả về một dòng.
- Mở URL production, đăng nhập bằng GitHub rồi đăng xuất đều chạy.

Khi thêm migration mới (migration chạy trước khi bản mới lên, nên phải tương thích ngược với bản đang chạy): `pnpm db:generate`, commit thư mục `drizzle/`, merge vào `main`; deploy sẽ áp migration trước khi build.

## Lệnh

| Lệnh | Việc |
| --- | --- |
| `pnpm dev` | Dev server cổng 3000 |
| `pnpm typecheck` | Kiểm tra kiểu |
| `pnpm test` | Vitest trên Postgres thật (Testcontainers, cần Docker đang chạy) |
| `pnpm db:generate` | Sinh migration từ `src/db/schema.ts` |
| `pnpm db:migrate` | Áp migration vào `DATABASE_URL` |
| `pnpm auth:generate` | Sinh lại `src/db/auth-schema.ts` từ cấu hình better-auth |

## Cấu trúc

- `src/services/`: domain logic, seam duy nhất của test. Mỗi hàm nhận `(ctx, actor)`, trong đó `ctx` là `{ db, clock }` và `actor` là userId (hoặc `null` khi chưa đăng nhập). Lỗi nghiệp vụ là `DomainError` có `code`.
- `src/server/`: server function, chỉ là lớp mỏng: validate input bằng zod, gọi `runService`, để nó lấy session, gọi service và đổi `DomainError` thành lỗi có thông báo tiếng Việt (`error-messages.ts`) và giữ `code` để UI rẽ nhánh (`src/lib/user-facing-error.ts`).
- `src/routes/`: route của TanStack Start. Trang cần đăng nhập đặt dưới `_authed/`.
- `src/db/`: schema Drizzle. Migration nằm trong `drizzle/`.
- `test/`: harness của Vitest. Một container Postgres cho mỗi lần chạy, migration chạy một lần vào database template, mỗi file test có database riêng clone từ template, và mỗi test bắt đầu với bảng rỗng. `test/fixtures.ts` có `testContext({ now })` (Clock giả) và `seedUser`.
