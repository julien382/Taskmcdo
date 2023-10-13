// Fonction pour ajouter un nom
function addName() {
    const nameInput = document.getElementById("nameInput");
    const name = nameInput.value;
    if (name !== "") {
        // Récupérer les noms existants depuis le localStorage
        const existingNames = localStorage.getItem("existingNames");

        if (existingNames) {
            // Ajouter le nouveau nom à la liste existante
            const names = existingNames.split(",");
            names.push(name);
            localStorage.setItem("existingNames", names.join(","));
        } else {
            // S'il n'y a pas de noms existants, créer une nouvelle liste
            localStorage.setItem("existingNames", name);
        }

        // Réactualiser la liste déroulante des noms
        displayExistingNamesAndTasks();

        // Réinitialiser le champ de saisie du nom
        nameInput.value = "";
    }
}

// Fonction pour ajouter une tâche
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value;
    if (task !== "") {
        // Récupérer les tâches existantes depuis le localStorage
        const existingTasks = localStorage.getItem("existingTasks");

        if (existingTasks) {
            // Ajouter la nouvelle tâche à la liste existante
            const tasks = existingTasks.split(",");
            tasks.push(task);
            localStorage.setItem("existingTasks", tasks.join(","));
        } else {
            // S'il n'y a pas de tâches existantes, créer une nouvelle liste
            localStorage.setItem("existingTasks", task);
        }

        // Réactualiser la liste déroulante des tâches
        displayExistingNamesAndTasks();

        // Réinitialiser le champ de saisie de la tâche
        taskInput.value = "";
    }
}

// Fonction pour associer une tâche à un nom
function associateTaskName() {
    const nameSelect = document.getElementById("nameSelect");
    const taskSelect = document.getElementById("taskSelect");
    const selectedName = nameSelect.value;
    const selectedTask = taskSelect.value;

    if (selectedName !== "" && selectedTask !== "") {
        // Créer une ligne dans le tableau
        createTaskRow(selectedName, selectedTask);

        // Réinitialiser les sélecteurs pour permettre de nouvelles associations
        nameSelect.value = "";
        taskSelect.value = "";
    }
}

// Fonction pour créer une ligne dans le tableau
function createTaskRow(name, task) {
    const taskListTable = document.getElementById("taskListTable");
    const row = taskListTable.insertRow(-1);
    const nameCell = row.insertCell(0);
    const taskCell = row.insertCell(1);
    const actionsCell = row.insertCell(2);
    nameCell.innerHTML = name;
    taskCell.innerHTML = task;
    actionsCell.innerHTML = `<button onclick="deleteTask(this)">Supprimer</button>`;
}

// Fonction pour supprimer une ligne du tableau
function deleteTask(button) {
    const row = button.parentNode.parentNode;
    row.remove();
}

// Fonction pour afficher les noms et les tâches existants
function displayExistingNamesAndTasks() {
    const nameSelect = document.getElementById("nameSelect");
    const taskSelect = document.getElementById("taskSelect");

    // Récupérer les noms et les tâches existants depuis le localStorage
    const existingNames = localStorage.getItem("existingNames");
    const existingTasks = localStorage.getItem("existingTasks");

    // Assurez-vous que les valeurs existent
    if (existingNames) {
        const names = existingNames.split(",");
        for (const name of names) {
            const nameOption = document.createElement("option");
            nameOption.value = name;
            nameOption.textContent = name;
            nameSelect.appendChild(nameOption);
        }
    }

    // Faites de même pour les tâches existantes.
    if (existingTasks) {
        const tasks = existingTasks.split(",");
        for (const task of tasks) {
            const taskOption = document.createElement("option");
            taskOption.value = task;
            taskOption.textContent = task;
            taskSelect.appendChild(taskOption);
        }
    }
}

// Appelez la fonction pour afficher les noms et les tâches existants au chargement de la page
displayExistingNamesAndTasks();
