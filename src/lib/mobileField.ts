/** Возвращает мобильное значение если заполнено, иначе десктопное */
export function mobileField(
  isMobile: boolean,
  mobileValue: string | undefined | null,
  desktopValue: string,
): string {
  const trimmed = mobileValue?.trim()
  return isMobile && trimmed ? trimmed : desktopValue
}
