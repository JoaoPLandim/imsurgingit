export default class SFUApiService {
    constructor() {
        this.baseUrl = 'https://www.sfu.ca/bin/wcm/course-outlines';
    }

    async makeRequest(url, options = {}) {
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`SFU API request failed:`, error);
            throw error;
        }
    }

    async getDepartments(){
        return await this.makeRequest(this.baseUrl);
    }

    async getCourses(year = '2024', term = 'fall', department){
        const url = `${this.baseUrl}?${year}/${term}/${department}`;
        return await this.makeRequest(url);
    }

    async getCourseDetails(year, term, department, number){
        const url = `${this.baseUrl}?${year}/${term}/${department}/${number}`;
        return await this.makeRequest(url);
    }

    async getPrograms(){
        return [
            { code: 'CMPT', name: 'Computing Science' },
            { code: 'MATH', name: 'Mathematics' },
            { code: 'PHYS', name: 'Physics' },
            { code: 'ENGL', name: 'English' },
            { code: 'HIST', name: 'History' }
        ];
    }
}