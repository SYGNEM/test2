// jshint esversion: 6
// jshint esversion: 8

////// search system start //////
const searchResults = document.getElementById('searchResults');
const searchBar = document.getElementById("searchBar");
const crossBtn = document.getElementById("crossBtn");
const srcBtn = document.getElementById("srcBtn");
const invisible = document.getElementById("invisible");
const home = '<h1 id="home" class="home">This is home screen!</h1>';
const typeMore = '<p>Search is Ready...<br>Type at least 3 letters to get results.</p>';
const noResult = '<p id="noResult">No result found!</p>';
let results = [];

function isEmpty(str) {
    return !str.trim().length;
}

// filter results
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredResults = results.filter((item) => {
        return (
            item.title.toLowerCase().includes(searchString) ||
            item.subtopics.toLowerCase().includes(searchString) ||
            item.description.toLowerCase().includes(searchString)
        );
    });
    displayResults(filteredResults);
});

// fetch json
async function loadContents() {
    try {
        const res = await fetch('search.json');
        results = await res.json();
        displayResults(results);
    } catch (err) {
        console.error(err);
    }
}

// display results
function displayResults(contents) {
    if (searchBar.value.length == 0) {
        searchResults.innerHTML = home;
        srcBtn.style.display = "block";

        searchBar.onclick = function () {
            searchResults.innerHTML = home;
            invisible.style.display = "block";
        };
    }
    // else if input has less than 3 letters
    else if (searchBar.value.length == 1 || searchBar.value.length == 2) {
        searchResults.innerHTML = typeMore;
        srcBtn.style.display = "none";

        searchBar.onclick = function () {
            searchResults.innerHTML = typeMore;
            invisible.style.display = "block";
        };
    }
    // else if input has 3 or more letters
    else if (searchBar.value.length > 2) {
        srcBtn.style.display = "none";
        const htmlString = contents
            .map((item) => {
                return `
            <a id="resultLinks" href="${item.url}">
            <li class="item">
                <h3>${item.title}</h3>
                <p>Subtopics: ${item.subtopics}</p>      
            </li>
            </a>
        `;
            })
            .join('');
        searchResults.innerHTML = htmlString;
        searchBar.onclick = function () {
            searchResults.innerHTML = htmlString;
            invisible.style.display = "block";
        };

        if (searchResults.innerHTML == "") {
            searchResults.innerHTML = noResult;
            searchBar.onclick = function () {
                searchResults.innerHTML = noResult;
                invisible.style.display = "block";
            };
        }
    }
}

loadContents();

// click actions
invisible.onclick = function () {
    this.style.display = "none";
    searchResults.innerHTML = home;
};

crossBtn.onclick = function () {
    searchBar.value = "";
    srcBtn.style.display = "block";
    searchResults.innerHTML = home;
    searchBar.focus();
};

srcBtn.onclick = function () {
    searchBar.focus();
    invisible.style.display = 'block';
};

// show INVISIBLE div if input field is focused
if (searchBar === document.activeElement) {
    invisible.style.display = 'block';
}

// search btn, cross btn, search bar HOVER and FOCUS check
setInterval(function () {
    if (searchBar.matches(':hover') || srcBtn.matches(':hover') || crossBtn.matches(':hover') || searchBar === document.activeElement) {
        searchBar.classList.add('srcBarBorder-focused');
    } else {
        searchBar.classList.remove('srcBarBorder-focused');
        searchBar.classList.add('srcBarBorder-notFocused');
    }
}, 100);

// focus on search-bar with forward slash key press
document.addEventListener("keyup", function (e) {
    if (e.key == '/') {
        e.preventDefault();
        searchBar.focus();
        // console.log('slash is pressed');
        // $('#searchBar').trigger('click');
    }
});

// remove focus from search-bar with ESC key press
document.addEventListener("keyup", function (e) {
    if (e.key === 'Escape') {
        // console.log("ESP is pressed");
        invisible.style.display = "none";
        searchBar.blur();
        searchResults.innerHTML = home;
    }
});

// ////// SEARCH SYSTEM ENDs //////

//// BUTTON RIPPLE EFFECT start ////
var rippleContainers = document.querySelectorAll('.ripple');

class RippleStyleAttributes {
    constructor(width, height, posX, posY) {
        this.width = (width <= height) ? height : width;
        this.height = (width <= height) ? height : width;
        this.top = posY - (this.height * 0.5);
        this.left = posX - (this.width * 0.5);
    }
}

rippleContainers.forEach((ripplecontainer) => {
    ripplecontainer.addEventListener('click', function (ev) {
        let tag = document.createElement("span");
        tag.className = "ripple-animation";
        let pos = this.getBoundingClientRect();
        let width = this.offsetWidth;
        let height = this.offsetHeight;
        let posX = ev.pageX - pos.left;
        let posY = ev.pageY - pos.top;
        let rippleStyleAttr = new RippleStyleAttributes(width, height, posX, posY);
        tag.style.width = rippleStyleAttr.width + 'px';
        tag.style.height = rippleStyleAttr.height + 'px';
        tag.style.top = rippleStyleAttr.top + 'px';
        tag.style.left = rippleStyleAttr.left + 'px';
        this.appendChild(tag);
    });
});
//// BUTTON RIPPLE EFFECT end ////


