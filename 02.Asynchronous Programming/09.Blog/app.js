function attachEvents() {
    const btnLoad = document.getElementById("btnLoadPosts");
    const btnViewPost = document.getElementById("btnViewPost");
    const postsSelect = document.getElementById("posts");
    const postTitle = document.getElementById("post-title");
    const postBody = document.getElementById("post-body");
    const postComments = document.getElementById("post-comments");

    btnLoad.addEventListener("click", loadPosts);
    btnViewPost.addEventListener("click", viewPosts);

    // допълнителна променлива за да използваме стойността на бодито на поста
    let bodyPost = "";

    async function loadPosts() {
        const urlPosts = "http://localhost:3030/jsonstore/blog/posts";

        try {
            const response = await fetch(urlPosts);

            if (response.ok === false) {
                throw new Error(response.statusText);
            }

            const data = await response.json();

            postsSelect.innerHTML = "";

            Object.entries(data).forEach(([id, obj]) => {
                const option = document.createElement("option");
                option.value = id;
                option.textContent = obj.title;
                postsSelect.appendChild(option);

                bodyPost = obj.body;
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function viewPosts() {
        let postId = "";

        const selectedOption = postsSelect.selectedOptions[0];

        if (!selectedOption) {
            return;
        }

        postId = selectedOption.value;

        postTitle.textContent = selectedOption ? selectedOption.textContent : "";

        const postUrl = `http://localhost:3030/jsonstore/blog/posts/${postId}`;
        const commentsUrl = `http://localhost:3030/jsonstore/blog/comments`;

        try {
            const [responsePosts, responseComments] = await Promise.all([
                fetch(postUrl),
                fetch(commentsUrl),
            ]);

            if (responsePosts.ok === false) {
                throw new Error(responsePosts.statusText);
            }

            if (responseComments.ok === false) {
                throw new Error(responseComments.statusText);
            }

            // new
            let title = postsSelect.querySelector("option:checked");
            postTitle.textContent = title.textContent;
            postBody.textContent = bodyPost;

            const commentsData = await responseComments.json();
            const filteredComments = Object.values(commentsData).filter(
                (x) => x.postId === postId
            );

            postComments.innerHTML = "";

            filteredComments.forEach((comment) => {
                const li = document.createElement("li");
                li.textContent = comment.text;
                postComments.appendChild(li);
            });
        } catch (error) {
            console.log(error);
        }
    }
}

attachEvents();
