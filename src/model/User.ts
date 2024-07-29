import { Expense } from "./expenses"

export default interface User {
    id: string,
    email: string,
    password: string,
    name : string,
    expenses?:  Expense[]
}