<script setup lang="ts"> 
import { ref, onMounted } from 'vue'
import TaskModel from "../models/TaskModel.js"
import { getTasks, createTask, deleteTask } from "@/services/taskService.js"

let id = 0;

const newListe = ref('')
const liste = ref([new TaskModel])

onMounted(async () => {
    try {
        liste.value = await getTasks();
    }
    catch {
        console.log("Impossible de lire les tâches")
    }
})

async function addListe() {
    if (newListe.value === '') {
        return 
    }

    try {
        const newTask = await createTask({ titre: newListe.value, id: id++ });
        liste.value.push(newTask)
        console.log(newTask)
        newListe.value = ''
    }
    catch (err) {
        console.log(err);
    }    
}

async function removeListe(element: TaskModel) {
    console.log(element.id)
    liste.value = liste.value.filter((e: TaskModel) => e.id !== element.id);
    await deleteTask(element.id);
}

</script>

<template>
    <h1 class="titre">Liste de tâches à effectuer :</h1>
    <div class="contour">
        <form @submit.prevent="addListe">
        <input class="input" v-model="newListe" type="text" placeholder="Ecrire ici"/>
        <button class="ajout">Ajouter</button> 
        </form>
        <ul>
            <li v-for="element in liste" :key="element.id">{{ element.titre }} <button class="croix" @click="removeListe(element)">X</button></li>
        </ul>
    </div>
</template>

<style scoped>  
    .titre, li {
        font-family : "Lucida Console", "Courier New", monospace;
    }
    .titre {
        text-align : center;
        font-weight: bold;
        text-shadow: 2px 2px 2px grey;
    }
    .contour {
        border : 3px solid;
        border-radius : 10px;
        margin : 40px;
        background-color: white;
    }
    .croix {
        border : 2px solid grey;
        border-radius: 20px;
        background-color : white;
    }
    .input {
        border: solid grey;
        border-radius: 10px;
        background-color: white;
        width: 250px;
        height: 20px;
        font-family: "Lucida Console", "Courier New", monospace;
    }
    .ajout {
        border: solid grey;
        border-radius: 10px;
        width: 90px;
        height: 30px;
        font-family: "Lucida Console", "Courier New", monospace;
    }
</style>