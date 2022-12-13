//1
function createElemWithText(
  nameOfElToBeCreated = "p",
  textContentOfCreatedEl = "",
  className = ""
) {
  let newlyCreatedElWithText = document.createElement(nameOfElToBeCreated);

  newlyCreatedElWithText.textContent = textContentOfCreatedEl;

  newlyCreatedElWithText.className = className;

  return newlyCreatedElWithText;
}

console.log(createElemWithText("p", "Newly created paragraph or p element."));
console.log(
  createElemWithText("h1", "Newly created h1 or heading element.", "h1class")
);
console.log(
  createElemWithText("div", "Newly created div element.", "divclass")
);
console.log(createElemWithText("h3", "Newly created h3 element."));

//2
function createSelectOptions(users) {
  if (users === undefined || users === null) {
    return undefined;
  }

  optionArray = [];

  for (user of users) {
    console.log(user);
    var opt = document.createElement("option");

    opt.value = user.id;

    opt.innerHTML = user.name;

    optionArray.push(opt);
  }

  return optionArray;
}

//3
function toggleCommentSection(postId) {
  let section = document.querySelector(`section[data-post-id="${postId}"]`);
  if (section) {
    section.classList.toggle("hide");
  }
  return section;
}
toggleCommentSection(1);
toggleCommentSection(2);

//4
function toggleCommentButton(postID) {
  return;
  if (!postID) {
    return;
  }
  const btnSelectedEl = document.querySelector(
    `button[data-post-id = "${postID}"`
  );
  if (btnSelectedEl != null) {
    btnSelectedEl.textContent === "Show Comments"
      ? (btnSelectedEl.textContent = "Hide Comments")
      : (btnSelectedEl.textContent = "Show Comments");
  }
  return btnSelectedEl;
}
console.log(toggleCommentButton("btnToTest"));

//5
function deleteChildElements(parentElement) {
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
  return parentElement;
}

//6
const addButtonListeners = function () {
  const buttons = document
    .querySelectorAll("main")[0]
    .querySelectorAll("button");

  if (buttons.length > 0) {
    buttons.forEach((button) => {
      const postID = button.dataset.postId;
      button.addEventListener("click", function () {
        toggleComments(postID);
      });
    });
  }
  return buttons;
};

function toggleComments(postID) {}

//7
function removeButtonListeners() {
  var buttons = document.getElementById("mainDiv").querySelectorAll("button");

  console.log(buttons);

  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    document
      .getElementById(button.id)
      .removeEventListener("click", toggleComments);
  }
}

//8
function createComments(comments) {
  if (!comments) {
    return undefined;
  }
  let frag = document.createDocumentFragment();

  for (let i = 0; i < comments.length; i++) {
    const element = comments[i];

    let a = document.createElement("a");

    let h3 = createElemWithText("h3", comments.name);

    let p1 = createElemWithText("p", comments.body);

    let p2 = createElemWithText("p", `From: ${comments.email}`);

    a.appendChild(h3);
    a.appendChild(p1);
    a.appendChild(p2);
    frag.appendChild(a);
  }

  return frag;
}

//9
function populateSelectMenu(users) {
  if (!users) {
    return undefined;
  }

  let selectMenu = document.getElementById("selectMenu");

  let options = createSelectOptions(users);

  for (let i = 0; i < options.length; i++) {
    const o = options[i];
    let option = document.createElement("option");
    option.innerText = o;
    selectMenu.appendChild(option);
  }

  return selectMenu;
}

//10
async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

//11
async function getUserPosts(id) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${id}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

//12
const getUser = async (userId) => {
  if (!userId) return;
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const jsonUserIdData = await response.json();
    console.log(userId);
    return jsonUserIdData;
  } catch (error) {
    console.log(error);
  }
  console.log(jsonUserIdData);
};
console.log(getUser());

//13
const getPostComments = async (postId) => {
  if (!postId) return;
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    const jsonPostComments = await response.json();
    return jsonPostComments;
  } catch (error) {
    console.log(error);
  }
};

//14
const displayComments = async (postId) => {
  if (!postId) return;
  let section = document.createElement("section");
  section.dataset.postId = postId;
  section.classList.add("comments", "hide");
  const comments = await getPostComments(postId);
  const fragment = createComments(comments);
  section.append(fragment);
  console.log(section);
  return section;
};
console.log(displayComments(5));

//15
const createPosts = async (jsonPosts) => {
  if (!jsonPosts) return;

  let fragment = document.createDocumentFragment();

  for (let i = 0; i < jsonPosts.length; i++) {
    let post = jsonPosts[i];

    let article = document.createElement("article");
    let section = await displayComments(post.id);
    let author = await getUser(post.userId);

    let h2 = createElemWithText("h2", post.title);
    let p = createElemWithText("p", post.body);
    let p2 = createElemWithText("p", `Post ID: ${post.id}`);

    let p3 = createElemWithText(
      "p",
      `Author: ${author.name} with ${author.company.name}`
    );
    let p4 = createElemWithText("p", `${author.company.catchPhrase}`);

    let button = createElemWithText("button", "Show Comments");
    button.dataset.postId = post.id;

    article.append(h2, p, p2, p3, p4, button, section);

    fragment.append(article);
  }
  console.log(fragment);
  return fragment;
};

//16
const displayPosts = async (posts) => {
  let myMain = document.querySelector("main");
  let element = posts
    ? await createPosts(posts)
    : document.querySelector("main p");
  myMain.append(element);
  return element;
};

//17
function toggleComments(event, postId) {
  if (!event || !postId) {
    return undefined;
  }
  event.target.listener = true;
  let section = toggleCommentSection(postId);
  let button = toggleCommentButton(postId);
  return [section, button];
}

//18
const refreshPosts = async (posts) => {
  if (!posts) {
    return undefined;
  }
  let buttons = removeButtonListeners();
  let myMain = deleteChildElements(document.querySelector("main"));
  let fragment = await displayPosts(posts);
  let button = addButtonListeners();
  return [buttons, myMain, fragment, button];
};

//19
const selectMenuChangeEventHandler = async (e) => {
  let userId = e?.target?.value || 1;
  let posts = await getUserPosts(userId);
  let refreshPostsArray = await refreshPosts(posts);
  return [userId, posts, refreshPostsArray];
};

//20
const initPage = async () => {
  let users = await getUsers();
  let select = populateSelectMenu(users);
  return [users, select];
};

//21
function initApp() {
  initPage();
  let select = document.getElementById("selectMenu");
  select.addEventListener("change", selectMenuChangeEventHandler, false);
}
