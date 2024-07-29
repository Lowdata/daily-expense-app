export interface Expense {
    id: string;
    amount: number;
    splitMethod: 'equal' | 'exact' | 'percentage';
    
    //Instructions:
    // Note:Participants can be registered and unregistered
    //1. In case of un registered user mention the email and name.
    //2. In case of registered user only userId should be mentioned

    participants: {
        userId?: string;
        name?: string; 
        email?: string;
        amountOwed?: number;
        percentage?: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
}