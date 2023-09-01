class ScrollUtils {
  scrollTo(
    { top, smooth }: { top: number; smooth?: boolean },
    iframeId?: string
  ) {
    window.scroll({
      top,
      left: 0,
      behavior: smooth === false ? undefined : 'smooth',
    })
  }
}

const scrollUtils = new ScrollUtils()

export default scrollUtils
