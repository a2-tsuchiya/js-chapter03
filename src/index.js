import faker from "faker";

const initialCount = 500;
/**
 * generate dammy users
 * @returns {object} name,email,job
 */
export const generateUsers = (count = initialCount) => {
  return [...Array(count)].map(() => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    job: faker.name.jobTitle()
  }));
};

/**
 * 名前空間という考え方を覚えておきましょう。
 * JSにnamespaceという概念はないのでオブジェクトでラップすることで実現できます。
 */
const $list = {};

/**
 * Question1
 * ユーザの名前一覧を表示するリストを作成する関数を作ってください。
 * <ul>要素にはlist-group、<li>要素にはlist-group-itemというクラスを付与してください。
 * @param {object} users
 * @returns {element} ul element
 */
const createUserList = (users) => {
  const ul = document.createElement("ul");
  ul.className = "list-group";
  const userList = users.map((user) => {
    const li = document.createElement("li");
    li.innerText = user.name;
    li.className = "list-group-item";
    // li.addEventListener("click", () => user.showMessage()); //Q4
    return li;
  });
  ul.append(...userList);
  return ul;
};

/**
 * Question2
 * 名前をキーワード検索する関数を作ってください。
 * @param {object[]} users dammy user list
 * @param {string} searchValue search value
 * @returns {object[]} filtered user list
 */
const searchByName = (users, searchValue) =>
  users.filter((user) => user.name.indexOf(searchValue) >= 0);

/**
 * Question3
 * Searchボタンを押すと、検索ボックスに入力された任意の文字列でユーザ名を検索する関数を作ってください。
 * @param {object[]} users dammy user list
 */
const handleSearchByName = (users) => {
  const searchBtn = document.getElementById("search-btn");
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const input = document.querySelector("input[aria-label='Search']");
    const filteredUsers = searchByName(users, input.value);

    $list.next = createUserList(filteredUsers);
    app.replaceChild($list.next, $list.prev);
    $list.prev = $list.next;
  });
};

/**
 * Question4
 * 自身のアドレスをアラート表示する関数があります。
 * リストの各ユーザをクリックしたときに、この関数が実行される（つまりアラートが出る）ようにしてください。
 * この関数は必ず使用してください。そして書き換えてはいけません。。
 */
export const showMessage = function () {
  window.alert(`My Address is ${this.email}`);
};

/**
 * Question5
 * リストがしょぼいので、ユーザ情報を表示するカードを作成する関数を作りましょう。
 * document.createElementとかそろそろめんどくさいですよね。。
 * ご安心ください。templateをご用意しましたので、お使いくださいませ。
 * <div class="col"></div>を複製すればいい感じに行けると思います。
 * どうやって複製するかって？そろそろ自分で調べてみましょう。。
 */

/**
 * Question5-1
 * ユーザ情報を反映したカードを作成する関数
 * imgにはavatarのURL、タイトルにはname、テキストには、emailとjobを転記してください。
 * @param {object} user dammy user object
 * @param {element} card template div element
 * @returns {element} element with user info
 */
const createCard = (user, card) => {
  const { name, email, job } = user;
  const $name = card.querySelector(".card-name");
  const $email = card.querySelector(".card-email");
  const $job = card.querySelector(".card-job");
  $name.innerText = name;
  $email.innerText = `Address: ${email}`;
  $job.innerText = `Job: ${job}`;

  return card;
};

/**
 * Question5-2
 * カードをリスト表示する関数
 * templateをラップする<div>要素にはめんどくさいですが、
 * 「row row-cols-1 row-cols-md-3」というクラスを付与してください。
 * @param {object[]} users dammy user list
 * @returns {element} div element
 */
const createUserCards = (users) => {
  const template = document.querySelector("#template .col");
  const userCards = users.map((user) => {
    const copy = template.cloneNode(true);
    return createCard(user, copy);
  });

  const div = document.createElement("div");
  div.classList.add("row", "row-cols-1", "row-cols-md-3");
  div.append(...userCards);
  return div;
};

/**
 * Question5-3
 * ついでに検索機能も拡張しましょう。name,email,job全てで絞り込める関数を作りましょう。
 * @param {object[]} users dammy user list
 * @param {string} searchValue search word
 * @returns {object[]} filtered user list
 */
const multipleSearch = (users, searchValue) => {
  const filteredUsers = users.filter((user) => {
    return Object.keys(user).some((key) => {
      if (typeof user[key] === "string") {
        return user[key].indexOf(searchValue) >= 0;
      }
      return false;
    });
  });
  return filteredUsers;
};

/**
 * Question5-4
 * イベントリスナーも更新しましょう
 * @param {object[]} users dammy user list
 */
const handleMultipleSearch = (users) => {
  const searchBtn = document.getElementById("search-btn");
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const input = document.querySelector("input[aria-label='Search']");
    const filteredUsers = multipleSearch(users, input.value);

    $list.next = createUserCards(filteredUsers);
    app.replaceChild($list.next, $list.prev);
    $list.prev = $list.next;
  });
};

/**
 * initialize
 */
$list.users = generateUsers();
// $list.users = $list.users.map((user) => ({ ...user, showMessage })); //Q4

// $list.prev = createUserList($list.users);
// handleSearchByName($list.users)

$list.prev = createUserCards($list.users); //Q5
handleMultipleSearch($list.users);

/**
 * render
 */
const app = document.getElementById("app");
app.append($list.prev);
