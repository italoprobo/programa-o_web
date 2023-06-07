
const loadPosts = () => {
    fetch('http://localhost:3000/posts')
        .then(response => response.json())
        .then(postIds => {
            postIds.sort((a, b) => b - a);

            postIds.forEach(postId => {
                fetch('http://localhost:3000/posts/' + postId)
                    .then(response => response.json())
                    .then(post => {
                        appendPost(post);
                    });
            });
        });
};

async function addPost() {
    const newPost = {
        "title": document.getElementById('post-title').value,
        "text": document.getElementById('post-text').value,
        "date": getCurrentDate(),
        "likes": 0
    };

    const config = {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    };

    const response = await fetch('http://localhost:3000/posts', config);
    const post = await response.json();

    appendPost(post);
}

async function likePost(postId) {
    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    const response = await fetch(`http://localhost:3000/posts/${postId}/like`, config);
    const updatedPost = await response.json();
  
    updateLikesCount(postId, updatedPost.likes);
}

function appendPost(post) {
  const template = document.getElementById('post-template');
  const postElement = document.importNode(template.content, true);

  const postTitle = postElement.querySelector('.post-title');
  postTitle.innerText = post.title;

  const postText = postElement.querySelector('.post-text');
  postText.innerText = post.text;

  const postDate = postElement.querySelector('.post-date');
  postDate.innerText = post.date;

  const postLikes = postElement.querySelector('.post-likes');
  postLikes.innerText = post.likes + " like(s)";

  const darLikeLink = postElement.querySelector('.dar-like a');
  darLikeLink.addEventListener('click', () => {
      likePost(post.id);
  });

  const deletePostLink = postElement.querySelector('.delete-post');
  deletePostLink.addEventListener('click', (event) => {
      confirmPostDeletion(event, post.id);
  });


    document.getElementById('timeline').appendChild(postElement);
}


function confirmPostDeletion(event, postId) {
  event.preventDefault();

  const shouldDelete = confirm('Tem certeza que quer excluir?');

  if (shouldDelete) {
      deletePost(postId);
      location.reload();
  }
}


function getCurrentDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
}

function updateLikesCount(postId, likesCount) {
    const postLikes = document.querySelector(`#post-${postId} .post-likes`);
    postLikes.innerText = likesCount + " like(s)";
          location.reload();
}

function deletePost(postId) {
  fetch(`http://localhost:3000/posts/${postId}`, {
      method: 'DELETE',
  })
      .then(response => response.json())
      .then(data => {
          if (data.error) {
              alert(data.error);
          } else {
              removePostFromDOM(postId);
          }
      })
      .catch(error => {
          console.error('Error deleting post:', error);
      });
}

function removePostFromDOM(postId) {
  const postElement = document.querySelector(`[data-post-id="${postId}"]`);
  if (postElement) {
      postElement.remove();
  }
}

window.onload = () => {
    const btnAddPost = document.getElementById('add-post');
    btnAddPost.onclick = addPost;
    loadPosts();
};
