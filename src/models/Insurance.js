// In-memory insurance storage (replace with database in production)
const insurances = [];
let insuranceIdCounter = 1;

export const InsuranceModel = {
    findByUserId: (userId) => {
        return insurances.filter((insurance) => insurance.userId === userId);
    },

    findById: (id) => {
        return insurances.find((insurance) => insurance.id === id);
    },

    create: (insuranceData) => {
        const newInsurance = {
            id: String(insuranceIdCounter++),
            ...insuranceData,
            createdAt: new Date().toISOString(),
        };
        insurances.push(newInsurance);
        return newInsurance;
    },

    update: (id, insuranceData) => {
        const index = insurances.findIndex((insurance) => insurance.id === id);
        if (index === -1) return null;

        insurances[index] = {
            ...insurances[index],
            ...insuranceData,
            updatedAt: new Date().toISOString(),
        };
        return insurances[index];
    },

    delete: (id) => {
        const index = insurances.findIndex((insurance) => insurance.id === id);
        if (index === -1) return false;

        insurances.splice(index, 1);
        return true;
    },
};
