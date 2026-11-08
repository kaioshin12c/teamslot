# Stack: TanStack Start + better-auth + Drizzle + Postgres

Ứng dụng dùng TanStack Start (TypeScript), better-auth (GitHub provider), Drizzle ORM và PostgreSQL, deploy lên Vercel với Postgres của Neon/Supabase, thay vì hướng phổ biến hơn là Next.js + Auth.js + Prisma. Lý do: muốn type-safety end-to-end (router và server function có kiểu); tránh lock-in vào Next.js/Vercel; better-auth giữ user và session ngay trong database của mình; Drizzle nhẹ hơn Prisma và sát SQL hơn (cần thiết vì Conflict dựa vào exclusion constraint, xem ADR-0002); và người phát triển quen tay hoặc muốn học stack này.
