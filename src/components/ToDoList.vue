<script setup lang="ts"> 
import { ref } from 'vue'
let id = 0;

const newListe = ref('')
const liste = ref([
    {id:id++, titre : "Faire le ménage"},
    {id:id++, titre : "Jouer"},
    {id:id++, titre : "Allez faire les courses"},
    {id:id++, titre : "Cuisiner"},
    {id:id++, titre : "Coder"}
])

function addListe() {
    liste.value.push({id:id++, titre: newListe.value})
    newListe.value = ''
}

function removeListe(element) {
    liste.value = liste.value.filter(e => e.id !== element.id)
}
</script>


<template>
    <h1 class="titre">Liste de tâches à effectuer :</h1>
    <div class="contour">
        <form @submit.prevent="addListe">
        <input v-model="newListe" type="text" placeholder="Ecrire ici"/>
        <button>Ajouter</button> 
        </form>
        <ul>
            <li v-for="element in liste" :key="element.id">{{ element.titre }} <button @click="removeListe(element)">X</button></li>
        </ul>
    </div>
</template>

<style scoped>
    .titre, li {
        font-family : "Lucida Console", "Courier New", monospace;
    }
    .titre {
        text-align : center;
    }
    .contour {
        border : 3px solid;
        border-radius : 10px;
        margin : 50px;
    }
</style>