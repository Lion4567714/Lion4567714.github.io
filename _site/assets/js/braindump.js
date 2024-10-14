let list_content = {};
if (localStorage.getItem("list") != null) {
    list_content = JSON.parse(localStorage.getItem("list"));
} else {
    list_content = {"elements": []};
}

const my_button = document.getElementById("my_button");
const my_input = document.getElementById("my_input");
const my_list = document.getElementById("my_list");
const save_button = document.getElementById("save_button");
const load_button = document.getElementById("load_button");

load_button.addEventListener("click", function() {
    let temp = document.createElement("input");
    temp.type = "file";
    temp.accept = "application/json";

    temp.addEventListener("change", function(event) {
        let file = event.target.files[0];
        let reader = new FileReader();

        reader.onload = function(e) {
            const contents = e.target.result;
            
            for (item of list_content["elements"]) {
                const name = item["name"];
                remove_from_storage(name);
                remove_from_page(name);
            }
            
            const temp_list_content = JSON.parse(contents);
            for (item of temp_list_content["elements"]) {
                const name = item["name"];
                add_to_storage(name);
                add_to_page(name);
            }
        }
        reader.readAsText(file, "utf-8");
    });

    document.body.appendChild(temp);
    temp.click();
    document.body.removeChild(temp);
});

save_button.addEventListener("click", function() {
    let temp = document.createElement("a");
    temp.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(list_content));
    temp.download = "braindump.json";
    document.body.appendChild(temp);
    temp.click();
    document.body.removeChild(temp);
});

my_button.addEventListener("click", function() {
    const input_value = my_input.value;
    if (input_value[0] === '-') {
        remove_from_storage(input_value.substring(1));
        remove_from_page(input_value.substring(1));
    } else {
        add_to_storage(input_value);
        add_to_page(input_value);
    } 
    my_input.value = "";   
});

my_input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        my_button.click();
        my_input.value = "";
    }
});

function add_to_storage(name) {
    list_content["elements"].push({"name": name});
    localStorage.setItem("list", JSON.stringify(list_content));
}

function remove_from_storage(name) {
    const index = list_content["elements"].findIndex(item => {
        return item["name"] == name;
    });
    list_content["elements"].splice(index, 1);
    localStorage.setItem("list", JSON.stringify(list_content));
}

function add_to_page(name) {
    const new_item = document.createElement("div");
    new_item.innerHTML = 
    `
        <li class="list-box-item">${name}</li>
    `;

    new_item.addEventListener("click", function() {
        remove_from_storage(name);
        new_item.remove();

        if (!my_list.firstChild) {
            my_list.parentElement.classList.add("hide");
        }
    });

    my_list.appendChild(new_item);
    if (my_list.parentElement.classList.contains("hide")) {
        my_list.parentElement.classList.remove("hide");
    }
}

function remove_from_page(name) {
    const xpath = `//li[contains(text(), "${name}")]`;
    const element = document.evaluate(xpath, my_list, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    element.singleNodeValue.parentElement.remove();

    if (!my_list.firstChild) {
        my_list.parentElement.classList.add("hide");
    }
}

window.onload = function() {
    if (list_content != null) {
        for (let element of list_content["elements"]) {
            add_to_page(element["name"]);
        }
    }

    my_input.focus();
}
