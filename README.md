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
