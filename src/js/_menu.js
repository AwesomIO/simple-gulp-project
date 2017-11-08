class Menu {

	constructor(selector) {
		this.block = document.querySelector(selector);
		this.items = this.block.querySelectorAll('ul > li > a');
	}

	addEventItems() {
		for (let i = 0; i < this.items.length; i++) {
			let item  = this.items.item(i);
			var then = this;
			
			item.addEventListener("click", this.showAlert);
		}
	}
	
	showAlert(e, text) {
		e.preventDefault();
		alert("Click to " + e.target.innerHTML);
	}

}