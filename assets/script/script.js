const bookList = [];

const html = {
	form: document.querySelector("form"),
	status: {
		planToRead: document.querySelector("#status__plan-to-read .book-list"),
		reading: document.querySelector("#status__reading .book-list"),
		completed: document.querySelector("#status__completed .book-list")
	},
	addBookInput: {
		title: document.querySelector("#input_title"),
		author: document.querySelector("#input_author"),
		radio: {
			planToRead: document.querySelector("#plan-to-read"),
			reading: document.querySelector("#reading"),
			completed: document.querySelector("#completed")
		}
	}
};

class Book {
	constructor() {
		this.title = html.addBookInput.title.value;
		this.author = html.addBookInput.author.value;
		this.status = this.getStatus();
		this.id = this.getId();
	};

	getStatus() {
		if (html.addBookInput.radio.planToRead.checked) {
			return html.addBookInput.radio.planToRead.value;
		} else if (html.addBookInput.radio.reading.checked) {
			return reading.value;
		} else if (html.addBookInput.radio.completed.checked) {
			return html.addBookInput.radio.completed.value;
		};
	};

	getId() {
		return +new Date;
	};
};

let bookFunction = {
	addBook: function addBook() {
		let book = new Book();
		
		const bookItem = `<fieldset id=${book.id} class='book-item ${book.status}'><legend class='book-title'>${book.title}</legend><span class='book-author'>Author: ${book.author}</span><button class='remove' onclick='bookFunction.removeBook(this.parentNode.id)'>X</button><button class='move-down' onclick='bookFunction.moveDown(this.parentNode.id)'>&darr;</button><button class='move-up' onclick='bookFunction.moveUp(this.parentNode.id)'>&uarr;</button></fieldset>`;
		
		let titleValue = html.addBookInput.title.value;
		let authorValue = html.addBookInput.author.value;

		if (titleValue == "" || authorValue == "") {
			// Don't mind this empty if.
		} else {
			switch (book.status) {

				case "Plan-To-Read":
					let emptyText1 = document.querySelector(".empty1");
					if (emptyText1.style.display = "inline") {
						emptyText1.style.display = "none";
					};
					const statusPlanToRead = document.querySelector("#status__plan-to-read .book-list");
					statusPlanToRead.classList.remove("empty");
					statusPlanToRead.innerHTML += bookItem;

					bookList.push(book);
					storage.saveData();
					break;

				case "Reading":
					let emptyText2 = document.querySelector(".empty2");
					if (emptyText2.style.display = "inline") {
						emptyText2.style.display = "none";
					};
					const statusReading = document.querySelector("#status__reading .book-list");
					statusReading.classList.remove("empty");
					statusReading.innerHTML += bookItem;

					bookList.push(book);
					storage.saveData()
					break;

				case "Completed":
					let emptyText3 = document.querySelector(".empty3");
					if (emptyText3.style.display = "inline") {
						emptyText3.style.display = "none";
					};
					const statusCompleted = document.querySelector("#status__completed .book-list");
					statusCompleted.classList.remove("empty");
					statusCompleted.innerHTML += bookItem;

					bookList.push(book);
					storage.saveData();
					break;
			};
		};
	},
	removeBook: function removeBook(id) {
		const bookItem = document.getElementById(id);
		const bookId = id;
		bookItem.remove();

		// storage.removeData(bookId);
		storage.updateData("Deleted / Recycled", bookId);
		storage.saveData();

		for (let i = 0; i <= bookList.length; i++) {

			// Remove Object From Array.
			if (bookList[i].id == bookId) {
				bookList.splice(i, 1);
			};
		};
	},
	moveUp: function moveUp(id) {
		const moveUpButton = document.getElementById(id).childNodes[4];
		const buttonParentUp = document.getElementById(id);
		const bookId = id;

		// Up button if.

		if (buttonParentUp.classList.contains("Plan-To-Read") == true) {
			storage.saveData(); // Very Top.

		} else if (buttonParentUp.classList.contains("Reading") == true) {
			moveUpButton.parentElement.remove();

			const planToRead = html.status.planToRead;
			planToRead.appendChild(buttonParentUp);

			extraFunction.giveClass(buttonParentUp, "Plan-To-Read");
			extraFunction.removeClass(buttonParentUp, "Reading");

			storage.updateData("Plan-To-Read", bookId);
			storage.saveData(); // Middle to top.

		} else if (buttonParentUp.classList.contains("Completed")) {
			moveUpButton.parentElement.remove();

			const reading = html.status.reading;
			reading.appendChild(buttonParentUp);

			extraFunction.giveClass(buttonParentUp, "Reading");
			extraFunction.removeClass(buttonParentUp, "Completed");

			storage.updateData("Reading", bookId);
			storage.saveData(); // Bottom to middle.

		};
	},
	moveDown: function moveDown(id) {
		const moveDownButton = document.getElementById(id).childNodes[3];
		const buttonParentDown = document.getElementById(id);
		const bookId = id;

		// Down button if.

		if (buttonParentDown.classList.contains("Completed") == true) {
			storage.saveData(); // Very Bottom.

		} else if (buttonParentDown.classList.contains("Reading") == true) {
			moveDownButton.parentElement.remove();

			const completed = html.status.completed;
			completed.appendChild(buttonParentDown);

			extraFunction.giveClass(buttonParentDown, "Completed");
			extraFunction.removeClass(buttonParentDown, "Reading");

			storage.updateData("Completed", bookId);
			storage.saveData(); // Middle to bottom.

		} else if (buttonParentDown.classList.contains("Plan-To-Read")) {
			moveDownButton.parentElement.remove();

			const reading = html.status.reading;
			reading.appendChild(buttonParentDown);

			extraFunction.giveClass(buttonParentDown, "Reading");
			extraFunction.removeClass(buttonParentDown, "Plan-To-Read");

			storage.updateData("Reading", bookId);
			storage.saveData(); // Top to Middle.

		};
	}
};

let extraFunction = {
	giveClass: function giveClass(el, position) {
		el.classList.add(position);
	},
	removeClass: function removeClass(el, position) {
		el.classList.remove(position);
	},
	checkIfEmpty: function checkIfEmpty() {
			let itemCountOne = document.querySelector("#status__plan-to-read .book-list").children.length;
			let itemCountTwo = document.querySelector("#status__reading .book-list").children.length;
			let itemCountThree = document.querySelector("#status__completed .book-list").children.length;

			let emptyText1 = document.querySelector(".empty1");
			let emptyText2 = document.querySelector(".empty2");
			let emptyText3 = document.querySelector(".empty3");

			// If not empty.
			if (itemCountOne > 1) {
				emptyText1.style.display = "none";
				emptyText1.parentElement.classList.remove("empty");	
			} 
			if (itemCountTwo > 1) {
				emptyText2.style.display = "none";
				emptyText2.parentElement.classList.remove("empty");
			};
			if (itemCountThree > 1) {
				emptyText3.style.display = "none";
				emptyText3.parentElement.classList.remove("empty");
			};

			// If empty.
			if (itemCountOne == 1) {
				emptyText1.style.display = "inline";
				emptyText1.parentElement.classList.add("empty");	
			} 
			if (itemCountTwo == 1) {
				emptyText2.style.display = "inline";
				emptyText2.parentElement.classList.add("empty");
			};
			if (itemCountThree == 1) {
				emptyText3.style.display = "inline";
				emptyText3.parentElement.classList.add("empty");
			};
	},
	clearInput: function clearInput() {
		let titleLength = html.addBookInput.title.value.length;
		let authorLength = html.addBookInput.author.value.length;

		if (titleLength > 0 && authorLength > 0) {
			html.addBookInput.title.value = "";
			html.addBookInput.author.value = "";
		}
	}
};

// Local Storage.

let storageKey = "Book_Data";

let storage = {
	saveData: function saveData() {
		const storageItem = JSON.stringify(bookList)
		localStorage.setItem(storageKey, storageItem);
	},
	loadData: function loadData() {
		const storageGet = localStorage.getItem(storageKey);
		let storageParsed = JSON.parse(storageGet);
		let storageFiltered = storageParsed.filter(storage => storage.status != "Deleted / Recycled");

		if (storageFiltered !== null) {
			for (const book of storageFiltered) {
				bookList.push(book);
			};
		};

		// Renderer.
		for (let i = 0; i < bookList.length; i++) {
			const bookItem = `<fieldset id=${bookList[i].id} class='book-item ${bookList[i].status}'><legend class='book-title'>${bookList[i].title}</legend><span class='book-author'>Author: ${bookList[i].author}</span><button class='remove' onclick='bookFunction.removeBook(this.parentNode.id)'>X</button><button class='move-down' onclick='bookFunction.moveDown(this.parentNode.id)'>&darr;</button><button class='move-up' onclick='bookFunction.moveUp(this.parentNode.id)'>&uarr;</button></fieldset>`;
			if (bookList[i].status == "Plan-To-Read") {
				const statusPlanToRead = document.querySelector("#status__plan-to-read .book-list");
				statusPlanToRead.classList.remove("empty");
				statusPlanToRead.innerHTML += bookItem;	
			} else if (bookList[i].status == "Reading") {
				const statusReading = document.querySelector("#status__reading .book-list");
				statusReading.classList.remove("empty");
				statusReading.innerHTML += bookItem;	
			} else if (bookList[i].status == "Completed") {
				const statusCompleted = document.querySelector("#status__completed .book-list");
				statusCompleted.classList.remove("empty");
				statusCompleted.innerHTML += bookItem;	
			};
		};
	},
	updateData: function updateData(status, bookId) {

		// Update array status.
		for (let i = 0; i <= bookList.length; i++) {
			if (bookList[i].id == bookId) {
				bookList[i].status = status;
				break;
			};
		};
	}
};

document.addEventListener("DOMContentLoaded", () => {
	html.form.addEventListener("submit", () => {
		event.preventDefault();
		bookFunction.addBook();
		extraFunction.clearInput();
	});
	document.getElementById("plan-to-read").setAttribute("checked", "checked");
	storage.loadData();
});

let interval = setInterval(extraFunction.checkIfEmpty, 10);

/* 
	onclick is added as an attribute. 
	why? because somehow it works like that.
	tried using for loop but keeps getting error.
*/