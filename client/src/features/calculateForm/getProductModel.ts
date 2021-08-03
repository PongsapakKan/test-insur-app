export interface GetProductRequest {
    firstName: string,
    lastName: string,
    gender: string,
    dob: Date,
    plan: string,
    premium: number,
    paymentTerm: string
}

export interface GetProductResponse {
    baseSumAssured: number,
    baseAnnualPremium: number,
    productTerm: number,
    paymentFrequency: String,
    plan: PlanResponse,
}

export interface PlanResponse {
    code: String,
    package: String
}