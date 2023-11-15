document.addEventListener("DOMContentLoaded", function() {
    const imageInput = document.getElementById('imageInput');

    // Add event listener to the label to trigger the file input
    const label = document.querySelector('label[for="imageInput"]');
    label.addEventListener('click', function() {
        imageInput.click();
    });

    // Add event listener to the file input to handle file selection
    imageInput.addEventListener('change', function() {
        const selectedFile = imageInput.files[0];

        if (selectedFile) {
            // Process the selected file (you can upload it to a server, convert to URL, etc.)
            const imageUrl = URL.createObjectURL(selectedFile);

            // Display the image URL
            alert('Image URL: ' + imageUrl);
        }
    });
});

document.addEventListenerC("DOMContentLoaded", function() {
    const imageInput = document.getElementById('imageInput');

    // Add event listener to the label to trigger the file input
    const label = document.querySelector('label[for="imageInput"]');
    label.addEventListener('click', function() {
        imageInput.click();
    });

    // Add event listener to the file input to handle file selection
    imageInput.addEventListener('change', function() {
        const selectedFile = imageInput.files[0];

        if (selectedFile) {
            // Process the selected file (you can upload it to a server, convert to URL, etc.)
            const imageUrl = URL.createObjectURL(selectedFile);

            // Display the image URL
            alert('Image URL: ' + imageUrl);
        }
    });
});