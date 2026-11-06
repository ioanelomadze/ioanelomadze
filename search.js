
document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("poemSearch");
    const searchResults = document.getElementById("searchResults");

    if (!searchInput || !searchResults) return;

    // ავტომატურად ვიღებთ ყველა ლექსს არქივიდან
    const poems = Array.from(document.querySelectorAll(".archive-card"))
        .map(function (card) {
            return {
                title: card.querySelector("h3")?.textContent.trim(),
                link: card.getAttribute("href")
            };
        })
        .filter(function (poem) {
            return poem.title && poem.link;
        });

    // ძიება სათაურის ნებისმიერი ნაწილით
    searchInput.addEventListener("input", function () {

        const query = searchInput.value.trim().toLocaleLowerCase("ka");

        // წინა შედეგების გასუფთავება
        searchResults.replaceChildren();

        // ძიება იწყება მინიმუმ 3 სიმბოლოდან
        if (Array.from(query).length < 3) {
            return;
        }

        const matches = poems.filter(function (poem) {
            return poem.title.toLocaleLowerCase("ka").includes(query);
        });

        // შესაბამისი ლექსების გამოჩენა
        matches.forEach(function (poem) {

            const resultLink = document.createElement("a");

            resultLink.href = poem.link;
            resultLink.textContent = poem.title;

            searchResults.appendChild(resultLink);

        });

        // თუ შესაბამისი ლექსი არ მოიძებნა
        if (matches.length === 0) {

            const message = document.createElement("p");
            message.textContent = "ლექსი ვერ მოიძებნა";

            searchResults.appendChild(message);

        }

    });

});
