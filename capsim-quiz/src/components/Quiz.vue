<template>
  <div class="greetings">
    <ol>
		<li v-for="item in quiz">
			{{ item.question }}
		</li>
	</ol>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

<script>
	import { getAllQuestions } from '../services/QuizService'

	export default {
        name: 'Quiz',
		methods: {
			loadQuiz() {
				this.quiz = getAllQuestions()
			}
		},
        beforeMount() {
			this.loadQuiz()
		}
    }
</script>