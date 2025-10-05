export class BaseApiService{
    constructor(school) {
        this.school = school;
        this.baseUrl =  school.BaseApiUrl;
    }

    async getDepartments(){
        throw new Error('getDepartments has to be implemented');
    }

    async getCourses(year, term, department){
        throw new Error('getCourses has to be implemented');
    }

    async getCourseDetails(year, term, department, number){
        throw new Error('getCourseDetails has to be implemented');
    }

    async getPrograms(){
        throw new Error('getPrograms has to be implemented');
    }

    async makeRequest(url, options = {}){
        try{
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });

            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        }catch(error){
            console.error(`API request failed for ${this.school.name}:`, error);
        throw error;
        }
    }
}