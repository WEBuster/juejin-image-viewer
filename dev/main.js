var imageViewer = new JuejinImageViewer(document.body, {
  urlHandler: url => url.split('?')[0],
  targetClassName: 'target'
})

// imageViewer.destroy()
