export interface ApiOffer {
    slug: string,
    company_name: string,
    title: string,
    description: string,
    remote: boolean,
    url: string,
    tags: [
        string
    ],
    job_types: [
        string
    ],
    location: string,
    created_at: Number,
}
