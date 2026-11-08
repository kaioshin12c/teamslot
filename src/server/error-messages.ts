import type { DomainErrorCode } from '#/services/errors'

/** What the UI shows for each domain error. Every code must have a message. */
export const domainErrorMessages: Record<DomainErrorCode, string> = {
  NotAuthenticated: 'Bạn cần đăng nhập để tiếp tục.',
  NotFound: 'Không tìm thấy dữ liệu.',
}
