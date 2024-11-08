document.addEventListener('DOMContentLoaded', function () {
    const downloadButton = document.querySelector('a[href="/medicines/download"]');
    if (downloadButton) {
      downloadButton.addEventListener('click', function (event) {
        event.preventDefault(); 
        window.location.href = '/medicines/download'; 
      });
    }
  });
  