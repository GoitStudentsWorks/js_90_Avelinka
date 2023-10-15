import Notiflix from 'notiflix';
import { createCategoryMarkap } from './all-categories-books-field';
import { createBookMarkup } from './all-categories-books-field';
import { getBooksByCategory } from './fetch-requests';
import { home } from './home';
import { getAllBooksByCategory } from './home';

const allList = document.querySelector('.all-category__list');
const fieldBooks = document.querySelector('.field-books');
const sortFieldTitle = document.querySelector('.field-title');
const booksList = document.querySelector('.books-list');
const allBooksTitle = document.querySelector('.all-books-title');
const categoryField = document.querySelector('.field-categories'); // дів для кожної категорії
const booksField = document.querySelector('.books-field-wrapper');

allList.addEventListener('click', sortForCategory);

async function sortForCategory(event) {
  if (event.target.nodeName !== 'BUTTON') return;
  const categoryName = event.target.name;
  console.log(categoryName);

  try {
    if (categoryName === 'All categories') {
      resetDedicatedCategory();
      event.target.classList.add('dedicated-category');
      getAllBooksByCategory();
      return;
    } else {
      booksField.hidden = true;
      categoryField.hidden = false;
      //   allBooksTitle.style.display = 'none';
      // sortFieldTitle.style.display = 'block';
      const getCategoryName = await getBooksByCategory(categoryName);
      console.log(getCategoryName);
      //рпроблема
      const listMarkup = await createMarkup(getCategoryName, categoryName);
      console.log(listMarkup);
      fieldBooks.innerHTML = listMarkup;

      resetDedicatedCategory();
      event.target.classList.add('dedicated-category');
    }
  } catch (error) {
    console.error(error.message);
  }
}

function resetDedicatedCategory() {
  let dedicatedCategory = allList.querySelectorAll('.dedicated-category');
  dedicatedCategory.forEach(el => el.classList.remove('dedicated-category'));
}

async function createMarkup(array, categoryName) {
  const oneBook = markup(array);

  return `<h2 class="field-title">${categoryName}</h2> ${oneBook}`;
}

function markup(array) {
  let markUp = array
    .map(({ author, title, book_image, _id }) => {
      return `<li id="${_id}" class="books">
            <img loading="lazy" src="${book_image}" alt="${title}" />
            <h3>${title}</h3>
            <p>${author}</p>
           
        </li>`;
    })
    .join('');
  console.log(markUp);
  return markUp;
}
