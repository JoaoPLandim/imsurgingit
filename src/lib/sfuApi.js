export class SFUApiService {
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

    async getDepartments() {
        const url = `${this.baseUrl}`;
        return await this.makeRequest(url);
    }

    async getCourses(year = '2024', term = 'fall', department) {
        const url = `${this.baseUrl}?${year}/${term}/${department}`;
        return await this.makeRequest(url);
    }

    async getCourseDetails(year, term, department, number) {
        const url = `${this.baseUrl}?${year}/${term}/${department}/${number}`;
        return await this.makeRequest(url);
    }

    async getCourseOutline(year, term, department, number, section) {
        const url = `${this.baseUrl}?${year}/${term}/${department}/${number}/${section}`;
        return await this.makeRequest(url);
    }

    // Helper method to get current term info
    getCurrentTerm() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        
        let term;
        if (month >= 1 && month <= 4) {
            term = 'spring';
        } else if (month >= 5 && month <= 8) {
            term = 'summer';
        } else {
            term = 'fall';
        }
        
        return { year: year.toString(), term };
    }
}

export default new SFUApiService();