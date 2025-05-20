const pdfjsLib = window['pdfjs-dist/build/pdf'];
let pdfDoc = null;
let pages = []; // Store canvas elements for each page
let currentIndex = 0;

// Event listener for file upload
document.getElementById('file-upload').addEventListener('change', handleFileUpload);
function handleFileUpload(event) {
    const file = event.target.files[0];

    // Ensure file is a PDF
    if (file.type === 'application/pdf') {
        const fileReader = new FileReader();

        // On file load, get the document and render all pages
        fileReader.onload = function () {
            const typedarray = new Uint8Array(this.result);
            pdfjsLib.getDocument(typedarray).promise.then(function (pdf) {
                pdfDoc = pdf;
                renderAllPages();
            });
        };

        fileReader.readAsArrayBuffer(file);

        // Show navigation buttons after file is loaded
        ['prevPage', 'nextPage'].forEach((button) => {
            document.getElementById(button).style.display = "block";
        });
    }
}
// Render all pages into canvases
function renderAllPages() {
    const renderPromises = [];

    for (let i = 1; i <= pdfDoc.numPages; i++) {
        renderPromises.push(renderPage(i)); // Store the promise of each page render
    }

    // After all pages are rendered, scroll to the bottom
    Promise.all(renderPromises).then(scrollToBottom);
}
// Render a single page and return a promise
function renderPage(pageNumber) {
    return pdfDoc.getPage(pageNumber).then(function (page) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const scale = 0.5;
        const viewport = page.getViewport({ scale: scale });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };

        // Render the page into the canvas
        return page.render(renderContext).promise.then(function () {
            pages.push(canvas); // Store each canvas
            document.getElementById('pdfCarousel').appendChild(canvas);

            // Hide all but the first page
            if (pageNumber !== 1) {
                canvas.style.display = 'none';
            }
        });
    });
}
// Scroll to the bottom of the page
function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}
// Carousel navigation - Previous page
document.getElementById('prevPage').addEventListener('click', function () {
    if (currentIndex > 0) {
        changePage(currentIndex - 1);
    }
});
// Carousel navigation - Next page
document.getElementById('nextPage').addEventListener('click', function () {
    if (currentIndex < pages.length - 1) {
        changePage(currentIndex + 1);
    }
});
// Helper to change page visibility in the carousel
function changePage(newIndex) {
    pages[currentIndex].style.display = 'none'; // Hide current page
    currentIndex = newIndex; // Update current index
    pages[currentIndex].style.display = 'block'; // Show new page
}
