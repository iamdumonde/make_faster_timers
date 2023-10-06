<script setup>
import { reactive } from "vue";
let chro = "";
let state = reactive({
    min: 0,
    secondes: 59,
    cent: 99,
    intervalID: "",

});

function startQuizz() {
    state.intervalID = setInterval(() => {
        if (state.min > -1) {
            state.cent--;
            if (state.cent === 0) {
                state.cent = 99;
                state.secondes--;
            } else if (state.secondes === 0) {
                state.secondes = 60;
                state.min--;
            }
        } else if (state.min <= -1) {
            clearInterval(state.intervalID);
            state.min = 0;
            state.cent = 0;
            state.secondes = 0;
            console.log('clearInterval');
        }
    }, 0, 1);
}

function doubleNum(number) {
    if (number < 10) {
        return '0' + number;
    } else {
        return number;
    }
}
</script>

<template>
    <!-- <button @click="count++">You clicked me {{ count }} times.</button> -->
    <div class="container">
        <div class="containBtn">
            <button @click="startQuizz">Chrono</button>
        </div>
        <div class="showChrono">
            <span>
                Affiche moi le chrono : {{ doubleNum(state.min) }} : {{ doubleNum(state.secondes) }} : {{
                    doubleNum(state.cent) }}
            </span>
        </div>

    </div>
</template>


/********************************************************************/
Bien sûr, si vous préférez utiliser `<script setup>`, voici le code mis à jour pour Vue 3 avec le script `<script setup>` :

```javascript
<script setup>
import { reactive, onMounted, onUnmounted, computed } from 'vue';
import { usePage } from '@inertiajs/inertia-vue3';

const timeRemaining = reactive(1200); // 20 minutes en secondes
let timer;

const startTimer = () => {
    timer = setInterval(() => {
        timeRemaining.value--;
        if (timeRemaining.value <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

const submitQuiz = () => {
    // Logique pour soumettre le quiz ici
}

onMounted(() => {
    startTimer();
});

onUnmounted(() => {
    clearInterval(timer);
});

const timeDisplay = computed(() => {
    const minutes = Math.floor(timeRemaining.value / 60);
    const seconds = timeRemaining.value % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});
</script>
```

Avec `<script setup>`, nous utilisons simplement `const` pour déclarer les variables et les fonctions. Le reste du code reste globalement le même que dans la version précédente. Assurez-vous que cette partie du code soit correctement intégrée dans votre composant Vue.

N'oubliez pas d'ajouter les fichiers CSS appropriés pour le style du chronomètre clignotant, si nécessaire.



/********************************************************************/
CSS (Tailwind CSS)
css
Copy code
<style>
.blinking {
    animation: blinker 1s linear infinite;
}

@keyframes blinker {
    50% {
        opacity: 0;
    }
}
</style>
Dans ce code, nous utilisons Vue.js (avec Inertia) pour gérer le chronomètre. La valeur de timeRemaining est mise à jour chaque seconde et le chronomètre commence à clignoter lorsqu'il reste 5 minutes (300 secondes).

Assurez-vous de personnaliser la logique de soumission du quiz dans la fonction submitQuiz() selon vos besoins spécifiques.

N'oubliez pas d'ajouter ces fichiers à votre projet Laravel et de les intégrer dans votre application Inertia. Ce code est un point de départ et peut nécessiter des ajustements en fonction de la structure de votre application et de vos besoins exacts.


/********************************************************************/

Pour créer un chronomètre avec un effet de clignotement et une fonction de soumission automatique après 20 minutes en utilisant Laravel Inertia, vous devrez combiner HTML, JavaScript et CSS.

Voici un exemple de code que vous pouvez utiliser comme point de départ :

HTML avec Blade Template (quiz.blade.php)
html
Copy code
<div id="app">
    <!-- Affichage du temps restant -->
    <div class="timer" :class="{'blinking': time <= 300}">{{ timeDisplay }}</div>
    
    <!-- Affichage du bouton de soumission -->
    <button @click="submitQuiz">Soumettre le Quiz</button>
</div>

/******************************************************************/
Vous avez raison, avec Laravel Inertia, on utilise principalement des fichiers avec l'extension `.vue` pour les composants front-end. Voici comment vous pouvez adapter le code pour qu'il fonctionne dans un fichier Vue avec l'extension `.vue` :

1. **Créez un composant Vue pour le quizz (par exemple, Quiz.vue)**

```html
<template>
    <div id="app">
        <div class="timer" :class="{'blinking': time <= 300}">{{ timeDisplay }}</div>
        <button @click="submitQuiz">Soumettre le Quiz</button>
    </div>
</template>

<script setup>
import { reactive, onMounted, onUnmounted, computed } from 'vue';
import { usePage } from '@inertiajs/inertia-vue3';

const timeRemaining = reactive(1200);
let timer;

const startTimer = () => {
    timer = setInterval(() => {
        timeRemaining.value--;
        if (timeRemaining.value <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

const submitQuiz = () => {
    // Logique pour soumettre le quiz ici
}

onMounted(() => {
    startTimer();
});

onUnmounted(() => {
    clearInterval(timer);
});

const timeDisplay = computed(() => {
    const minutes = Math.floor(timeRemaining.value / 60);
    const seconds = timeRemaining.value % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});
</script>

<style scoped>
.blinking {
    animation: blinker 1s linear infinite;
}

@keyframes blinker {
    50% {
        opacity: 0;
    }
}
</style>
```

2. **Intégrez le composant dans votre page Inertia (par exemple, QuizPage.vue)**

```html
<template>
    <layout>
        <Quiz />
    </layout>
</template>

<script>
import Layout from './Layout.vue'; // Assurez-vous d'importer le composant de mise en page approprié
import Quiz from './Quiz.vue'; // Assurez-vous d'importer le composant Quiz

export default {
    components: {
        Layout,
        Quiz
    }
}
</script>
```

Dans ce cas, vous créez un composant Vue nommé `Quiz.vue` qui contient le code pour le chronomètre et le bouton de soumission du quiz. Ensuite, vous l'intégrez dans votre page Inertia (`QuizPage.vue`) en utilisant le composant `Layout` comme conteneur de mise en page.

N'oubliez pas de personnaliser les noms des composants et les chemins d'importation en fonction de la structure de votre projet. Assurez-vous également d'ajouter le fichier CSS approprié pour le style du chronomètre clignotant, si nécessaire.

/*******************************************************************************************/
Vous avez raison, j'ai omis d'inclure les classes Tailwind CSS dans l'exemple. Voici la version mise à jour avec les classes Tailwind :

```html
<template>
    <div class="flex flex-col items-center">
        <div class="text-3xl mb-4 timer" :class="{'text-red-500': time <= 300}">{{ timeDisplay }}</div>
        <button @click="submitQuiz" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Soumettre le Quiz</button>
    </div>
</template>

<script setup>
import { reactive, onMounted, onUnmounted, computed } from 'vue';
import { usePage } from '@inertiajs/inertia-vue3';

const timeRemaining = reactive(1200);
let timer;

const startTimer = () => {
    timer = setInterval(() => {
        timeRemaining.value--;
        if (timeRemaining.value <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

const submitQuiz = () => {
    // Logique pour soumettre le quiz ici
}

onMounted(() => {
    startTimer();
});

onUnmounted(() => {
    clearInterval(timer);
});

const timeDisplay = computed(() => {
    const minutes = Math.floor(timeRemaining.value / 60);
    const seconds = timeRemaining.value % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});
</script>

<style scoped>
.blinking {
    animation: blinker 1s linear infinite;
}

@keyframes blinker {
    50% {
        opacity: 0;
    }
}
</style>
```

J'ai ajouté des classes Tailwind CSS pour le style du chronomètre et du bouton de soumission. 



Assurez-vous d'inclure Tailwind CSS dans votre projet pour que ces styles fonctionnent correctement. Si vous avez des classes Tailwind CSS personnalisées, n'hésitez pas à les ajouter également.


------
<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="select1">Select 1:</label>
      <select v-model="selectedOption1" id="select1">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <!-- Ajoutez plus d'options si nécessaire -->
      </select>
    </div>
    
    <div>
      <label for="select2">Select 2:</label>
      <select v-model="selectedOption2" id="select2">
        <option value="optionA">Option A</option>
        <option value="optionB">Option B</option>
        <!-- Ajoutez plus d'options si nécessaire -->
      </select>
    </div>
    
    <button type="submit">Envoyer</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      selectedOption1: '',
      selectedOption2: ''
    };
  },
  methods: {
    submitForm() {
      // Envoyez les valeurs sélectionnées où vous en avez besoin
      // par exemple, en utilisant Axios ou un autre moyen d'envoi de requêtes.
    }
  }
}
</script>



-----------

<template>
  <div>
    <!-- ... Autres contenus ... -->
    
    <MyForm />
  </div>
</template>

<script>
import MyForm from '@/chemin/vers/MyForm.vue';

export default {
  components: {
    MyForm
  }
}
</script>


-----------

Récupérer les valeurs :
Dans la méthode submitForm du composant de formulaire, vous pouvez maintenant utiliser les valeurs selectedOption1 et selectedOption2 comme vous le souhaitez. Par exemple, vous pouvez les envoyer à votre backend pour traitement.







