document.getElementById('uploadButton').addEventListener('click', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const fileReader = new FileReader();
        fileReader.onload = function (event) {
            const functionDescription = event.target.result;
            document.getElementById('functionDescInput').innerText = functionDescription;
        };
        fileReader.readAsText(file);
    } else {
        console.error('No file selected.');
    }
});

document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const programmingLanguage = document.getElementById('programmingLanguage').innerText.trim();
    const functionDescInput = document.getElementById('functionDescInput').innerText.trim();
    const functionDescription = programmingLanguage.concat(' \n', functionDescInput);


    if (functionDescription) {
        console.log(functionDescription);
        document.getElementById('loading').style.display = 'block';

        try {
            const response = await fetch('/generate-test-cases', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ functionDescription }),
            });
            if (response.ok) {
                const data = await response.json();
                document.getElementById('testCases').innerText = data.testCases;
            } else {
                document.getElementById('testCases').innerText = 'Error: Unable to fetch test cases.';
            }
        } catch (error) {
            console.error(error);
            document.getElementById('testCases').innerText = 'Error: Unable to fetch test cases.';
        }
        finally {
            document.getElementById('loading').style.display = 'none';
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const contentEditableDivs = document.querySelectorAll('.contentEditableDiv');

    contentEditableDivs.forEach(div => {
        div.addEventListener('paste', function (event) {
            // Prevent default paste behavior
            event.preventDefault();

            // Get pasted text
            const pastedText = (event.clipboardData || window.clipboardData).getData('text');

            // Wrap the pasted text with a div to apply formatting
            const formattedText = `<div style="font-family: monospace;">${pastedText}</div>`;

            // Insert the formatted text into the contenteditable div
            document.execCommand('insertHTML', false, formattedText);
        });
    });
});
