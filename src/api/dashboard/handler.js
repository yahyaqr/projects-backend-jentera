class DashboardHandler {
  // eslint-disable-next-line class-methods-use-this
  getDashboard(request, h) {
    // Return the HTML file using the `file` method of the `h` toolkit
    return h.file('public/index.html');
  }
}

module.exports = DashboardHandler;
