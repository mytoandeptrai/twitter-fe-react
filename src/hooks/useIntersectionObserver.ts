import React from 'react'

type Props = {
  enabled?: boolean
  threshold?: number
  rootMargin?: string
  onIntersect: () => void
  root?: React.RefObject<HTMLElement>
  target?: React.RefObject<HTMLElement>
}

const useIntersectionObserver = ({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
  enabled = true
}: Props) => {
  React.useEffect(() => {
    if (!enabled) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold
      }
    )

    const el = target && target.current

    if (!el) {
      return
    }

    observer.observe(el)

    return () => {
      observer.unobserve(el)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, enabled])
}

export { useIntersectionObserver }
