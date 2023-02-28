// define an array to store posts
let posts = [];

function createPost() {
    // Get the values from the form
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const quarter = document.getElementById("quarter").value;
    const summary = document.getElementById("summary").value;

    // Check if all fields are filled in
    if (title === "" || date === "" || quarter === "" || summary === "") {
        alert("Please fill in all fields!");
        return;
    }
    
    // Add the post to the table
    const tbody = document.querySelector("table tbody");
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${title}</td>
                    <td>${date}</td>
                    <td>${quarter}</td>
                    <td>${summary}</td>
                    <td><button onclick="updatePost(this)">Edit</button></td>
                    <td><button onclick="deletePost(this); generateTable()">Delete</button></td>`;
    tbody.appendChild(tr);

    // Add the post to the array
    posts.push({
        title: title,
        date: date,
        quarter: quarter,
        summary: summary
    });

    // Save the posts to local storage
    localStorage.setItem("posts", JSON.stringify(posts));

    // Reset the form
    document.getElementById("postForm").reset();
    // Close dialog
    exitDialog();   
}

function setDate() {
    // Get the current date
    const date = new Date();
    // Set the date in the form
    document.getElementById("date").value = date.toISOString().substring(0, 10);
}

function updatePost(row) {
    const selectedRow = row.parentElement.parentElement;

    const title = selectedRow.cells[0].innerHTML;
    const date = selectedRow.cells[1].innerHTML;
    const quarter = selectedRow.cells[2].innerHTML;
    const summary = selectedRow.cells[3].innerHTML;

    document.getElementById("title").value = title;
    document.getElementById("date").value = date;
    document.getElementById("quarter").value = quarter;
    document.getElementById("summary").value = summary;

    document.querySelector("dialog").showModal();
}



function deletePost(row) {
    const selectedRow = row.parentElement.parentElement;
    const title = selectedRow.cells[0].innerHTML;
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].title === title) {
            posts.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("posts", JSON.stringify(posts));
    selectedRow.remove();
}

function generateTable() {
    // Get the table body
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";

    // Get the posts from local storage
    posts = JSON.parse(localStorage.getItem("posts"));

    // If there are no posts, return
    if (posts === null) {
        return;
    }

    // Loop through the posts and add them to the table
    for (let post of posts) {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${post.title}</td>
                        <td>${post.date}</td>
                        <td>${post.quarter}</td>
                        <td>${post.summary}</td>
                        <td><button onclick="updatePost(this)">Edit</button></td>
                        <td><button onclick="deletePost(this)">Delete</button></td>`;
        tbody.appendChild(tr);
    }

}

// getPost needs a index, getIndex needs a title
getPost(getIndex(title));

function exitDialog() {
    // close dialog
    document.getElementById("postDialog").close();
}


