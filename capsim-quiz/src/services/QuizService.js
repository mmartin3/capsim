export async function getAllQuestions() {

    const response = await fetch('/api/quiz/capsim/questions');
    return await response.json();
}
