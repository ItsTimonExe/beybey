<template>
    <div>
        <h2 class="text-2xl font-bold mb-4">Historique des Commandes</h2>
        <div v-if="orders.length > 0" class="space-y-4">
            <div
                v-for="order in orders"
                :key="order.id"
                class="p-4 bg-white shadow rounded"
            >
                <p class="font-bold">Commande ID: {{ order.id }}</p>
                <p>Client: {{ order.customer }}</p>
                <p>Articles: {{ order.products.length }}</p>
                <p>Total: {{ order.total }} €</p>
                <p>Date: {{ order.date }}</p>
            </div>
        </div>
        <p v-else class="text-gray-500">Aucune commande passée.</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orders: [
                {
                    id: 1,
                    customer: "Jean Dupont",
                    products: [
                        { id: 1, name: "T-shirt A", quantity: 1 },
                        { id: 2, name: "T-shirt B", quantity: 2 },
                    ],
                    total: 75,
                    date: "2023-10-18",
                },
                {
                    id: 2,
                    customer: "Marie Curie",
                    products: [
                        { id: 3, name: "T-shirt C", quantity: 1 },
                        { id: 4, name: "T-shirt D", quantity: 1 },
                    ],
                    total: 50,
                    date: "2023-10-19",
                },
            ],
        };
    },
};
</script>

<style scoped>
/* Basic styling for command history */
</style>
