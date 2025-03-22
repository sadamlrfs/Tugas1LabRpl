const postForm = document.getElementById("postForm");
const postContent = document.getElementById("postContent");
const postsContainer = document.getElementById("postsContainer");

let posts = JSON.parse(localStorage.getItem("posts")) || [];

const savePosts = () => {
  localStorage.setItem("posts", JSON.stringify(posts));
};

const renderPosts = () => {
  postsContainer.innerHTML = "";
  posts.forEach((post, index) => {
    const postDiv = document.createElement("div");
    postDiv.className = "post";

    const content = document.createElement("p");
    content.textContent = post.text;
    postDiv.appendChild(content);

    const likeCount = document.createElement("div");
    likeCount.className = "likes";
    likeCount.textContent = `❤️ ${post.likes} like${post.likes !== 1 ? "s" : ""}`;
    postDiv.appendChild(likeCount);

    const actions = document.createElement("div");
    actions.className = "post-actions";

    const likeBtn = document.createElement("button");
    likeBtn.textContent = "Like";
    likeBtn.onclick = () => handleLike(index);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => handleEdit(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => handleDelete(index);

    actions.appendChild(likeBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    postDiv.appendChild(actions);

    postsContainer.appendChild(postDiv);
  });
};

const handleLike = (index) => {
  posts[index].likes++;
  savePosts();
  renderPosts();
};

const handleEdit = (index) => {
  const newText = prompt("Ubah postingan kamu jadi apa:", posts[index].text);
  if (newText !== null && newText.trim() !== "") {
    posts[index].text = newText.trim();
    savePosts();
    renderPosts();
  }
};

const handleDelete = (index) => {
  if (confirm("Yakin mau hapus postingan kamu?")) {
    posts.splice(index, 1);
    savePosts();
    renderPosts();
  }
};

postForm.onsubmit = (e) => {
  e.preventDefault();
  const text = postContent.value.trim();
  if (text) {
    posts.unshift({ text, likes: 0 });
    savePosts();
    renderPosts();
    postContent.value = "";
  }
};

renderPosts();
