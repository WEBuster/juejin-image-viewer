var imageViewer = new JuejinImageViewer(document.body, {
  urlGetter: elem => elem.getAttribute('src').split('?')[0],
  targetFilter: elem => elem.classList.contains('target'),
  margin: 50
})

// imageViewer.destroy()
