// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

                    const tableRows = document.querySelectorAll('tr[data-image]');
                    const displayImage = document.getElementById('display-image');

                    tableRows.forEach((row) => {
                        row.addEventListener('click', () => {
                            const imageSource = row.getAttribute('data-image');
                            displayImage.src = imageSource;
                        });
                    });
