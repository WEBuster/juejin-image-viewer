export function on (elem, eventName, fn, useCapture = false) {
  elem.addEventListener(eventName, fn, useCapture)
  return function () {
    elem.removeEventListener(eventName, fn, useCapture)
  }
}

export function getViewportSize () {
  const root = document.documentElement
  return {
    width: Math.max(root.clientWidth, window.innerWidth || 0),
    height: Math.max(root.clientHeight, window.innerHeight || 0)
  }
}

export function applyCSS (css, id = '') {
  const head = document.getElementsByTagName('head')[0]
  const node = document.getElementById(id) || document.createElement('style')
  node.innerHTML = css
  if (id) {
    node.id = id
  }
  if (!head.contains(node)) {
    head.appendChild(node)
  }
  return function () {
    node.remove()
  }
}

export function loadIamge (url, onLoaded, onError) {
  if (!url) { return }
  const image = new Image()
  image.onload = function () { onLoaded && onLoaded(url) }
  image.onerror = function () { onError && onError(url) }
  image.src = url
}

export function forceReflow () {
  document.body.clientWidth
}
