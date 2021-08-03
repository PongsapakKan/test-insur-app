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