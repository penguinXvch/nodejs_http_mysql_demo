function btnOnClick() {
    // AJAX
    var request = new XMLHttpRequest();
    request.open('POST', 'btnOnClick', true);
    request.setRequestHeader('Content-type', 'application/json;charset:utf-8'); 
    request.send(null);
    request.onreadystatechange = function() {
        if(request.readyState === 4 && request.status === 200) {
            var books = JSON.parse(request.responseText);
            var table = document.getElementById('table');

            if(books.length > 0) {
                for(let book of books) {
                    var tr = document.createElement('tr');
                    table.appendChild(tr);
                
                    var tdId = document.createElement('td');
                    tdId.textContent = book.id;
                    tr.appendChild(tdId);
                
                    var tdTitle = document.createElement('td');
                    tdTitle.textContent = book.title
                    tr.appendChild(tdTitle);

                    var tdAuthor = document.createElement('td');
                    tdAuthor.textContent = book.author;
                    tr.appendChild(tdAuthor);

                    var tdDate = document.createElement('td');
                    tdDate.textContent = book.date;
                    tr.appendChild(tdDate);
                }
            }
        }
    };
}