import axios from 'axios'
import authHeader from "./auth-header";

export const api = axios.create({
    baseURL: "http://localhost:9191/api/quiz"
})



export const createQuestion = async(quizQuestion) => {
    try {
        const response = await api.post('/create-new-question', quizQuestion, { headers: authHeader() })
        console.log(response.data);
        
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error('Failed to create new question')
    }
}

export const getAllQuestions = async() => {

    try {
        const response = await api.get('/all-questions')
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error('Failed to get all questions')
    }
}

export const fetchQuizForUser = async(number, subject) => {
    try {
        const response = await api.get(`/quiz/fetch-questions-for-user?numOfQuestions=${number}&subject=${subject}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error('Failed to fetch quiz for user')
    }
}



export const getQuestionById = async(id) => {
    try {
        const response = await api.get(`/question/${id}`)
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error('Failed to get question by id')
    }
}


export const updateQuestion = async(id, updatedQuestion) => {
    try {
        const response = await api.put(`/${id}/update`, updatedQuestion)
        console.log("Update response:", response.data); 
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error('Failed to update question', { headers: authHeader() })
    }
}

export const deleteQuestion = async(id) => {
    try {
        await api.delete(`/${id}/delete`)
    } catch (error) {
        console.error(error)
        throw new Error('Failed to delete question', { headers: authHeader() })
    }
}

export const getSubjects = async() => {
    try {
        const response = await api.get('/subjects')
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error('Failed to get all subjects')
    }
}

