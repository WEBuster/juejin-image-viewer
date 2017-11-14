import { on, getViewportSize, applyCSS, loadIamge, forceReflow } from './util'

const DEFAULT_OPTIONS = {
  urlHandler: url => url,
  urlAttribute: 'src',
  targetClassName: '',
  eventName: 'click',
  containerClassName: 'juejin-image-viewer__container',
  boxClassName: 'juejin-image-viewer__box',
  imageClassName: 'juejin-image-viewer__image',
  cursor: 'zoom-in',
  backgroundColor: '#fff',
  transitionDuration: 200,
  margin: 0
}

export default class JuejinImageViewer {

  constructor (containerList, options) {
    this.initContainerList(containerList)
    this.initOptions(options)
    this.initCSS()
    this.startListen()
  }

  initContainerList (containerList) {
    if (typeof containerList === 'string') {
      this.containerList = [].slice.call(document.querySelectorAll(containerList))
    } else if (containerList instanceof Array) {
      this.containerList = containerList
    } else {
      this.containerList = [containerList]
    }
  }

  initCSS () {
    const {
      targetClassName,
      containerClassName,
      boxClassName,
      imageClassName,
      transitionDuration,
      cursor
    } = this.options
    const imgSelector = targetClassName ? `img.${targetClassName}` : 'img'
    this.removeCSS = applyCSS(`
      .${containerClassName} ${imgSelector} {
        cursor: ${cursor};
      }
      .${boxClassName} {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        transition: all ${transitionDuration}ms ease-out;
      }
      .${boxClassName}.hide {
        opacity: 0;
      }
      .${boxClassName},
      .${boxClassName} .${imageClassName} {
        cursor: zoom-out;
      }
      .${imageClassName} {
        position: absolute;
        transition: all ${transitionDuration}ms ease-out;
      }
    `)
  }

  initOptions (options) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options)
  }

  startListen () {
    this.ListenerRemoverList = this.containerList.map(container => ({
      removeEventListener: this.listenContainer(container),
      container
    }))
  }

  listenContainer (container) {
    container.classList.add(this.options.containerClassName)
    return on(container, this.options.eventName, event => {
      if (this.shouldShow(event.target)) {
        this.show(event.target)
      }
    }, true)
  }

  shouldShow (target) {
    const className = this.options.targetClassName
    return (
      target.nodeName === 'IMG' &&
      target.naturalWidth &&
      !target.classList.contains(this.options.imageClassName) &&
      (!className || target.classList.contains(className))
    )
  }

  show (target) {
    const src = target.getAttribute('src')
    const url = target.getAttribute(this.options.urlAttribute)
    const handledUrl = this.options.urlHandler(url)
    const width = target.naturalWidth
    const height = target.naturalHeight
    const targetRect = target.getBoundingClientRect()
    const renderedRect = this.computeRenderedRect(width, height)
    const box = document.createElement('div')
    const img = document.createElement('img')

    img.src = src
    img.className = this.options.imageClassName
    img.style.transform = this.computeTransform(targetRect, renderedRect)
    this.applyRect(renderedRect, img)

    this.box = box
    box.className = this.options.boxClassName
    box.appendChild(img)
    document.body.appendChild(box)
    forceReflow()

    img.style.transform = ''
    box.style.backgroundColor = this.options.backgroundColor

    on(box, 'click', this.hide.bind(this))
    on(window, 'resize', this.hide.bind(this))
    on(window, 'scroll', this.hide.bind(this))

    if (handledUrl !== src) {
      this.loadIamge(handledUrl, img)
    }
  }

  applyRect (rect, elem) {
    elem.style.top = `${rect.top}px`
    elem.style.left = `${rect.left}px`
    elem.style.width = `${rect.width}px`
    elem.style.height = `${rect.height}px`
  }

  loadIamge (url, img) {
    this.box.classList.add('loading')
    loadIamge(url, loadedUrl => {
      img.src = url
      const rect = this.computeRenderedRect(img.naturalWidth, img.naturalHeight)
      this.applyRect(rect, img)
      this.box.classList.remove('loading')
      this.box.classList.add('loaded')
    }, () => {
      this.box.classList.remove('loading')
      this.box.classList.add('error')
    })
  }

  computeRenderedRect (originalWidth, originalHeight) {
    const viewportSize = getViewportSize()
    const margin = this.options.margin
    const safeWidth = viewportSize.width - margin * 2
    const safeHeight = viewportSize.height - margin * 2
    const widthRatio = originalWidth / safeWidth
    const heightRatio = originalHeight / safeHeight
    const ratio = Math.max(widthRatio, heightRatio, 1)
    const width = originalWidth / ratio
    const height = originalHeight / ratio
    const top = (viewportSize.height - height) / 2
    const left = (viewportSize.width - width) / 2
    return { top, left, width, height }
  }

  computeTransform (rect, tarRect) {
    const widthRatio = rect.width / tarRect.width
    const heightRatio = rect.height / tarRect.height
    const widthOffset = rect.width - tarRect.width
    const heightOffset = rect.height - tarRect.height
    const topOffset = rect.top - tarRect.top + heightOffset / 2
    const leftOffset = rect.left - tarRect.left + widthOffset / 2
    const translate = `translate3d(${leftOffset}px, ${topOffset}px, 0)`
    const scale = `scale3d(${widthRatio}, ${heightRatio}, 1)`
    return `${translate} ${scale}`
  }

  hide () {
    const box = this.box
    if (box) {
      box.classList.add('hide')
      setTimeout(function () {
        box.remove()
        forceReflow()
      }, this.options.transitionDuration)
    }
  }

  destroy () {
    if (this.ListenerRemoverList) {
      this.ListenerRemoverList.forEach(remover => {
        remover.container.classList.remove(this.options.containerClassName)
        remover.removeEventListener()
      })
    }
    this.removeCSS && this.removeCSS()
  }

}
