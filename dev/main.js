var imageViewer = new JuejinImageViewer(document.body, {
  urlHandler: url => url.split('?')[0],
  targetClassName: 'target',
  margin: 50
})

// imageViewer.destroy()
