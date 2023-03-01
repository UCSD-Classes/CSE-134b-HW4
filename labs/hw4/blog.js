// define an array to store posts
let posts = [];

function createPost() {
    console.log("Creating post");
    // Get the values from the form
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const quarter = document.getElementById("quarter").value;
    const summary = document.getElementById("summary").value;
    let flag = false;
    console.log(title);
    console.log(date);
    console.log(quarter);
    console.log(summary);
    // Check if all fields are filled in
    if (title === "" || date === "" || quarter === "" || summary === "") {
        alert("Please fill in all fields!");
        return;
    }

    if (posts !== null && posts.length > 0) {
        // Check if title is already in the posts array
        const index = getIndex(title);
        if (index >= 0) {
            // Update the post
            posts[index] = {
                title: title,
                date: date,
                quarter: quarter,
                summary: summary
            };
            flag = true;
        }
    }  
    
    if (!flag) {
        // If post is not in the table, Add the post to the table
        const tbody = document.querySelector("table tbody");
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${title}</td>
                        <td>${date}</td>
                        <td>${quarter}</td>
                        <td>${summary}</td>
                        <td><button onclick="updatePost(this)">Edit</button></td>
                        <td><button onclick="deletePost(this); generateTable()">Delete</button></td>`;
        tbody.appendChild(tr);

        // Create a post object
        const post = {
            title: title,
            date: date,
            quarter: quarter,
            summary: summary
        };

        // Add the post to the array
        posts.push(post);
    }
    
    // Save the posts to local storage
    localStorage.setItem("posts", JSON.stringify(posts));

    // Reset the form
    document.getElementById("postForm").reset();

    //Close dialog
    document.querySelector('dialog').close();
}

function getIndex(title) {
    console.log("Getting index");
    // Loop through the posts and find the index of the post
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].title === title) {
            return i;
        }
    }
    return -1;

}

function updatePost(row) {
    console.log("Updating post")
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
    console.log("Deleting post")
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
    console.log("Generating table");
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
    console.log("Generating table");
}
