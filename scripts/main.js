const mammoth = require('mammoth');

(function () {
  document
    .getElementById('document')
    .addEventListener('change', handleFileSelect, false);

  function handleFileSelect(event) {
    readFileInputEventAsArrayBuffer(event, function (arrayBuffer) {
      mammoth
        .convertToHtml({ arrayBuffer: arrayBuffer })
        .then(displayResult)
        .done();
    });
  }

  function displayResult(result) {
    document.getElementById('output').innerHTML = result.value;

    var messageHtml = result.messages
      .map(function (message) {
        return (
          '<li class="' +
          message.type +
          '">' +
          escapeHtml(message.message) +
          '</li>'
        );
      })
      .join('');

    document.getElementById('messages').innerHTML =
      '<ul>' + messageHtml + '</ul>';
  }

  function readFileInputEventAsArrayBuffer(event, callback) {
    var file = event.target.files[0];

    var reader = new FileReader();

    reader.onload = function (loadEvent) {
      var arrayBuffer = loadEvent.target.result;
      callback(arrayBuffer);
    };

    reader.readAsArrayBuffer(file);
  }

  function escapeHtml(value) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
})();

function parseWordDocxFile(inputElement) {
  var files = inputElement.files || [];
  if (!files.length) return;
  var file = files[0];

  console.time();
  var reader = new FileReader();
  reader.onloadend = function (event) {
    var arrayBuffer = reader.result;
    // debugger

    mammoth
      .convertToHtml({ arrayBuffer: arrayBuffer })
      .then(function (resultObject) {
        result1.innerHTML = resultObject.value;
        console.log(resultObject.value);
      });
    console.timeEnd();

    mammoth
      .extractRawText({ arrayBuffer: arrayBuffer })
      .then(function (resultObject) {
        result2.innerHTML = resultObject.value;
        console.log(resultObject.value);
      });

    mammoth
      .convertToMarkdown({ arrayBuffer: arrayBuffer })
      .then(function (resultObject) {
        result3.innerHTML = resultObject.value;
        console.log(resultObject.value);
      });
  };
  reader.readAsArrayBuffer(file);
}
