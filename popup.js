import { getCurentTab } from "./utils";

const addNewBookmark = () => {};

const viewBookmarks = (currentVideoBookmarks=[]) => {
    const bookmarksElement = document.getElementById("bookmarks");
    bookmarksElement.innerHTML = "";

    if (currentVideoBookmarks.length > 0) {
        for (let i = 0; i < currentVideoBookmarks.length; i++) {
            const bookmark = currentVideoBookmarks[i];
            addNewBookmark(bookmarksElement, bookmark);
        }
    } else {
        bookmarksElement.innerHTML = '<i class="row">No bookmarks yet</i>';
    }
};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes = () => {};

document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getCurentTab();
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    const currentVideo = urlParameters.get("v");

    if (activeTab.url.includes("https://www.youtube.com/watch") && currentVideo) {
        chrome.storage.sync.get([currentVideo], (obj) => {
            const currentVideoBookmarks = obj[currentVideo] ? JSON.parse(obj[currentVideo]) : [];

            viewBookmarks(currentVideoBookmarks);
        })
    } else {
        const container = document.getElementsByClassName("container")[0];

        console.log(container);

        container.innerHTML = '<div class="title"> This is not a youtube video </div>';
    }
});